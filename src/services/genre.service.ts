import prisma from "../lib/prismaClient";
import { GenreCreateRequestType, GenreResponseType, GenreUpdateRequestType, toGenreResponse } from "../models/genre-model";
import { ResponseType } from "../types/response-type";

export class GenreService {
    // get all
    static async getAll(): Promise<GenreResponseType[]> {
        const response = await prisma.genre.findMany();
        return response.map(toGenreResponse);
    }


    // create 
    static async create(req: GenreCreateRequestType): Promise<GenreResponseType> {
        // get req
        const response = await prisma.genre.create({
            data: {
                name: req.name
            }
        })

        return toGenreResponse(response);
    }

    // update 
    static async update(id: number, req: GenreUpdateRequestType): Promise<ResponseType<GenreResponseType>> {
        // cek
        const genre = await prisma.genre.findUnique({
            where: {
                id_genre: id
            }
        });

        if (!genre) {
            return {
                success: false,
                message: "Genre not found"
            };
        }

        const response = await prisma.genre.update({
            where: {
                id_genre: id
            },
            data: {
                ...(req.name && { name: req.name })
            }
        })

        return {
            success: true,
            data: toGenreResponse(response)
        };
    }

    // delete 
    static async delete(id: number): Promise<{ success: boolean, message: string }> {
        // cek genre 
        const genre = await prisma.genre.findUnique({
            where: {
                id_genre: id
            }
        });

        if (!genre) {
            return {
                success: false,
                message: "Genre not found"
            };
        }
        // delete genre
        await prisma.genre.delete({
            where: {
                id_genre: id
            }
        })

        return {
            success: true,
            message: "Genre deleted successfully"
        }
    }
}