import rateLimit from 'express-rate-limit';
import { errorMessages } from '../utils/messageConstants';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: errorMessages.tooManyRequests,
});
