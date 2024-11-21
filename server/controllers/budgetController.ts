import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

// Create a new budget
const createBudget = async (req: Request, res: Response): Promise<void> => {
  const { categoryId, amount, startDate, endDate } = req.body;
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);

  try {
    // Ensure category exists
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    }

    // Create the budget
    const budget = await prisma.budget.create({
      data: {
        userId,
        categoryId,
        amount,
        startDate,
        endDate,
      },
      include: {
        category: true,
      },
    });

    // Link to the BudgetCategory table
    await prisma.budgetCategory.create({
      data: {
        budgetId: budget.id,
        categoryId,
      },
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Get all budgets for the authenticated user
const getBudgets = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: { category: true },
      skip,
      take: limit,
    });

    const totalBudgets = await prisma.budget.count({ where: { userId } });

    res.status(200).json({ total: totalBudgets, page, limit, budgets });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Update a budget
const updateBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryId, amount, startDate, endDate } = req.body;
  const authReq = req as AuthenticatedRequest;

  try {
    // Ensure budget exists
    const budget = await prisma.budget.findUnique({
      where: { id: parseInt(id) },
    });
    if (!budget) {
      res.status(404).json({ error: 'Budget not found' });
    }

    // Check category existence
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: parseInt(id) },
      data: { categoryId, amount, startDate, endDate },
    });

    // Update BudgetCategory
    await prisma.budgetCategory.upsert({
      where: { id: updatedBudget.id },
      create: { budgetId: updatedBudget.id, categoryId },
      update: { categoryId },
    });

    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Delete a budget (check for related transactions)
const deleteBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authReq = req as AuthenticatedRequest;

  try {
    // Check if budget has related transactions
    const transactions = await prisma.transaction.count({
      where: { budgetId: parseInt(id) },
    });

    if (transactions > 0) {
      res.status(400).json({
        error: 'Cannot delete budget with existing transactions. Please remove transactions first.',
      });
    }

    // Delete BudgetCategory entries and the budget
    await prisma.budgetCategory.deleteMany({ where: { budgetId: parseInt(id) } });
    await prisma.budget.delete({ where: { id: parseInt(id) } });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Budget Tracking

// Budget Utilization
const getBudgetUtilization = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Budget ID
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id); // Authenticated user ID

  try {
    const budget = await prisma.budget.findFirst({
      where: { id: parseInt(id), userId },
    });

    if (!budget) {
      res.status(404).json({ error: 'Budget not found' });
      return;
    }

    const totalSpent = await prisma.transaction.aggregate({
      where: { budgetId: budget.id },
      _sum: { amount: true },
    });

    const spentAmount = totalSpent._sum.amount || 0;

    res.status(200).json({
      budgetId: budget.id,
      budgetAmount: budget.amount,
      spentAmount,
      remainingAmount: budget.amount - spentAmount,
      startDate: budget.startDate,
      endDate: budget.endDate,
    });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

const getAllBudgetsWithUtilization = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);

  try {
    // Log the userId for debugging
    console.log('User ID:', userId);

    // Fetch budgets for the authenticated user
    const budgets = await prisma.budget.findMany({
      where: { userId }, // Ensure this filters by the correct user
    });

    if (budgets.length === 0) {
      res.status(200).json({ message: 'No budgets found for this user.' });
      return;
    }

    // Calculate utilization for each budget
    const budgetsWithUtilization = await Promise.all(
      budgets.map(async (budget) => {
        const totalSpent = await prisma.transaction.aggregate({
          where: { budgetId: budget.id },
          _sum: { amount: true },
        });

        const spentAmount = totalSpent._sum.amount || 0;

        return {
          budgetId: budget.id,
          budgetAmount: budget.amount,
          spentAmount,
          remainingAmount: budget.amount - spentAmount,
          startDate: budget.startDate,
          endDate: budget.endDate,
        };
      })
    );

    res.status(200).json(budgetsWithUtilization);
  } catch (error) {
    console.error('Error fetching budgets with utilization:', error);
    res.status(400).json({ error: (error as any).message });
  }
};



export { createBudget, 
  getBudgets, 
  updateBudget, 
  deleteBudget,
  getBudgetUtilization,
  getAllBudgetsWithUtilization
};
