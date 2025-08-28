import { CustomerLoginRequestType, CustomerLoginResponseType } from "../models/customer-model";
import { CustomerService } from "./customer.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type Response = {
    success: true;
    token: string;
} | {
    success: false;
    message: string;
}

export class AuthService {
    //  login 
    static async login(req: CustomerLoginRequestType): Promise<Response> {
        // cek email
        const user = await CustomerService.findEmail(req.email);
        if (!user) return { success: false, message: "Invalid email or password" };
        // cek password
        const passwordMatch = await bcrypt.compare(req.password, user.password);

        if (!passwordMatch) return { success: false, message: "Invalid email or password" };


        // get payload 
        const payload = {
            id_customer: user.id_customer,
            email: user.email,
            role: user.role
        }
        // generate jwt 
        const token: string = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1h" });


        return { success: true, token };

    }
}