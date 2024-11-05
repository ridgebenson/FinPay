import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './../routes/authRoutes';

dotenv.config();

const app:Express = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});