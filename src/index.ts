import express, { Request, Response } from 'express';


// initialize express
const app = express();

// json 
app.use(express.json());

// routes testing 
app.get('/', (_req: Request, res: Response) => {
    res.send('hello world');
});


// listen 
app.listen(3000, () => {
    console.log('listening on port 3000');
});