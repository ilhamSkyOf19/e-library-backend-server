import prisma from "../lib/prismaClient";
import { MidtransUrl, PaymentRequestType } from "../models/transaction-model";


export class TransactionService {
    // payment 
    static async pay(req: PaymentRequestType): Promise<MidtransUrl> {
        // midtrans url 
        const midtransUrl: string = process.env.MIDTRANS_URL || "";

        // midtrans auth string 
        const midtransAuthString: string = process.env.MIDTRANS_AUTH_STRING || "";

        // succes url 
        const succesUrl: string = process.env.SUCCESS_URL || "";


        // set transaction
        const transaction = await prisma.transaction.create({
            data: {
                id_customer: req.id_user,
                id_ebook: req.id_ebook,
                status: "PENDING"
            }
        })




        // response midtrans 
        const response = await fetch(midtransUrl, {
            //    method
            method: "POST",
            // body
            body: JSON.stringify({
                // transaction details
                transaction_details: {
                    order_id: transaction.id_transaction,
                    gross_amount: req.price
                },
                credit_card: {
                    "secure": true
                },
                customer_details: {
                    email: req.email,
                },
                callbacks: {
                    finish: `${succesUrl}`
                }
            }),
            // headers
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${midtransAuthString}`
            }

        })

        // handle error 
        if (!response.ok) throw new Error(`Failed to create transaction, status: ${response.status}`);

        // return response
        return response.json()

    }
}