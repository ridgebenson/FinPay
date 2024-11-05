import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/passWordUtils';
import { generateToken } from '../utils/jwtUtils';

const prisma = new PrismaClient();

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, firstName, lastName, password, phone } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        phone,
      },
    });
    // res.status(201).json(user);
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    const prismaError = error as any;
    if (prismaError.code === 'P2002' && prismaError.meta?.target?.includes('email')) {
      res.status(400).json({ error: 'Email already exists' });
    } else if ((error as any).code === 'P2002' && (error as any).meta?.target?.includes('phone')) {
      res.status(400).json({ error: 'Phone number already exists' });
    } else {
      res.status(400).json({ error: (error as Error).message });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = generateToken(user.id);

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    // res.json({ message: 'Login successful' });
    res.status(201).json({ message: 'Login successful' , token: token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export { register, login };