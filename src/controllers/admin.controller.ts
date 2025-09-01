import { NextFunction, Request, Response } from "express";
import { AdminSigninRequestType, type AdminCreateRequestType, type AdminResponseType } from "../models/admin-model";
import { AdminService } from "../services/admin.service";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { ResponseType } from "../types/response-type";
import { AuthService } from "../services/auth.service";

export class AdminController {
    // get all
    static async getAll(_: Request, res: Response<ResponseType<AdminResponseType[]>>, next: NextFunction) {
        try {
            // get response 
            const response = await AdminService.getAll();

            // return response
            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                return next(error);
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


    // sign up 
    static async signup(req: Request<{}, {}, AdminCreateRequestType>, res: Response<ResponseType<AdminResponseType>>, next: NextFunction) {
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
                return next(error);
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });

        }
    }


    // sign in 
    static async signin(req: Request<{}, {}, AdminSigninRequestType>, res: Response<ResponseType<{ message: string }>>) {
        try {
            // get body
            const body = req.body;


            // login
            const response = await AuthService.loginAdmin(body);

            // cek response
            if (!response.success) {
                return res.status(400).json({
                    success: false,
                    message: response.message
                })
            }

            // set cookie
            res.cookie('token', response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 1000 // 1 hour
            });


            return res.status(200).json({
                success: true,
                data: {
                    message: "Login Success"
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            })
        }
    }
}