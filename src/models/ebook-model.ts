import { Ebook } from "../generated/prisma";

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
export const toEbookResponse = (data: Ebook & {
    ebookGenres: { genre: { id_genre: number; name: string } }[]
}): EbookResponseType => {
    return {
        id_ebook: data.id_ebook,
        name: data.name,
        price: data.price,
        stock: data.stock,
        about: data.about,
        author: data.author,
        cover: data.cover,
        genres: data.ebookGenres.map(eg => eg.genre.id_genre), // ambil id genre
    }
}



// ebook response data with genres
export type EbookResponseDataType = {
    id_ebook: number;
    name: string;
    price: number;
    stock: number;
    about: string;
    author: string;
    cover: string;
    genres: string[]
}

// to ebook response data with genres 
export const toResponseEbookData = (data: Ebook & {
    ebookGenres: { genre: { name: string } }[]
}) => ({
    id_ebook: data.id_ebook,
    name: data.name,
    price: data.price,
    stock: data.stock,
    about: data.about,
    author: data.author,
    cover: data.cover,
    genres: data.ebookGenres.map(eg => eg.genre.name)
});

