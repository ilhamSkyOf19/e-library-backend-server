import { customer } from "../generated/prisma";
import prisma from "../lib/prismaClient";
import bcrypt from "bcrypt";
import { CustomerCreateRequestType, CustomerRawResponseType, CustomerResponseType, toCustomerResponse } from "../models/customer-model";

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
}