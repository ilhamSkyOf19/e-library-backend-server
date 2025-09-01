import prisma from "../lib/prismaClient";
import { AdminCreateRequestType, AdminRawResponseType, AdminResponseType, toAdminResponse } from "../models/admin-model";
import bcrypt from "bcrypt";

export class AdminService {

    // get all 
    static async getAll(): Promise<AdminResponseType[]> {
        // response 
        const response = await prisma.admin.findMany();

        // response 
        return response.map(toAdminResponse);
    }
    // create /  singup
    static async create(req: AdminCreateRequestType): Promise<AdminResponseType> {
        //  hash password
        const hashedPassword = await bcrypt.hash(req.password, 10);

        const response = await prisma.admin.create({
            data: {
                ...req,
                password: hashedPassword,
                role: 'ADMIN'
            }
        });

        return toAdminResponse(response);
    }

    // cek email 
    static async findEmail(email: string): Promise<AdminRawResponseType | null> {
        return await prisma.admin.findUnique({ where: { email } });
    }
}