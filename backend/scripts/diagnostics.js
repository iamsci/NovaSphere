import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Subscription from '../models/Subscription.js';

dotenv.config();

const runDiagnostics = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const subCount = await Subscription.countDocuments();

    console.log(`👥 Users: ${userCount}`);
    console.log(`📝 Posts: ${postCount}`);
    console.log(`💳 Subscriptions: ${subCount}`);
    console.log(`🕒 Uptime: ${process.uptime().toFixed(2)}s`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Diagnostic failed:', err.message);
    process.exit(1);
  }
};

runDiagnostics();
