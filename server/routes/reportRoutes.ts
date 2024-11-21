import { Router } from 'express';
import { generateReport, getAllReports, updateReport, deleteReport, getReportById } from '../controllers/reportController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, generateReport);
router.get('/', authMiddleware, getAllReports);
router.get('/:id', authMiddleware, getReportById);
router.put('/:id', authMiddleware, updateReport);
router.delete('/:id', authMiddleware, deleteReport);

export default router;