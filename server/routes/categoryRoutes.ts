import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController';
import authMiddleware from '../middleware/authMiddleware';
import validateCategory from '../validators/categoryValidator';

const router = Router();

router.post('/', authMiddleware, validateCategory, createCategory);
router.get('/', authMiddleware, getCategories);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;