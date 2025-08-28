import { Response } from "express";
import { EbookCreateRequestType, EbookResponseType } from "../models/ebook-model";
import { TokenRequest } from "../types/jwt-type";
import { ResponseType } from "../types/response-type";
import { EbookService } from "../services/ebook.service";
import validationService from "../services/validation.service";
import { EbookValidation } from "../validation/ebook-validation";
import { FileService } from "../services/file.service";
import prisma from "../lib/prismaClient";

export class EbookController {

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


            // cek genre 
            const findGenre = await prisma.genre.findMany({
                where: {
                    id_genre: {
                        in: genresArray
                    }
                }
            })

            if (findGenre.length !== genresArray.length) {
                return res.status(400).json({
                    success: false,
                    message: "Genre not found"
                })
            }

            // price number 
            req.body.price = Number(req.body.price);
            // stock number
            req.body.stock = Number(req.body.stock);


            // cek validation 
            const body = validationService<EbookCreateRequestType>(EbookValidation.CREATE, { ...req.body, genres: genresArray });

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
}