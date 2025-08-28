import { ZodError, ZodType } from "zod";
import { ResponseType } from "../types/response-type";

const validationService = <T>(
    schema: ZodType<T>,
    req: T
): ResponseType<T> => {
    const result = schema.safeParse(req);

    if (!result.success) {
        const errorMessages = result.error.issues.map((err) => err.message)[0];
        return {
            success: false,
            message: errorMessages,
        };
    }

    return {
        success: true,
        data: result.data,
    };
};



export default validationService
