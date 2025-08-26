import User from '../models/User.js';

export const getCreatorProfile = async (req, res, next) => {
  try {
    const creator = await User.findById(req.params.id);
    if (!creator) return res.status(404).json({ error: 'Creator not found' });

    res.status(200).json({ creator });
  } catch (err) {
    next(err);
  }
};
