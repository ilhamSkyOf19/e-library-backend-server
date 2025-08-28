import { Request, Response } from "express";
import { type AdminCreateRequestType, type AdminResponseType } from "../models/admin-model";
import { AdminService } from "../services/admin.service";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { ResponseType } from "../types/response-type";

export class AdminController {
    // login 
    static async signup(req: Request<{}, {}, AdminCreateRequestType>, res: Response<ResponseType<AdminResponseType>>) {
        try {
            // get body
            const body = req.body;

            // login 
            const response = await AdminService.create(body);

            // return response 
            return res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {
            console.log(error)
            // error prisma 
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    if (error.meta?.target === "admin_email_key") {
                        return res.status(500).json({
                            success: false,
                            message: "email already exists"
                        });
                    }
                }
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });

        }
    }
}