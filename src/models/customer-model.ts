import { customer } from "../generated/prisma";

// create request 
export type CustomerCreateRequestType = {
    name: string;
    email: string;
    username: string;
    password: string;
}



// response 
export type CustomerResponseType = {
    id: number;
    name: string;
    email: string;
    username: string;
    role: 'CUSTOMER';
    ebooks?: number[]
}


// to response
export const toCustomerResponse = (customer: customer & { ebooks?: { id_ebook: number }[] }): CustomerResponseType => {
    return {
        id: customer.id_customer,
        name: customer.name,
        email: customer.email,
        username: customer.username,
        role: 'CUSTOMER',
        ebooks: customer.ebooks ? customer.ebooks.map(e => e.id_ebook) : [],
    }
}
