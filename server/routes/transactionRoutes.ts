import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import authMiddleware from '../middleware/authMiddleware';
import {validateCreateTransaction, 
    validateUpdateTransaction, 
    validateDeleteTransaction, 
    validateGetTransactions} from '../validators/transactionValidators'


const router = Router();

router.post('/', authMiddleware, validateCreateTransaction, createTransaction);
router.get('/', authMiddleware,getTransactions);
router.put('/:id', authMiddleware, validateUpdateTransaction,updateTransaction);
router.delete('/:id', authMiddleware, validateDeleteTransaction,deleteTransaction);

export default router;