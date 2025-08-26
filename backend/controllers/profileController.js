import User from '../models/User.js';

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Profile updated', updated });
  } catch (err) {
    next(err);
  }
};
