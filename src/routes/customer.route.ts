import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { CustomerController } from "../controllers/customer.controller";


const customerRoute: Router = express.Router();


// edit 
customerRoute.patch('/:id', tokenMiddleware('admin'), CustomerController.edit)


export default customerRoute