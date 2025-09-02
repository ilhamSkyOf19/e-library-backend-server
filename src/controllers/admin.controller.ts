import { NextFunction, Request, Response } from "express";
import { AdminSigninRequestType, AdminUpdatePasswordRequestType, AdminUpdateRequestType, type AdminCreateRequestType, type AdminResponseType } from "../models/admin-model";
import { AdminService } from "../services/admin.service";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { ResponseType } from "../types/response-type";
import { AuthService } from "../services/auth.service";
import { TokenRequest } from "../types/jwt-type";
import { CustomerEditRequestType, CustomerResponseType } from "../models/customer-model";

export class AdminController {
    // get self 
    static async getSelf(req: TokenRequest, res: Response<ResponseType<AdminResponseType>>, next: NextFunction) {
        try {
            // get data id user 
            const { id } = req.data ?? { id: 0 };

            // response 
            const response = await AdminService.getSelf(id);

            // return response 
            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            console.log(error)
            if (error instanceof PrismaClientKnownRequestError) {
                return next(error);
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


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


    // update 
    static async selfUpdate(req: TokenRequest<{}, {}, AdminUpdateRequestType>, res: Response<ResponseType<AdminResponseType | { message: string }>>, next: NextFunction) {
        try {
            // get data id 
            const { id } = req.data ?? { id: 0 };

            // cek request 
            if (req.body === null || req.body === undefined || Object.keys(req.body).length === 0) {
                return res.status(200).json({
                    success: true,
                    data: {
                        message: "No data to update"
                    }
                })
            }

            // get body 
            const body = req.body;




            // response 
            const response = await AdminService.selfUpdate(body, id);

            // return response 
            return res.status(200).json({
                success: true,
                data: response
            });


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


    // update password 
    static async updatePassword(req: TokenRequest<{}, {}, AdminUpdatePasswordRequestType>, res: Response<ResponseType<{ message: string }>>, next: NextFunction) {
        try {
            // get data id
            const { id } = req.data ?? { id: 0 };


            // get boyd 
            const body = req.body;

            // response 
            const response = await AdminService.updatePassword(body, id);


            // cek response 
            if (!response.success) {
                return res.status(400).json({
                    success: false,
                    message: response.message
                })
            }

            // return response 
            return res.status(200).json({
                success: true,
                data: {
                    message: response.message
                }
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

    // update customer 
    static async updateCustomerById(req: Request<{ id: string }, {}, CustomerEditRequestType>, res: Response<ResponseType<CustomerResponseType | { message: string }>>, next: NextFunction) {
        try {
            // get params 
            const { id } = req.params;

            // get body 
            const body = req.body;


            // response 
            const response = await AdminService.updateCUstomerById(body, Number(id));


            //  cek response 
            if (!response.success) {
                return res.status(400).json({
                    success: false,
                    message: response.message
                })
            }

            // return response 
            return res.status(200).json({
                success: true,
                data: response.data
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
}