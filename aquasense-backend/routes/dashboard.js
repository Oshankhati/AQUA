const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Usage = require('../models/Usage');
const User = require('../models/User'); // ✅ Import User model for clarity if needed

// ✅ Protected dashboard route
router.get('/dashboard', auth, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}, this is your dashboard.`,
    user: req.user
  });
});

// ✅ New route: Get user's historical water usage
router.get('/history', auth, async (req, res) => {
  try {
    const usageHistory = await Usage.find({ userId: req.user.userId })
      .sort({ date: 1 })
      .populate('userId', 'name email'); // 🔥 populate user name and email

    res.json(usageHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching usage history' });
  }
});

// ✅ Example: Admin route to view all usage data with user details
router.get('/all-usage', auth, async (req, res) => {
  try {
    // If you have role-based access, ensure only admins can access this
    // if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const allUsage = await Usage.find()
      .sort({ date: -1 })
      .populate('userId', 'name email');

    res.json(allUsage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching all usage data' });
  }
});

module.exports = router;
