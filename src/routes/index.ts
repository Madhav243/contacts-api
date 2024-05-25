import { Router } from 'express';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';
import spamRoutes from './spamRoutes';
import searchRoutes from './searchRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/spam',spamRoutes);
router.use('/search',searchRoutes)

export default router;
