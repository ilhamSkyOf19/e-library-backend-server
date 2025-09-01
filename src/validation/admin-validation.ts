import z, { ZodType } from "zod";
import { AdminCreateRequestType, AdminSigninRequestType, AdminUpdatePasswordRequestType, AdminUpdateRequestType } from "../models/admin-model";

export class AdminValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().min(3, "name is required"),
        email: z.email(),
        password: z.string().min(6, "password minimum 6 character"),
    }).strict() satisfies ZodType<AdminCreateRequestType>

    // sign in 
    static readonly SIGNIN = z.object({
        email: z.email(),
        password: z.string().min(6, "password minimum 6 character"),
    }).strict() satisfies ZodType<AdminSigninRequestType>


    // update 
    static readonly UPDATE = z.object({
        name: z.string().min(3, "name is required").optional(),
        email: z.email().optional(),
    }).strict() satisfies ZodType<AdminUpdateRequestType>


    // update password 
    static readonly UPDATE_PASSWORD = z.object({
        passwordOld: z.string().min(6, "password minimum 6 character"),
        passwordNew: z.string().min(6, "password minimum 6 character"),
        confirmPasswordNew: z.string().min(6, "password minimum 6 character"),
    }).strict() satisfies ZodType<AdminUpdatePasswordRequestType>
}