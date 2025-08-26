import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Example migration: add default role to users missing it
    const result = await mongoose.connection.db.collection('users').updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );

    console.log(`🔧 Migrated ${result.modifiedCount} users`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
};

runMigration();
