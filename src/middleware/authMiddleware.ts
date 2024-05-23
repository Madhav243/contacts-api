import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDAL } from '../dal/userDal';
import AppError from '../utils/appError';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('No token provided',401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; phoneNumber: string };
    const user = await UserDAL.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found',401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError('Invalid token',401));
  }
};
