import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

// Generate a report for a specific month and year
const generateReport = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);
  const { month, year } = req.body;

  try {
    // Ensure the report doesn't already exist
    const existingReport = await prisma.report.findFirst({
      where: { userId, month, year },
    });

    if (existingReport) {
      res.status(400).json({
        error: 'A report for this month and year already exists.',
      });
    }

    // Aggregate income and expense data
    const income = await prisma.transaction.aggregate({
      where: {
        userId,
        type: 'income',
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      _sum: { amount: true },
    });

    const expenses = await prisma.transaction.aggregate({
      where: {
        userId,
        type: 'expense',
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      _sum: { amount: true },
    });

    const totalIncome = income._sum.amount || 0;
    const totalExpenses = expenses._sum.amount || 0;
    const savings = totalIncome - totalExpenses;

    // Create the report
    const report = await prisma.report.create({
      data: {
        userId,
        month,
        year,
        totalIncome,
        totalExpenses,
        savings,
      },
    });

    res.status(201).json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(400).json({ error: (error as any).message });
  }
};

const getAllReports = async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);

  try {
    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }], // Latest reports first
    });

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(400).json({ error: (error as any).message });
  }
};

const getReportById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);

  try {
    const report = await prisma.report.findFirst({
      where: { id: parseInt(id), userId },
    });

    if (!report) {
      res.status(404).json({ error: 'Report not found.' });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(400).json({ error: (error as any).message });
  }
};


const updateReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { month, year, totalIncome, totalExpenses, savings } = req.body;
  try {
    const report = await prisma.report.update({
      where: { id: parseInt(id) },
      data: { month, year, totalIncome, totalExpenses, savings }
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

const deleteReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authReq = req as AuthenticatedRequest;
  const userId = parseInt(authReq.user.id);

  try {
    // Ensure the report exists and belongs to the user
    const report = await prisma.report.findFirst({
      where: { id: parseInt(id), userId },
    });

    if (!report) {
      res.status(404).json({ error: 'Report not found.' });
    }

    await prisma.report.delete({ where: { id: parseInt(id) } });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(400).json({ error: (error as any).message });
  }
};


export { generateReport, getAllReports, updateReport, deleteReport, getReportById };