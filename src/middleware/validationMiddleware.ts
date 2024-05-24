import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { StatusCodeEnum } from "../utils/statusCodesEnum";

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(StatusCodeEnum.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
  };
