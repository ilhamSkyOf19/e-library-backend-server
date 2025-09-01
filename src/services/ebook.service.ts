import prisma from "../lib/prismaClient";
import { EbookCreateRequestType, EbookResponseDataType, EbookResponseDetailType, EbookResponseType, EbookUpdateRequestType, toEbookResponse, toEbookResponseDetail, toResponseEbookData } from "../models/ebook-model";
import { FileService } from "./file.service";
import path from "path";


export class EbookService {
    // get All
    static async getAll(): Promise<EbookResponseDetailType[]> {
        const response = await prisma.ebook.findMany({
            include: {
                ebookGenres: {
                    include: { genre: true }
                }
            }
        })

        // path 
        const pathname = path.join(__dirname, "..", "..", "public", "uploads", "cover");

        // file with path
        const fileWihtPathname = response.map(ebook => ({
            ...ebook,
            cover: path.join(pathname, ebook.cover)
        }));

        return fileWihtPathname.map(toEbookResponseDetail);
    }

    // get detail 
    static async getDetail(id_ebook: number): Promise<EbookResponseDetailType> {
        const response = await prisma.ebook.findUniqueOrThrow({
            where: { id_ebook: id_ebook },
            include: {
                ebookGenres: {
                    include: { genre: true }
                }
            }
        })

        // cek response
        if (!response) throw new Error("Ebook not found asdsa");


        // path 
        const pathname = path.join(__dirname, "..", "..", "public", "uploads", "cover");

        // file with path
        response.cover = path.join(pathname, response.cover);


        return toEbookResponseDetail(response);
    }


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
        const response = await prisma.ebook.findUniqueOrThrow({
            where: { id_ebook: id_ebook },
            include: {
                ebookGenres: {
                    include: { genre: true }
                }
            }
        });


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