import express from 'express';
import { getAchievements } from '../controllers/gamificationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/achievements', authMiddleware, getAchievements);

export default router;
