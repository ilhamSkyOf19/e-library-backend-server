import z, { ZodType } from "zod";
import { GenreCreateRequestType, GenreUpdateRequestType } from "../models/genre-model";

export class GenreValidation {
    // create 
    static readonly create = z.object({
        name: z.string().min(1).max(100)
    }).strict() satisfies ZodType<GenreCreateRequestType>;

    // update 
    static readonly update = z.object({
        name: z.string().min(1).max(100).optional()
    }).strict() satisfies ZodType<GenreUpdateRequestType>;

}