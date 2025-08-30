import prisma from "../lib/prismaClient";
import bcrypt from "bcrypt";
import { CustomerCreateRequestType, CustomerEditRequestType, CustomerLoginRequestType, CustomerRawResponseType, CustomerResponseType, toCustomerResponse } from "../models/customer-model";

export class CustomerService {
    // create 
    static async create(req: CustomerCreateRequestType): Promise<CustomerResponseType> {

        // hash password
        const hashedPassword = await bcrypt.hash(req.password, 10);

        const response = await prisma.customer.create(
            {
                data: {
                    ...req,
                    password: hashedPassword
                }
            }
        );

        return toCustomerResponse(response);
    }

    // find username 
    static async findUsername(username: string): Promise<CustomerRawResponseType | null> {
        return await prisma.customer.findUnique({ where: { username } });
    }

    // find email 
    static async findEmail(email: string): Promise<CustomerRawResponseType | null> {
        return await prisma.customer.findUnique({ where: { email } });
    }


    // find user by id
    static async findById(id: number): Promise<CustomerRawResponseType | null> {
        return await prisma.customer.findUnique({ where: { id_customer: id } });
    }


    // edit 
    static async edit(id: number, req: CustomerEditRequestType): Promise<{ success: boolean; message: string }> {
        // cek user
        const findCustomer = await this.findById(id);

        if (!findCustomer) {
            return { success: false, message: "customer not found" };
        }

        //  cek email
        if (req.email === findCustomer.email) {
            return {
                success: false,
                message: "email has already been registered"
            }
        }

        // update customer
        await prisma.customer.update({
            where: { id_customer: id },
            data: {
                name: req.name?.trim() ? req.name.trim() : undefined,
                email: req.email?.trim() ? req.email.trim() : undefined,
                username: req.username?.trim() ? req.username.trim() : undefined,
            }
        });

        return { success: true, message: "customer updated successfully" };
    }

    // update password 
    static async editPassword(id: number, passwordNew: string) {
        // password hashing
        const hashedPassword = await bcrypt.hash(passwordNew, 10);
        // update password
        return await prisma.customer.update({
            where: {
                id_customer: id
            },
            data: {
                password: hashedPassword
            }
        })
    }
}