import { Request, Response } from "express";
import { ResponseType } from "../types/response-type";
import { CustomerCreateRequestType, CustomerResponseType } from "../models/customer-model";
import { CustomerService } from "../services/customer.service";
import { PrismaClient } from "../generated/prisma";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";


export class CustomerController {
    // sign up 
    static async signup(req: Request<{}, {}, CustomerCreateRequestType>, res: Response<ResponseType<CustomerResponseType>>) {

        try {
            // request body 
            const body = req.body;

            // add customer 
            const response = await CustomerService.create(body);

            // return response 
            return res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {
            console.log(error);
            // get error prisma existing
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    if (error.meta?.target === "customer_username_key") {
                        return res.status(400).json({
                            success: false,
                            message: "Username already exists"
                        });
                    } else if (error.meta?.target === "customer_email_key") {
                        return res.status(500).json({
                            success: false,
                            message: "email already exists"
                        });
                    }
                }
            }
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }





    }
}