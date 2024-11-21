import { Router } from 'express';
import { createBudget, getBudgets, updateBudget, deleteBudget, getBudgetUtilization, getAllBudgetsWithUtilization } from '../controllers/budgetController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createBudget);
router.get('/', authMiddleware, getBudgets);
router.put('/:id', authMiddleware, updateBudget);
router.delete('/:id', authMiddleware, deleteBudget);
router.get('/:id/utilization', authMiddleware, getBudgetUtilization);
router.get('/utilization/all', authMiddleware, getAllBudgetsWithUtilization);

export default router;