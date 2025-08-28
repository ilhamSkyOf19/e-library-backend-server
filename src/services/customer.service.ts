import { customer } from "../generated/prisma";
import prisma from "../lib/prismaClient";

export class CustomerService {
    // find username 
    static async findUsername(username: string): Promise<customer | null> {
        return await prisma.customer.findUnique({ where: { username } });
    }
}