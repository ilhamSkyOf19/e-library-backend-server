// dotenv
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import authRoute from './routes/auth.route';
import cookieParser from 'cookie-parser';
import ebookRoute from './routes/ebook.route';
import paymentRoutes from './routes/payment.route';
import customerRoute from './routes/customer.route';


// port 
const PORT = process.env.PORT || 3001;



// initialize express
const app = express();

// cookie parser
app.use(cookieParser());
// json 
app.use(express.json());
// parsing application/x-www-form-urlencoded dan form-data
app.use(express.urlencoded({ extended: true }));


// routes testing 
app.get('/', (_: Request, res: Response) => {
    res.send('Hello World!');
});


// success
app.get('/api/payment/succes', (_: Request, res: Response) => {
    res.send('Success!');
})

// auth route
app.use('/api/auth', authRoute);
// ebook route 
app.use('/api/ebook', ebookRoute);

// payment route
app.use('/api', paymentRoutes);


// customer edit 
app.use('/api/customer', customerRoute);


// listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});