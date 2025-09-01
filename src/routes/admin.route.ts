import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { AdminController } from "../controllers/admin.controller";

const adminRoute: Router = express.Router();

// get all
adminRoute.get('/', tokenMiddleware('admin'), AdminController.getAll);


export default adminRoute;