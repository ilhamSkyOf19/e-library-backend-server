import z, { ZodType } from "zod";
import { CustomerCreateRequestType, CustomerEditPasswordRequestType, CustomerEditRequestType, CustomerLoginRequestType } from "../models/customer-model";

export class CustomerValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().min(3, "name is required"),
        email: z.email(),
        username: z.string().min(3, "username is required"),
        password: z.string().min(6, "password minimum 6 character"),
    }).strict() satisfies ZodType<CustomerCreateRequestType>;

    // login 
    static readonly LOGIN = z.object({
        email: z.email(),
        password: z.string().min(6, "password minimum 6 character"),
    }).strict() satisfies ZodType<CustomerLoginRequestType>;


    // edit 
    static readonly EDIT = z.object({
        name: z.string().min(3, "name is required").optional(),
        email: z.email().optional(),
        username: z.string().min(3, "username is required").optional(),
    }).strict() satisfies ZodType<CustomerEditRequestType>;


    //edit password 
    static readonly EDIT_PASSWORD = z.object({
        passwordOld: z.string().min(6, "password minimum 6 character"),
        passwordNew: z.string().min(6, "password minimum 6 character"),
        confirmPasswordNew: z.string().min(6, "password minimum 6 character"),
    }).strict() satisfies ZodType<CustomerEditPasswordRequestType>;
}