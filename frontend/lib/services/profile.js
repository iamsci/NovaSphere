// lib/services/profile.js

import Profile from '@/models/Profile.js'; // assumes Mongoose model
import { logInfo, logError } from '@/lib/logger.js';

export async function createProfile(data) {
  try {
    const profile = new Profile(data);
    const saved = await profile.save();

    logInfo('Profile created', { id: saved._id });
    return saved;
  } catch (err) {
    logError('Profile creation failed', err);
    throw err;
  }
}
