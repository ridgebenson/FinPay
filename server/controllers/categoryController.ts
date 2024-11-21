import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createCategory = async (req: Request, res: Response) => {
  const { userId, name, type } = req.body;
  try {
    const category = await prisma.category.create({
      data: { userId, name, type }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

const getCategories = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const categories = await prisma.category.findMany({
      where: { userId: parseInt(userId as string) }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, type }
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export { createCategory, getCategories, updateCategory, deleteCategory };