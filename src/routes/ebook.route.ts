import express, { Router } from 'express';
import { MulterService } from '../services/multer.service';
import { tokenMiddleware } from '../middlewares/token-middleware';
import { EbookController } from '../controllers/ebook.controller';


// route 
const ebookRoute: Router = express.Router();

// add ebook
ebookRoute.post('/add-ebook', tokenMiddleware('admin'), MulterService.uploadFileCover(), EbookController.create)

export default ebookRoute