import { Router } from 'express';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes)

export default router;
