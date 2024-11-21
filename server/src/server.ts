import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './../routes/authRoutes';
import transactionRoutes from './../routes/transactionRoutes';
import budgetRoutes from './../routes/budgetRoutes';
import categoryRoutes from './../routes/categoryRoutes';
import reportRoutes from './../routes/reportRoutes';

dotenv.config();

const app:Express = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);
app.use('/categories', categoryRoutes);
app.use('/reports', reportRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

export default app;