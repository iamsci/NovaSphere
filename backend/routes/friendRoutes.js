import express from 'express';
import { addFriend } from '../controllers/friendController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addFriend);

export default router;
