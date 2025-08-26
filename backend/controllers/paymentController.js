export const processPayment = async (req, res, next) => {
  try {
    const { amount, userId } = req.body;
    // Mock payment logic
    res.status(200).json({ message: `Processed $${amount} for user ${userId}` });
  } catch (err) {
    next(err);
  }
};
