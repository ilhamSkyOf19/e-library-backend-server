import { Ebook } from "../generated/prisma";


// params type 
export type EbookParamsType = {
    id_ebook: number;
}

// create 
export type EbookCreateRequestType = {
    name: string;
    price: number;
    stock: number;
    about: string;
    author: string;
    genres: number[];
}


// update 
export type EbookUpdateRequestType = {
    name?: string;
    price?: number;
    stock?: number;
    about?: string;
    author?: string;
    genres?: number[] | null;
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


// response 
export type EbookResponseDetailType = {
    id_ebook: number;
    name: string;
    price: number;
    stock: number;
    about: string;
    author: string;
    cover: string;
    genres: {
        id_genre: number;
        name: string
    }[];
}




// to response  detail
export const toEbookResponseDetail = (data: Ebook & {
    ebookGenres: { genre: { id_genre: number; name: string } }[]
}): EbookResponseDetailType => {
    return {
        id_ebook: data.id_ebook,
        name: data.name,
        price: data.price,
        stock: data.stock,
        about: data.about,
        author: data.author,
        cover: data.cover,
        genres: data.ebookGenres.map(eg => ({
            id_genre: eg.genre.id_genre,
            name: eg.genre.name
        })),
    }
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

