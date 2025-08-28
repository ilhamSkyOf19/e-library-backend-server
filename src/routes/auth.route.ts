import express from 'express';
import { validationMiddleware } from '../middlewares/validation-middleware';
import { CustomerValidation } from '../validation/customer-validation';
import { CustomerController } from '../controllers/customer.controller';


const authRoute = express.Router();

// sign up
authRoute.post('/signup',
    validationMiddleware(CustomerValidation.CREATE),
    CustomerController.signup
);


export default authRoute;