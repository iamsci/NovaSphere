import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getDashboardStats);

export default router;
