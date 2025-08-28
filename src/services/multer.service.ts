import multer, { FileFilterCallback } from "multer";
import { Request, RequestHandler, Response, } from "express";
import path from "path";
import fs from "fs";

export class MulterService {

    // upload file cover
    static uploadFileCover(): RequestHandler {
        const storage = multer.diskStorage({
            // destination
            destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
                // folder uploads
                const uploads: string = path.join(__dirname, '../public/uploads/cover');
                // cek folder
                if (!fs.existsSync(uploads)) {
                    fs.mkdirSync(uploads, { recursive: true });
                }

                // callback
                cb(null, uploads);
            },

            // filename 
            filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
                // date
                const date: number = Date.now();
                // ext
                const ext: string = path.extname(file.originalname);

                // full name 
                const newFileName: string = `cover-${date}${ext}`;

                // callback
                cb(null, newFileName);
            }
        })


        // file filter 
        const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type'));
            }
        }

        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 2  // 2mb
            }
        }).single('cover')

        return upload
    }
}