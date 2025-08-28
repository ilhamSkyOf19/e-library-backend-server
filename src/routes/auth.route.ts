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

// sign in
authRoute.post('/signin',
    validationMiddleware(CustomerValidation.LOGIN),
    CustomerController.login
);


export default authRoute;