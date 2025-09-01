import express, { Router } from 'express';
import { MulterService } from '../services/multer.service';
import { tokenMiddleware } from '../middlewares/token-middleware';
import { EbookController } from '../controllers/ebook.controller';
import { validationParams } from '../middlewares/validation-params';
import { EbookValidation } from '../validation/ebook-validation';


// route 
const ebookRoute: Router = express.Router();

// get All
ebookRoute.get('/', tokenMiddleware('all'), EbookController.getAll)


// get by id
ebookRoute.get('/:id', tokenMiddleware('all'), validationParams(EbookValidation.GET_BY_ID), EbookController.getDetail)

// add ebook
ebookRoute.post('/add-ebook', tokenMiddleware('admin'), MulterService.uploadFileCover(), EbookController.create)

// update ebook
ebookRoute.patch('/update-ebook/:id', tokenMiddleware('admin'), MulterService.uploadFileCover(), EbookController.update)
export default ebookRoute