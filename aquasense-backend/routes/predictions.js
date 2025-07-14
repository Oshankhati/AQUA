const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Prediction = require('../models/Prediction');

// ✅ GET all predictions for logged-in user
router.get('/predictions', auth, async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user.userId }).sort({ date: 1 });
    res.json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching predictions' });
  }
});

// ✅ POST save a new prediction
router.post('/predictions', auth, async (req, res) => {
  try {
    const { predictedUsage } = req.body;
    if (!predictedUsage) {
      return res.status(400).json({ message: 'Predicted usage is required' });
    }

    const newPrediction = new Prediction({
      userId: req.user.userId,
      predictedUsage
    });

    await newPrediction.save();
    res.json(newPrediction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving prediction' });
  }
});

module.exports = router;
