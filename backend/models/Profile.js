import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  avatar: { type: String },
  niche: [{ type: String }],
  socialLinks: {
    twitter: String,
    instagram: String,
    website: String
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
