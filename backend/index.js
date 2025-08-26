import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import redis from 'redis';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './utils/logger.js';
import chatSocket from './sockets/chatSocket.js';
import notificationSocket from './sockets/notificationSocket.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => logger.info('🟢 MongoDB connected'))
  .catch(err => logger.error(`❌ MongoDB error: ${err.message}`));

// Redis connection
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on('error', err => logger.error(`❌ Redis error: ${err.message}`));
await redisClient.connect();

// WebSocket setup
io.on('connection', (socket) => {
  logger.info(`🔌 Socket connected: ${socket.id}`);
  chatSocket(io, socket);
  notificationSocket(io, socket);
  socket.on('disconnect', () => logger.info(`❌ Socket disconnected: ${socket.id}`));
});

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));
