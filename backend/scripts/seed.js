import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Subscription from '../models/Subscription.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await User.deleteMany();
    await Post.deleteMany();
    await Subscription.deleteMany();

    const users = await User.insertMany([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ]);

    const posts = await Post.insertMany([
      { author: users[0]._id, content: 'Hello from Alice!' },
      { author: users[1]._id, content: 'Bob’s first post' }
    ]);

    await Subscription.insertMany([
      { subscriber: users[1]._id, creator: users[0]._id, tier: 'premium' }
    ]);

    console.log('🌱 Seeded users, posts, and subscriptions');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedData();
