import fs from 'fs/promises';
export class FileService {
    // delete
    static async deleteFile(path: string) {
        try {
            // cek file
            await fs.access(path);
            // delete 
            await fs.unlink(path)
            console.log('File deleted successfully');
        } catch (error) {
            console.log(error)
            console.warn('File not found');
        }
    }

}