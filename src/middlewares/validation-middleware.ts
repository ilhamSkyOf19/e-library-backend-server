import { ZodError, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (schema: ZodType) => {
    return (req: Request, res: Response<{ success: boolean; message: string }>, next: NextFunction) => {
        try {
            if (!req.body) return res.status(400).json({ success: false, message: "Invalid Request" });
            // validate the request body
            schema.parse(req.body);
            next();
        } catch (error) {
            console.log(error);
            // cek errors
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((err) => err.message)[0];

                return res.status(400).json({
                    success: false,
                    message: errorMessages,
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
}