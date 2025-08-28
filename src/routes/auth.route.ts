import express, { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation-middleware';
import { CustomerValidation } from '../validation/customer-validation';
import { CustomerController } from '../controllers/customer.controller';
import { AdminController } from '../controllers/admin.controller';
import { AdminValidation } from '../validation/admin-validation';


const authRoute: Router = express.Router();

// sign up
authRoute.post('/sign-up',
    validationMiddleware(CustomerValidation.CREATE),
    CustomerController.signup
);

// sign in
authRoute.post('/sign-in',
    validationMiddleware(CustomerValidation.LOGIN),
    CustomerController.login
);


// sing up admin
authRoute.post('/admin/sign-up',
    validationMiddleware(AdminValidation.CREATE),
    AdminController.signup
);


// sing up admin
authRoute.post('/admin/sign-in',
    validationMiddleware(AdminValidation.SIGNIN),
    AdminController.signin
);


export default authRoute;