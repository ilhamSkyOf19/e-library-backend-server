import express, { Router } from 'express';
import { MulterService } from '../services/multer.service';
import { tokenMiddleware } from '../middlewares/token-middleware';
import { EbookController } from '../controllers/ebook.controller';


// route 
const ebookRoute: Router = express.Router();

// get All
ebookRoute.get('/', tokenMiddleware('all'), EbookController.getAll)

// add ebook
ebookRoute.post('/add-ebook', tokenMiddleware('admin'), MulterService.uploadFileCover(), EbookController.create)

// update ebook
ebookRoute.patch('/update-ebook/:id', tokenMiddleware('admin'), MulterService.uploadFileCover(), EbookController.update)
export default ebookRoute