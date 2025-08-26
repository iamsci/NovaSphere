import Post from '../models/Post.js';

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    next(err);
  }
};

export const getFeed = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};
