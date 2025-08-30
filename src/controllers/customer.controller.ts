import { Request, Response } from "express";
import { ResponseType } from "../types/response-type";
import { CustomerCreateRequestType, CustomerEditPasswordRequestType, CustomerEditRequestType, CustomerLoginRequestType, CustomerResponseType } from "../models/customer-model";
import { CustomerService } from "../services/customer.service";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { AuthService } from "../services/auth.service";
import { TokenRequest } from "../types/jwt-type";

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
                    if (error.meta?.target === "Customer_username_key") {
                        return res.status(400).json({
                            success: false,
                            message: "Username already exists"
                        });
                    } else if (error.meta?.target === "Customer_email_key") {
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

    // sign in 
    static async login(req: Request<{}, {}, CustomerLoginRequestType>, res: Response<ResponseType<{ message: string }>>) {
        try {
            // get body
            const body = req.body;

            // login 
            const response = await AuthService.login(body);

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
                    message: "Login succes"
                }
            })


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }


    // update 
    static async edit(req: TokenRequest<{}, {}, CustomerEditRequestType>, res: Response<ResponseType<{ message: string }>>) {
        try {
            // get body 
            const body = req.body;
            // get id  customer 
            const { id } = req.data ?? { id: 0 };


            // update customer 
            const response = await CustomerService.edit(id, body);

            // cek response
            if (!response.success) {
                return res.status(400).json({
                    success: false,
                    message: response.message
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    message: response.message
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }


    // edit password 
    static async editPassword(req: TokenRequest<{}, {}, CustomerEditPasswordRequestType>, res: Response<{ success: boolean, message: string }>) {
        try {
            // get body 
            const body = req.body;
            // get id 
            const { id } = req.data ?? { id: 0 };

            // find user 
            const findUser = await CustomerService.findById(id);

            // cek user 
            if (!findUser) {
                return res.status(404).json({
                    success: false,
                    message: "customer not found"
                })
            }


            // compare password 
            const passwordMatch = await AuthService.passwordMatch(body.passwordOld, findUser.password);

            // cek password 
            if (!passwordMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid old password"
                });
            }


            // cek passwrod new and confirm password 
            if (body.passwordNew !== body.confirmPasswordNew) {
                return res.status(400).json({
                    success: false,
                    message: "New password and confirm password do not match"
                });
            }


            // cek password new & password old
            const cekCompareNewOld = await AuthService.passwordMatch(body.passwordNew, findUser.password);

            // cek password new & password old
            if (cekCompareNewOld) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be different from old password"
                });
            }

            // update
            await CustomerService.editPassword(id, body.passwordNew);

            return res.status(200).json({
                success: true,
                message: "Password updated successfully"
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}