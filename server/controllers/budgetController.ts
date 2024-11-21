import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new budget
const createBudget = async (req: Request, res: Response): Promise<void> => {
  const { userId, categoryId, amount, startDate, endDate } = req.body;
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // Ensure user and category exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!user || !category) {
      res.status(404).json({ error: 'User or Category not found' });
    }

    // Create the budget and include the category in the response
    const budget = await prisma.budget.create({
      data: {
        userId,
        categoryId,
        amount,
        startDate,
        endDate,
      },
      include: {
        category: true,  // Include the category data in the response
      },
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Get all budgets (with user and category details)
const getBudgets = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const userId = authReq.user.id; // Assuming user ID is stored in req.user after authentication middleware
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const budgets = await prisma.budget.findMany({
      where: { userId: parseInt(userId) },
      include: {
        category: true,  // Include category details
      },
      skip: skip,
      take: limit,
    });

    const totalBudgets = await prisma.budget.count({
      where: { userId: parseInt(userId) },
    });

    res.status(200).json({
      total: totalBudgets,
      page: page,
      limit: limit,
      budgets: budgets,
    });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Update a budget
const updateBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryId, amount, startDate, endDate } = req.body;
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // Ensure the budget exists
    const budgetExists = await prisma.budget.findUnique({
      where: { id: parseInt(id) }
    });
    if (!budgetExists) {
      res.status(404).json({ error: 'Budget not found' });
    }

    // Check if category exists
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: parseInt(id) },
      data: {
        categoryId,
        amount,
        startDate,
        endDate,
      },
    });

    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Delete a budget (check if there are related transactions first)
const deleteBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // Example: Use raw SQL queries to ensure flexibility in fetching data
    const transactions = await prisma.$queryRaw<any[]>`
      SELECT * FROM "Transaction" WHERE "budgetId" = ${parseInt(id)};
    `;

    if (transactions.length > 0) {
      res.status(400).json({
        error: 'Cannot delete budget with existing transactions. Please remove transactions first.',
      });
    }

    // Proceed with the deletion
    await prisma.budget.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: (error as any).message });
  }
};

export { createBudget, getBudgets, updateBudget, deleteBudget };
