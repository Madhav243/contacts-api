import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { SpamController } from '../controllers/spamController';
import { markAsSpamSchema } from '../validators/spamValidator';

const router = Router();

router.post('/',authMiddleware , validate(markAsSpamSchema), SpamController.markAsSpam);

export default router;
