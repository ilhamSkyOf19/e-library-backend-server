import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { GenreController } from "../controllers/genre.controller";
import { validationMiddleware } from "../middlewares/validation-middleware";
import { GenreValidation } from "../validation/genre-validation";

const genreRouter: Router = express.Router();

// get all
genreRouter.get('/genre', tokenMiddleware('admin'), GenreController.get);


// create 
genreRouter.post('/genre', tokenMiddleware('admin'), validationMiddleware(GenreValidation.create), GenreController.create);

// update 
genreRouter.patch('/genre/:id', tokenMiddleware('admin'), validationMiddleware(GenreValidation.update), GenreController.update);

// delete
genreRouter.delete('/genre/:id', tokenMiddleware('admin'), GenreController.delete);

export default genreRouter;