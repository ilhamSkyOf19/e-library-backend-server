import z, { ZodType } from "zod";
import { CustomerCreateRequestType } from "../models/customer-model";

export class CustomerValidation {
    // create 
    static readonly CREATE: ZodType<CustomerCreateRequestType> = z.object({
        name: z.string().min(3, "name is required"),
        email: z.email(),
        username: z.string().min(3, "username is required"),
        password: z.string().min(6, "password minimum 6 character"),
    }).strict()
}