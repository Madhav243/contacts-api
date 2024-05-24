import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { addContact, markAsSpamSchema } from '../validators/contactValidator';

const router = Router();

router.get('/', authMiddleware, ContactController.getContacts);
router.post('/',authMiddleware , validate(addContact), ContactController.addContact);
router.post('/spam', authMiddleware, validate(markAsSpamSchema), ContactController.markContactAsSpam);

export default router;
