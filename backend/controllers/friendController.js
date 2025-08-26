import User from '../models/User.js';

export const addFriend = async (req, res, next) => {
  try {
    const { userId, friendId } = req.body;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ error: 'User not found' });

    user.friends = [...(user.friends || []), friendId];
    await user.save();

    res.status(200).json({ message: 'Friend added', user });
  } catch (err) {
    next(err);
  }
};
