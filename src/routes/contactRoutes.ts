import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { addContact } from '../validators/contactValidator';

const router = Router();

router.get('/', authMiddleware, ContactController.getContacts);
router.post('/',authMiddleware , validate(addContact), ContactController.addContact);

export default router;
