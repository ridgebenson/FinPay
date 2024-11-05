import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

const generateToken = (id: number): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { generateToken, verifyToken };