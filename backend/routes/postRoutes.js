import express from 'express';
import { createPost, getFeed } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/feed', authMiddleware, getFeed);

export default router;
