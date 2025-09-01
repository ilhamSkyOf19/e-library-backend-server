import { NextFunction, Request, Response } from "express"
import { TokenRequest } from "../types/jwt-type"
import { MidtransUrl, TransactionRequestType } from "../models/transaction-model"
import { EbookService } from "../services/ebook.service";
import { TransactionService } from "../services/transaction.service";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";




export const paymentController = async (req: TokenRequest<{}, {}, TransactionRequestType>, res: Response<MidtransUrl>, next: NextFunction) => {
    try {
        // get body
        const id_ebook = req.body.id_ebook;

        // get email from token

        const { email, id } = req.data ?? { email: "", id: 0 };

        // get ebook 
        const ebook = await EbookService.getData(id_ebook);


        if (!ebook) {
            return res.status(404).json({ message: "Ebook not found" } as any);
        }

        // create transaction 
        const midtransResponse = await TransactionService.pay({
            id_user: id,
            id_ebook: id_ebook,
            email: email,
            price: ebook.price
        })


        // cek midtrans response
        if (!midtransResponse) {
            return res.status(500).json({ message: "Failed to create transaction" } as any)
        }

        // return link
        return res.status(200).json({
            redirect_url: midtransResponse.redirect_url
        });

    } catch (error) {
        console.log(error);
        if (error instanceof PrismaClientKnownRequestError) {
            return next(error);
        }
        return res.status(500).json({ message: "Internal Server Error" } as any);
    }
}


// handle payment 
export const handleAfterPayment = async (req: Request, res: Response<{ message: string }>) => {
    try {
        // get body 
        const order_id = req.body.order_id;
        // get order id
        const body = req.body;

        switch (body.transaction_status) {
            case "capture":
            case "settlement":
                await TransactionService.updateStatus(Number(order_id), "SUCCESS");
                break;
            case "deny":
            case "cancel":
            case "expire":
            case "failure":
                await TransactionService.updateStatus(Number(order_id), "CANCELLED");
                break;
            default:
                break;
        }



        // return response
        return res.status(200).json({ message: "Success" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}