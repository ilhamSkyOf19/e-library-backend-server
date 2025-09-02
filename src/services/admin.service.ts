import prisma from "../lib/prismaClient";
import { AdminCreateRequestType, AdminRawResponseType, AdminResponseType, AdminUpdatePasswordRequestType, AdminUpdateRequestType, toAdminResponse } from "../models/admin-model";
import bcrypt from "bcrypt";
import { CustomerEditRequestType, CustomerResponseType } from "../models/customer-model";
import { CustomerService } from "./customer.service";
import { success } from "zod";
import { ResponseType } from "../types/response-type";

export class AdminService {


    // get self 
    static async getSelf(id: number): Promise<AdminResponseType> {
        // response 
        const response = await prisma.admin.findFirstOrThrow({ where: { id } });

        // response 
        return toAdminResponse(response);
    }

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

    // update admin
    static async selfUpdate(req: AdminUpdateRequestType, id: number): Promise<AdminResponseType> {
        // find id 
        await prisma.admin.findFirstOrThrow({ where: { id } });
        // response 
        const response = await prisma.admin.update({
            where: { id },
            data: {
                ...req
            }
        });

        // response 
        return toAdminResponse(response);
    }

    // update password 
    static async updatePassword(req: AdminUpdatePasswordRequestType, id: number): Promise<{ success: boolean; message: string }> {
        // find admin
        const admin = await prisma.admin.findFirstOrThrow({ where: { id } });

        // compare password
        const passwordMatch = await bcrypt.compare(req.passwordOld, admin.password);

        //  cek match
        if (!passwordMatch) return {
            success: false,
            message: "Password is incorrect"
        };


        // cek password 
        const passwordSame = await bcrypt.compare(req.passwordNew, admin.password);

        // cek password 
        if (passwordSame) return {
            success: false,
            message: "New password cannot be the same as the old password"
        };


        // cek confirm password 
        if (req.passwordNew !== req.confirmPasswordNew) return {
            success: false,
            message: "Password confirmation does not match"
        };

        // hash password
        const hashedPassword = await bcrypt.hash(req.passwordNew, 10);

        // update password
        await prisma.admin.update({
            where: { id },
            data: {
                password: hashedPassword
            }
        });

        return {
            success: true,
            message: "Password updated successfully"
        };

    }


    // update customer by id 
    static async updateCUstomerById(req: CustomerEditRequestType, id: number): Promise<ResponseType<CustomerResponseType | { message: string }>> {
        // find customer 
        const customer = await prisma.customer.findUniqueOrThrow({ where: { id_customer: id } });

        // cek customer
        if (!customer) {
            return {
                success: false,
                message: "customer not found"
            }
        }

        // cek value req
        if (!req.name && !req.email && !req.username) return {
            success: true,
            data: {
                message: "customer not updated"
            }
        }


        // cek body same
        const isDataSame = Object.keys(req).every(key => req[key as keyof CustomerEditRequestType] === customer[key as keyof CustomerEditRequestType]);

        // cek same 
        if (isDataSame) return {
            success: true,
            data: {
                message: "customer not updated, data is the same"
            }
        }

        // update customer 
        const response = await CustomerService.edit(Number(id), req);

        // return response 
        return {
            success: true,
            data: response
        };

    }


}