import express from 'express';
import { sendRequest, respondToRequest } from '../controllers/friendRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', authMiddleware, sendRequest);
router.post('/respond', authMiddleware, respondToRequest);

export default router;
