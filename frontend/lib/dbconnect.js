// lib/dbconnect.js

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI in environment');
}

let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
