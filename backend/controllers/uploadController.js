import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    const file = req.body.image;
    const result = await cloudinary.uploader.upload(file, {
      folder: 'novasphere'
    });

    res.status(200).json({ message: 'Upload successful', url: result.secure_url });
  } catch (err) {
    next(err);
  }
};
