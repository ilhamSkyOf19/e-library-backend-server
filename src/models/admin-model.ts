import { admin } from "../generated/prisma"

// create 
export type AdminCreateRequestType = {
    name: string,
    email: string,
    password: string
}

// response 
export type AdminResponseType = {
    id: number,
    name: string,
    email: string,
    role: 'ADMIN'
}


// to response 
export const toAdminResponse = (admin: admin): AdminResponseType => {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'ADMIN'
    }
}



