import express, { Request, Response } from 'express';
import authRoute from './routes/auth.route';


// initialize express
const app = express();

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
app.listen(3000, () => {
    console.log('listening on port 3000');
});