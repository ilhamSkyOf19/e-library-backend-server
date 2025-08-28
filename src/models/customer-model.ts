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
    id_ebook: number;
    name: string;
    email: string;
    username: string;
    role: 'CUSTOMER';
}


// to response
export const toCustomerResponse = (customer: customer): CustomerResponseType => {
    return {
        id: customer.id_customer,
        id_ebook: customer.id_ebook,
        name: customer.name,
        email: customer.email,
        username: customer.username,
        role: 'CUSTOMER'
    }
}
