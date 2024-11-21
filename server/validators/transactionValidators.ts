import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult, param } from 'express-validator';

const validateCreateTransaction: RequestHandler[] = [
    body('userId').isNumeric().withMessage('User ID must be a number'),
    body('categoryId').isNumeric().withMessage('Category ID must be a number'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('date').custom((value) => {
        if (isNaN(Date.parse(value))) {
            throw new Error('Date must be a valid date');
        }
        return true;
    }).withMessage('Date must be a valid date'), body('type').isIn(['income', 'expense']).withMessage('Type must be either income or expense'),

    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];

const validateUpdateTransaction: RequestHandler[] = [
    body('categoryId').isNumeric().withMessage('Category ID must be a number'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('date').custom((value) => {
        if (isNaN(Date.parse(value))) {
            throw new Error('Date must be a valid date');
        }
        return true;
    }).withMessage('Date must be a valid date'), body('type').isIn(['income', 'expense']).withMessage('Type must be either income or expense'),

    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];

const validateDeleteTransaction: RequestHandler[] = [
    param('id').isNumeric().withMessage('ID must be a number'),

    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];

const validateGetTransactions: RequestHandler[] = [
    body('userId').isNumeric().withMessage('User ID must be a number'),

    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];

export { validateCreateTransaction, validateUpdateTransaction, validateDeleteTransaction, validateGetTransactions };