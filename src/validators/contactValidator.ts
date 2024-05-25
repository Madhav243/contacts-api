import * as Joi from 'joi';
import { regexPattern } from '../utils/regexContants';



export const addContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().pattern(regexPattern.phoneNumber).required(),
})