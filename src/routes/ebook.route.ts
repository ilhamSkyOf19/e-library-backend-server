import express, { Router } from 'express';
import { MulterService } from '../services/multer.service';
import { tokenMiddleware } from '../middlewares/token-middleware';
import { EbookService } from '../services/ebook.service';
import { EbookController } from '../controllers/ebook.controller';


// route 
const ebookRoute: Router = express.Router();

ebookRoute.post('/add-ebook', tokenMiddleware, MulterService.uploadFileCover(), EbookController.create)

export default ebookRoute