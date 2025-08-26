import User from '../models/User.js';

export const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    next(err);
  }
};
