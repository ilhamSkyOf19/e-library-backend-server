import prisma from "../lib/prismaClient";
import { EbookCreateRequestType, EbookResponseType, toEbookResponse } from "../models/ebook-model";

export class EbookService {
    // create 
    static async create(req: EbookCreateRequestType, cover: string): Promise<EbookResponseType> {

        const response = await prisma.ebook.create({
            data: {
                ...req,
                cover: cover,
                genres: {
                    connect: (req.genres || []).map(id => ({ id_genre: id }))
                }
            },
            include: {
                genres: true
            }
        });


        // respose 

        return toEbookResponse(response);
    }
}