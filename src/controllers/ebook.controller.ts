import { Response, Request, NextFunction } from "express";
import { EbookCreateRequestType, EbookResponseDetailType, EbookResponseType, toResponseEbookData, type EbookUpdateRequestType } from "../models/ebook-model";
import { TokenRequest } from "../types/jwt-type";
import { ResponseType } from "../types/response-type";
import { EbookService } from "../services/ebook.service";
import validationService from "../services/validation.service";
import { EbookValidation } from "../validation/ebook-validation";
import { FileService } from "../services/file.service";
import prisma from "../lib/prismaClient";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

export class EbookController {

    // get all ebook 
    static async getAll(_: Request, res: Response<ResponseType<EbookResponseDetailType[]>>, next: NextFunction) {
        try {
            const response = await EbookService.getAll();

            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            console.log(error)
            if (error instanceof PrismaClientKnownRequestError) {
                return next(error);
            }
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    // create
    static async create(req: TokenRequest<{}, {}, EbookCreateRequestType>, res: Response<ResponseType<EbookResponseType>>) {
        try {
            // get user 
            const { role } = req.data ?? {}

            // cek role 
            if (role !== "ADMIN") {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }


            // genres array 
            const genresArray = JSON.parse(req.body.genres.toString());
            // price number 
            req.body.price = Number(req.body.price);
            // stock number
            req.body.stock = Number(req.body.stock);

            // cek validation 
            const body = validationService<EbookCreateRequestType>(EbookValidation.CREATE, { ...req.body, genres: genresArray });


            // cek validation
            if (!body.success) {
                // cek file and delete 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }

                return res.status(400).json({
                    success: false,
                    message: body.message
                })
            }


            // cek genre 
            const findGenre = await prisma.genre.findMany({
                where: {
                    id_genre: {
                        in: body.data.genres
                    }
                }
            })

            if (findGenre.length !== (genresArray?.length ?? 0)) {
                return res.status(400).json({
                    success: false,
                    message: "Genre not found"
                })
            }

            // get add
            const response = await EbookService.create(body.data, req.file?.filename ?? "");


            // response 
            return res.status(200).json({
                success: true,
                data: response
            })



        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


    // update 
    static async update(req: Request<{ id: string }, {}, EbookUpdateRequestType>, res: Response) {
        try {
            if (!req.body && !req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Bad Request"
                });
            }

            console.log("req.body", req.body.genres);
            // get id params 
            const { id } = req.params;
            // genres array 
            const genresArray = req.body.genres ? JSON.parse(req.body.genres.toString()) : undefined;
            req.body.price = req.body.price !== undefined ? Number(req.body.price) : undefined;
            req.body.stock = req.body.stock !== undefined ? Number(req.body.stock) : undefined;


            // cek validation 
            const body = validationService<EbookUpdateRequestType>(EbookValidation.UPDATE, { ...req.body, genres: genresArray });

            // cek validation
            if (!body.success) {
                // cek file and delete 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }

                return res.status(400).json({
                    success: false,
                    message: body.message
                })
            }


            // cek genres
            if (body.data.genres && genresArray) {
                // cek genre 
                const findGenre = await prisma.genre.findMany({
                    where: {
                        id_genre: {
                            in: body.data.genres
                        }
                    }
                })

                if (findGenre.length !== genresArray.length) {
                    return res.status(400).json({
                        success: false,
                        message: "Genre not found"
                    })
                }
            }






            // update 
            const response = await EbookService.update(body.data, req.file?.filename, Number(id));


            return res.status(200).json({
                success: true,
                data: response
            })


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}