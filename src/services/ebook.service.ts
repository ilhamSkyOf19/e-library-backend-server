import { includes } from "zod";
import prisma from "../lib/prismaClient";
import { EbookCreateRequestType, EbookResponseDataType, EbookResponseType, toEbookResponse, toResponseEbookData } from "../models/ebook-model";

export class EbookService {
    // create 
    static async create(req: EbookCreateRequestType, cover: string): Promise<EbookResponseType> {

        const response = await prisma.ebook.create({
            data: {
                name: req.name,
                price: req.price,
                stock: req.stock,
                about: req.about,
                author: req.author,
                cover: cover,
                ebookGenres: {
                    create: req.genres.map(id_genre => ({
                        genre: { connect: { id_genre } }
                    }))
                }
            },
            include: {
                ebookGenres: {
                    include: { genre: true } // ambil detail genre
                }
            }
        });


        // respose 

        return toEbookResponse(response);
    }

    // get 
    static async getData(id_ebook: number): Promise<EbookResponseDataType> {
        const response = await prisma.ebook.findUnique({
            where: { id_ebook: id_ebook },
            include: {
                ebookGenres: {
                    include: { genre: true }
                }
            }
        });

        if (!response) throw new Error("Ebook not found");

        return toResponseEbookData(response);
    }

}