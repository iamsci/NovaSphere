export const getDashboardStats = (req, res) => {
  res.status(200).json({
    users: 1024,
    posts: 3489,
    activeCreators: 212,
    uptime: process.uptime()
  });
};
