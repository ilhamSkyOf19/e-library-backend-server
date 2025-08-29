import { Request, Response } from "express"
import { TokenRequest } from "../types/jwt-type"
import { MidtransUrl, TransactionRequestType } from "../models/transaction-model"
import { EbookService } from "../services/ebook.service";
import { TransactionService } from "../services/payment.service";

export const paymentController = async (req: TokenRequest<{}, {}, TransactionRequestType>, res: Response<MidtransUrl>) => {
    try {
        // get body
        const body = req.body;

        // get email from token

        const { email, id } = req.data ?? { email: "", id: 0 };

        // get ebook 
        const ebook = await EbookService.getData(body.id_ebook);


        if (!ebook) {
            return res.status(404).json({ message: "Ebook not found" } as any);
        }

        // create transaction 
        const midtransResponse = await TransactionService.pay({
            id_user: id,
            id_ebook: body.id_ebook,
            email: email,
            price: ebook.price
        })


        // cek midtrans response
        if (!midtransResponse) {
            return res.status(500).json({ message: "Failed to create transaction" } as any)
        }


        return res.status(200).json(midtransResponse);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" } as any);
    }
}