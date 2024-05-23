import * as Joi from 'joi';
import { regexPattern } from '../utils/regexContants';

export const markAsSpamSchema = Joi.object({
  phoneNumber: Joi.string().pattern(regexPattern.phoneNumber).required(),
});
