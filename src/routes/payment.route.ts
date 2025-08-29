import express, { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { handleAfterPayment, paymentController } from "../controllers/payment.controller";
import { validationMiddleware } from "../middlewares/validation-middleware";
import { PaymentValidation } from "../validation/payment-validation";

const paymentRoutes: Router = express.Router();

// create
paymentRoutes.post('/payment', tokenMiddleware, validationMiddleware(PaymentValidation.CREATE), paymentController)


// handle after payment 
paymentRoutes.post('/handle-after-payment', handleAfterPayment)


export default paymentRoutes;