import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
    
const prisma = new PrismaClient();

const createTransaction = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    const { userId, categoryId, amount, description, type, date } = req.body;
  
    try {
      const transaction = await prisma.transaction.create({
        data: { userId, categoryId, amount, description, type, date },
      });
      res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  };
  

const getTransactions = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { userId, type, page = 1, limit = 10 } = req.query;

    const filters: any = {};
    if (userId) filters.userId = parseInt(userId as string);
    if (type) filters.type = type;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    try {
        const transactions = await prisma.transaction.findMany({
            where: filters,
            skip: skip,
            take: parseInt(limit as string),
        });
        const total = await prisma.transaction.count({ where: filters });
        res.status(200).json({ transactions, total, page: parseInt(page as string), limit: parseInt(limit as string) });
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    
    const { id } = req.params;
    const { categoryId, amount, description, type, date } = req.body;
    
    try {
        // Check if the transaction exists
        const existingTransaction = await prisma.transaction.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!existingTransaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }

        const transaction = await prisma.transaction.update({
            where: { id: parseInt(id) },
            data: { categoryId, amount, description, type, date: new Date(date) },
        });
        res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    
    const { id } = req.params;
    
    try {
        await prisma.transaction.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

export { createTransaction, getTransactions, updateTransaction, deleteTransaction };