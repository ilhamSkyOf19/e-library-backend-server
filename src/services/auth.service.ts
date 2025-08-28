import { AdminSigninRequestType, type AdminCreateRequestType } from "../models/admin-model";
import { type CustomerLoginRequestType } from "../models/customer-model";
import { JwtPayloadGlobal, type JwtPayloadAdmin, type JwtPayloadCustomer } from "../types/jwt-type";
import { CustomerService } from "./customer.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminService } from "./admin.service";

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
            id: user.id_customer,
            email: user.email,
            role: user.role
        } as JwtPayloadGlobal;


        // generate jwt 
        const token: string = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1h" });


        return { success: true, token };
    }


    // login admin 
    static async loginAdmin(req: AdminSigninRequestType): Promise<Response> {
        // cek email
        const admin = await AdminService.findEmail(req.email);
        if (!admin) return { success: false, message: "Invalid email or password" };


        // cek password
        const passwordMatch = await bcrypt.compare(req.password, admin.password);
        if (!passwordMatch) return { success: false, message: "Invalid email or password" };

        // payload 
        const payload = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        } as JwtPayloadGlobal;

        // generate token
        const token: string = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1h" });

        // return response
        return { success: true, token };

    }

}