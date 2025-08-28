import { Request, Response } from "express";
import { ResponseType } from "../types/response-type";
import { CustomerCreateRequestType, CustomerResponseType } from "../models/customer-model";
import { CustomerService } from "../services/customer.service";


export class CustomerController {
    // sign up 
    static async signup(req: Request<{}, {}, CustomerCreateRequestType>, res: Response<ResponseType<CustomerResponseType>>) {

        // request body 
        const body = req.body;

        // cek username 
        const findUsername = await CustomerService.findUsername(body.username);

        if (!findUsername) {
            return res.status(400).json({
                success: false,
                message: "username already exist"
            })
        }






    }
}