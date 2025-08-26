import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'CLOUDINARY_CLOUD_NAME'];

const checkEnv = () => {
  let missing = [];
  requiredEnv.forEach((key) => {
    if (!process.env[key]) missing.push(key);
  });

  if (missing.length) {
    console.error(`❌ Missing env vars: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('✅ All required env vars present');
};

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connection successful');
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

checkEnv();
checkDB();
