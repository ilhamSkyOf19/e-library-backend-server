import { Response } from "express";
import { EbookCreateRequestType, EbookResponseType } from "../models/ebook-model";
import { JwtPayloadAdmin, JwtPayloadGlobal, TokenRequest } from "../types/jwt-type";
import { ResponseType } from "../types/response-type";
import { EbookService } from "../services/ebook.service";
import validationService from "../services/validation.service";
import { EbookValidation } from "../validation/ebook-validation";

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


            // cek validation 
            const body = validationService<EbookCreateRequestType>(EbookValidation.CREATE, req.body);

            if (!body.success) {
                return res.status(400).json({
                    success: false,
                    message: body.message
                })
            }






            // get add
            const response = await EbookService.create(body.data);




            // response 
            return res.status(200).json({
                success: true,
                data: response
            })



        } catch (error) {

        }
    }
}