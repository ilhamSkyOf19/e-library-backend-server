import * as fsp from 'fs/promises';
import * as fs from 'fs';
import path from 'path'
export class FileService {
    // delete
    static async deleteFile(path: string) {
        try {
            // cek file
            await fsp.access(path);
            // delete 
            await fsp.unlink(path)
            console.log('File deleted successfully');
        } catch (error) {
            console.log(error)
            console.warn('File not found');
        }
    }

    // delete file path 
    static async deleteFileFormPath(fileName: string, filePath: string): Promise<{ success: boolean, message: string }> {
        if (!filePath || !fileName) return {
            success: false,
            message: "File not exist"
        }

        const filePathFull = path.join(
            __dirname,
            `../../public/uploads/${filePath}/${fileName}`
        );


        // delete file
        try {
            // cek file
            await fsp.access(filePathFull);
            // delete file
            await fsp.unlink(filePathFull);

            return {
                success: true,
                message: "File deleted successfully"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "File not found or failed to delete"
            };
        }
    }

}