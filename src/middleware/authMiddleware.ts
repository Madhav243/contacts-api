import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDAL } from '../dal/userDal';
import AppError from '../utils/appError';
import { StatusCodeEnum } from '../utils/statusCodesEnum';
import { errorMessages } from '../utils/messageConstants';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(errorMessages.noTokenProvided,StatusCodeEnum.UNAUTHORIZED));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; phoneNumber: string };
    const user = await UserDAL.findById(decoded.id);

    if (!user) {
      return next(new AppError(errorMessages.userNotFound,StatusCodeEnum.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError(errorMessages.invalidToken,StatusCodeEnum.UNAUTHORIZED));
  }
};
