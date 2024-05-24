import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { errorMessages } from '../utils/messageConstants';
import { StatusCodeEnum } from '../utils/statusCodesEnum';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodeEnum.NOT_FOUND).json({ message: errorMessages.notFound });
};

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({message : err.message})
    }

    res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({ message: errorMessages.internalServerError });
};
