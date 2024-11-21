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
  
    const { userId, categoryId, budgetId, amount, description, type, date } = req.body;
  
    try {
        // Check if the categoryId exists
        if (categoryId) {
          const category = await prisma.category.findUnique({ where: { id: categoryId } });
          if (!category) {
            res.status(400).json({ error: 'Invalid categoryId. Category does not exist.' });
            return;
          }
        }
    
        // Check if the budgetId exists
        if (budgetId) {
          const budget = await prisma.budget.findUnique({ where: { id: budgetId } });
          if (!budget) {
            res.status(400).json({ error: 'Invalid budgetId. Budget does not exist.' });
            return;
          }
        }
    
        const transaction = await prisma.transaction.create({
          data: { userId, categoryId, amount, description, type, date, budgetId },
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
    const { categoryId, budgetId, amount, description, type, date } = req.body;
    
    try {
        // Check if the transaction exists
        const transaction = await prisma.transaction.findUnique({ where: { id: parseInt(id) } });
        if (!transaction) {
          res.status(404).json({ error: 'Transaction not found' });
          return;
        }
    
        // Check if the categoryId exists
        if (categoryId) {
          const category = await prisma.category.findUnique({ where: { id: categoryId } });
          if (!category) {
            res.status(400).json({ error: 'Invalid categoryId. Category does not exist.' });
            return;
          }
        }
    
        // Check if the budgetId exists
        if (budgetId) {
          const budget = await prisma.budget.findUnique({ where: { id: budgetId } });
          if (!budget) {
            res.status(400).json({ error: 'Invalid budgetId. Budget does not exist.' });
            return;
          }
        }
    
        const updatedTransaction = await prisma.transaction.update({
          where: { id: parseInt(id) },
          data: { categoryId, budgetId, amount, description, type, date },
        });
        res.status(200).json({ message: 'Transaction updated successfully', updatedTransaction });
      } catch (error) {
        res.status(500).json({ error: (error as any).message });
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