import z, { ZodType } from "zod";
import { AdminCreateRequestType } from "../models/admin-model";

export class AdminValidation {
    // create 
    static readonly CREATE: ZodType<AdminCreateRequestType> = z.object({
        name: z.string().min(3, "name is required"),
        email: z.email(),
        password: z.string().min(6, "password minimum 6 character"),
    }).strict()
}