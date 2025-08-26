import express from 'express';
import { login, register } from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import { registerSchema } from '../schemas/userSchema.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', login);

export default router;
