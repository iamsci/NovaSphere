import express from 'express';
import { updateProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/:id', authMiddleware, updateProfile);

export default router;
