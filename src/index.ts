// dotenv
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import authRoute from './routes/auth.route';
import cookieParser from 'cookie-parser';


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
app.get('/', (_req: Request, res: Response) => {
    res.send('hello world');
});

// auth route
app.use('/api/auth', authRoute);


// listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});