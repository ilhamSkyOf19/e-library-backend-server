import { RequestHandler, Response, NextFunction } from "express";
import { JwtPayloadAdmin, JwtPayloadGlobal, TokenRequest } from "../types/jwt-type";
import { ResponseType } from "../types/response-type";
import jwt from "jsonwebtoken";


export const tokenMiddleware = (role: 'admin' | 'customer' | 'all'): RequestHandler => {
    return (
        req: TokenRequest,
        res: Response<ResponseType<{ message: string }>>,
        next: NextFunction,
    ) => {

        // token 
        const token = req.cookies?.token;

        if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

        try {
            // get payload
            const payload = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayloadGlobal;

            if (role !== "all") {
                // cek payload
                if (role === "admin") {
                    if (payload.role !== "ADMIN") return res.status(401).json({ success: false, message: "Unauthorized" });
                } else {
                    if (payload.role !== "CUSTOMER") return res.status(401).json({ success: false, message: "Unauthorized" });
                }
            }


            // set req user 
            req.data = {
                id: payload.id,
                email: payload.email,
                role: payload.role
            };

            // next 
            next();

        } catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }

    }

}