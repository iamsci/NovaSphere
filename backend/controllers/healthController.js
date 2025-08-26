export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime()
  });
};
