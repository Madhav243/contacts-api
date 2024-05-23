import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Resource not found' });
};

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({message : err.message})
    }

    res.status(500).json({ message: 'Internal Server Error' });
};
