// routes/dashboard.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const WaterUsage = require('../models/WaterUsage');

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    const usageToday = await WaterUsage.find({ user: userId, date: new Date().toDateString() });

    res.json({
      user,
      usageToday,
      dailyQuota: 150,
      leaderboard: [
        { name: 'Alice', usage: 100 },
        { name: 'Bob', usage: 120 },
        { name: user.name, usage: usageToday.reduce((a, b) => a + b.amount, 0) }
      ],
      tips: ['Fix leaks promptly', 'Use buckets instead of hoses'],
      alerts: usageToday.reduce((a, b) => a + b.amount, 0) > 150 ? ['You exceeded your daily quota!'] : [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
