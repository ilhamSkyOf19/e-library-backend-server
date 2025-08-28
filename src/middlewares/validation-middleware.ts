import { ZodAny, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (schema: ZodAny) => {
    return (req: Request, res: Response<{ success: boolean; message: string }>, next: NextFunction) => {
        try {
            // validate the request body
            schema.parse(req.body);
            next();
        } catch (error) {
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