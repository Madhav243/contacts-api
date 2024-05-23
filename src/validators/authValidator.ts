import * as Joi from 'joi';
import { regexPattern } from '../utils/regexContants';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().pattern(regexPattern.phoneNumber).required(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  phoneNumber: Joi.string().pattern(regexPattern.phoneNumber).required(),
  password: Joi.string().min(6).required(),
});
