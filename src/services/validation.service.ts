import { ZodError, ZodType } from "zod";
import { ResponseType } from "../types/response-type";


const validationService = <T>(schema: ZodType<T>, req: T): ResponseType<T> => {
    try {
        // cek req
        if (!req) return {
            success: false,
            message: "Invalid Request"
        };

        // validate the request body
        const parse = schema.parse(req)

        return {
            success: true,
            data: parse
        };

    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((err) => err.message)[0];

            return {
                success: false,
                message: errorMessages
            };
        }

        return {
            success: false,
            message: "Internal Server Error"
        }
    }
}


export default validationService;