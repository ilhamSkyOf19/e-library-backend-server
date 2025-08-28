// dotenv
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import authRoute from './routes/auth.route';
import cookieParser from 'cookie-parser';
import ebookRoute from './routes/ebook.route';
import prisma from './lib/prismaClient';


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
app.get('/', async (_req: Request, res: Response) => {
    const ebookWithGenreNames = await prisma.ebook.findUnique({
        where: { id_ebook: 6 },
        select: {
            id_ebook: true,
            name: true,
            genres: {
                select: { name: true }
            }
        }
    });

    const genre: string[] | undefined = ebookWithGenreNames?.genres.map(genre => genre.name);

    return res.status(200).json(genre);
});

// auth route
app.use('/api/auth', authRoute);
// ebook route 
app.use('/api/ebook', ebookRoute);


// listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});