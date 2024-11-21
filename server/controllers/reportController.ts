import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createReport = async (req: Request, res: Response) => {
  const { userId, month, year, totalIncome, totalExpenses, savings } = req.body;
  try {
    const report = await prisma.report.create({
      data: { userId, month, year, totalIncome, totalExpenses, savings }
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.report.findMany();
    res.status(200).json(reports);
  } catch (error) {
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
  try {
    await prisma.report.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export { createReport, getReports, updateReport, deleteReport };