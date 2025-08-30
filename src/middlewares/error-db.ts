import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '../generated/prisma/runtime/library';
export const errorDbHandler = (err: PrismaClientKnownRequestError, req: Request, res: Response<{ success: boolean; message: string }>, _next: NextFunction) => {
    console.error('Database connection error', err);

    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2025":
                return res.status(404).json({
                    success: false,
                    message: "record not found"
                });
                break;
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: "value already exists"
                })
                break;
            case "P2003":
                return res.status(404).json({
                    success: false,
                    message: "referenced record not found"
                })
                break;
            default:
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
        }

    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}