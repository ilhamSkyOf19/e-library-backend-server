import prisma from "../lib/prismaClient";
import { AdminCreateRequestType, AdminRawResponseType, AdminResponseType, toAdminResponse } from "../models/admin-model";
import bcrypt from "bcrypt";

export class AdminService {
    // create /  singup
    static async create(req: AdminCreateRequestType): Promise<AdminResponseType> {
        //  hash password
        const hashedPassword = await bcrypt.hash(req.password, 10);

        const response = await prisma.admin.create({
            data: {
                ...req,
                password: hashedPassword
            }
        });

        return toAdminResponse(response);
    }

    // cek email 
    static async findEmail(email: string): Promise<AdminRawResponseType | null> {
        return await prisma.admin.findUnique({ where: { email } });
    }
}