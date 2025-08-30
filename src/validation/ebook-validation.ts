import z, { email, ZodType } from "zod";
import { EbookCreateRequestType, EbookUpdateRequestType } from "../models/ebook-model";

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


    // update 
    static readonly UPDATE = z.object({
        name: z.string().min(3, "name is required").optional(),
        price: z.preprocess(value => Number(value), z.number().min(1, "price is required")).optional(),
        stock: z.preprocess(value => Number(value), z.number().min(1, "stock is required")).optional(),
        about: z.string().min(3, "about is required").optional(),
        author: z.string().min(3, "author is required").optional(),
        genres: z.array(z.number()).min(1, "genres is required").optional(),
    }).strict() satisfies ZodType<EbookUpdateRequestType>
}