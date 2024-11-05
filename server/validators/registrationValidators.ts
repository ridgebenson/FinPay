import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

const validateRegistration: RequestHandler[] = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('phone').matches(/^\d+$/).withMessage('Phone number must contain only digits'),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
];

export { validateRegistration };