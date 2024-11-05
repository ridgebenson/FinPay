import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './../utils/jwtUtils';

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token ||req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default authenticate;