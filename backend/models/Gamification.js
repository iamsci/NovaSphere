import mongoose from 'mongoose';

const gamificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Gamification', gamificationSchema);
