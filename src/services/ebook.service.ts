import { includes } from "zod";
import prisma from "../lib/prismaClient";
import { EbookCreateRequestType, EbookResponseDataType, EbookResponseType, EbookUpdateRequestType, toEbookResponse, toResponseEbookData } from "../models/ebook-model";
import { FileService } from "./file.service";

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


    // update 
    static async update(req: EbookUpdateRequestType, cover?: string, id_ebook?: number): Promise<{ success: boolean, data: EbookUpdateRequestType | { message: string } }> {



        // cek ebook
        const ebook = await prisma.ebook.findUnique({ where: { id_ebook: id_ebook } });

        // cek ebook
        if (!ebook) return { success: false, data: { message: "ebook not found" } }

        // cek cover 
        if (cover) {
            // hapus file lama
            await FileService.deleteFileFormPath(ebook.cover, "cover");
        }


        // update db
        const response = await prisma.ebook.update({
            where: {
                id_ebook: id_ebook
            },
            data: {
                ...(req.name && { name: req.name }),
                ...(req.price && { price: req.price }),
                ...(req.stock && { stock: req.stock }),
                ...(req.about && { about: req.about }),
                ...(req.author && { author: req.author }),
                ...(cover && { cover }),
                ...(req.genres && {
                    ebookGenres: {
                        deleteMany: {}, // hapus semua relasi lama
                        create: req.genres.map(id_genre => ({
                            genre: { connect: { id_genre } }
                        }))
                    }
                })
            }
        });

        return { success: true, data: response };
    }
}