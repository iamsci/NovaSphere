import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tier: { type: String, enum: ['free', 'premium', 'vip'], default: 'free' },
  active: { type: Boolean, default: true },
  renewalDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);
