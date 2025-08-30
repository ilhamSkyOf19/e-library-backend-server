import { NextFunction, Request, Response } from "express";
import { GenreCreateRequestType, GenreResponseType, GenreUpdateRequestType } from "../models/genre-model";
import { ResponseType } from "../types/response-type";
import { GenreService } from "../services/genre.service";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";


export class GenreController {
    // get
    static async get(_: Request, res: Response<ResponseType<GenreResponseType[]>>) {
        try {
            // call service
            const response = await GenreService.getAll();

            // return response
            return res.status(200).json({
                success: true,
                data: response
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    // create
    static async create(req: Request<{}, {}, GenreCreateRequestType>, res: Response<ResponseType<GenreResponseType>>) {
        try {
            // get body
            const body = req.body;


            // call service 
            const response = await GenreService.create(body);


            // return response
            return res.status(201).json({
                success: true,
                data: response
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


    // update 
    static async update(req: Request<{ id: string }, {}, GenreUpdateRequestType>, res: Response<ResponseType<GenreResponseType | { message: string }>>, next: NextFunction) {
        try {
            // get body
            const body = req.body


            // get params 
            const { id } = req.params;

            if (body.name === undefined) {
                return res.status(200).json({
                    success: true,
                    data: {
                        message: "No data to update"
                    }
                })
            }

            // call service
            const response = await GenreService.update(Number(id), body);

            if (!response.success) {
                return res.status(404).json(response);
            }

            // return response
            return res.status(200).json({
                success: true,
                data: response.data
            });

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return next(error);
            }
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }


    // delete 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseType<{ success: boolean, message: string }>>) {
        try {
            // cek id params 
            const id = req.params.id;

            // delete
            const response = await GenreService.delete(Number(id));

            // return response 
            return res.status(200).json({
                success: true,
                data: response
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}