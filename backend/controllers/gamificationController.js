export const getAchievements = (req, res) => {
  res.status(200).json({
    badges: ['First Post', '100 Likes', 'Top Creator'],
    points: 1200,
    level: 5
  });
};
