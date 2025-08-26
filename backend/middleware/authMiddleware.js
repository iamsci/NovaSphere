import { verifyToken } from './auth.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Missing or invalid token' });

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) return res.status(403).json({ error: 'Token verification failed' });

  try {
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
