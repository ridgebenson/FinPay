import { Router } from 'express';
import { createReport, getReports, updateReport, deleteReport } from '../controllers/reportController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports);
router.put('/:id', authMiddleware, updateReport);
router.delete('/:id', authMiddleware, deleteReport);

export default router;