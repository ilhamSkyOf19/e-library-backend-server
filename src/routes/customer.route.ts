import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { CustomerController } from "../controllers/customer.controller";
import { validationMiddleware } from "../middlewares/validation-middleware";
import { CustomerValidation } from "../validation/customer-validation";


const customerRoute: Router = express.Router();


// get all customer 
customerRoute.get('/', tokenMiddleware('admin'), CustomerController.getAll)

// edit 
customerRoute.patch('/edit', tokenMiddleware('customer'), validationMiddleware(CustomerValidation.EDIT), CustomerController.edit)

// edit password
customerRoute.patch('/edit-password', tokenMiddleware('customer'), validationMiddleware(CustomerValidation.EDIT_PASSWORD), CustomerController.editPassword)



export default customerRoute