import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { paymentController } from "../controllers/payment.controller";

const paymentRoutes: Router = express.Router();

// create

paymentRoutes.post('/payment', tokenMiddleware, paymentController)


export default paymentRoutes;