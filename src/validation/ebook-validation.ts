import z, { email, ZodType } from "zod";
import { EbookCreateRequestType } from "../models/ebook-model";

export class EbookValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().min(3, "name is required"),
        price: z.preprocess(value => Number(value), z.number().min(1, "price is required")),
        stock: z.preprocess(value => Number(value), z.number().min(1, "stock is required")),
        about: z.string().min(3, "about is required"),
        author: z.string().min(3, "author is required"),
        genres: z.array(z.number()).min(1, "genres is required"),
    }).strict() satisfies ZodType<EbookCreateRequestType>

}