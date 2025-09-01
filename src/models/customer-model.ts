import { Customer } from "../generated/prisma";

// create request 
export type CustomerCreateRequestType = {
    name: string;
    email: string;
    username: string;
    password: string;
}


// edit request 
export type CustomerEditRequestType = {
    name?: string;
    email?: string;
    username?: string;
}


// exit passwrod 
export type CustomerEditPasswordRequestType = {
    passwordOld: string;
    passwordNew: string;
    confirmPasswordNew: string;
}


// customer login 
export type CustomerLoginRequestType = {
    email: string;
    password: string;
}

// customer response raw 
export type CustomerRawResponseType = {
    id_customer: number;
    name: string;
    email: string;
    username: string;
    password: string;
    role: 'CUSTOMER' | 'ADMIN';
}


export type CustomerLoginResponseType = {
    id: number;
    name: string;
    email: string;
    username: string;
    role: 'CUSTOMER';
}


// response 
export type CustomerResponseType = {
    id: number;
    name: string;
    email: string;
    username: string;
    role: 'CUSTOMER';
    ebooks?: {
        id_ebook: number
        name: string
    }[]
}


// to response
export const toCustomerResponse = (
    customer: Customer & {
        transactions: {
            ebook: {
                id_ebook: number,
                name: string
            },
            status: 'SUCCESS' | 'PANDING' | 'CANCELLED'
        }[]
    }): CustomerResponseType => {
    return {
        id: customer.id_customer,
        name: customer.name,
        email: customer.email,
        username: customer.username,
        role: 'CUSTOMER',
        ebooks: customer.transactions
            ? customer.transactions.filter((transaction) => transaction.status === 'SUCCESS')
                .map(e => ({
                    id_ebook: e.ebook.id_ebook,
                    name: e.ebook.name
                }))
            : [],
    }
}
