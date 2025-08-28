import { ebook } from "../generated/prisma";

// create 
export type EbookCreateRequestType = {
    name: string;
    price: number;
    stock: number;
    about: string;
    author: string;
    cover: string;
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
export const toEbookResponse = (ebook: ebook & {
    genres: { id_genre: number }[]
}): EbookResponseType => {
    return {
        id_ebook: ebook.id_ebook,
        name: ebook.name,
        price: ebook.price,
        stock: ebook.stock,
        about: ebook.about,
        author: ebook.author,
        cover: ebook.cover,
        genres: ebook.genres.map(g => g.id_genre),
    }
}