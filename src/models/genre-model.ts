import { Genre } from "../generated/prisma";

// create 
export type GenreCreateRequestType = {
    name: string;
}

// update 
export type GenreUpdateRequestType = {
    name?: string;
};

// response 
export type GenreResponseType = {
    name: string
}


// to response 
export const toGenreResponse = (data: Genre): GenreResponseType => {
    return {
        name: data.name
    }
}