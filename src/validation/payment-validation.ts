import z, { ZodType } from "zod";
import { TransactionRequestType } from "../models/transaction-model";

export class PaymentValidation {
    // create 
    static readonly CREATE = z.object({
        id_ebook: z.number().min(1, { message: "id_ebook is required" }),
    }).strict() satisfies ZodType<TransactionRequestType>


}