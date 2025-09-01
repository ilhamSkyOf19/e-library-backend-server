import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { AdminController } from "../controllers/admin.controller";
import { validationMiddleware } from "../middlewares/validation-middleware";
import { AdminValidation } from "../validation/admin-validation";

const adminRoute: Router = express.Router();

// get self
adminRoute.get('/self', tokenMiddleware('admin'), AdminController.getSelf);


// get all
adminRoute.get('/', tokenMiddleware('admin'), AdminController.getAll);

// update 
adminRoute.patch('/self-update', tokenMiddleware('admin'), validationMiddleware(AdminValidation.UPDATE), AdminController.selfUpdate);


// update password 
adminRoute.put('/update-password', tokenMiddleware('admin'), validationMiddleware(AdminValidation.UPDATE_PASSWORD), AdminController.updatePassword)


export default adminRoute;