import { Request } from "express";


export type JwtPayloadCustomer = {
    id_customer: number;
    email: string;
    role: 'CUSTOMER';
}


export type JwtPayloadAdmin = {
    id_admin: number;
    email: string;
    role: 'ADMIN';
}


export type JwtPayloadGlobal = {
    id: number;
    email: string;
    role: 'ADMIN' | 'CUSTOMER';
}


// type request + token
export interface TokenRequest<params = {}, _ = {}, body = {}, query = {}> extends Request<params, any, body, query> {
    data?: {
        id: number;
        email: string;
        role: 'ADMIN' | 'CUSTOMER';
    }
}