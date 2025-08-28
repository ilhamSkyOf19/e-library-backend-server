import { ebook } from "../generated/prisma";

// create 
export type EbookCreateRequestType = {
    name: string;
    price: number;
    stock: number;
    about: string;
    author: string;
    genres: number[];
}


// response 
export type EbookResponseType = {
    id_ebook: number;
    name: string;
    price: number;
    stock: number;
    about: string;
    author: string;
    cover: string;
    genres: number[];
}


// to response 
export const toEbookResponse = (data: ebook & {
    genres: { id_genre: number }[]
}): EbookResponseType => {
    return {
        id_ebook: data.id_ebook,
        name: data.name,
        price: data.price,
        stock: data.stock,
        about: data.about,
        author: data.author,
        cover: data.cover,
        genres: data.genres.map(g => g.id_genre),
    }
}