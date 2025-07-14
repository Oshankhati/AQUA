const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');

// POST /api/questionnaire
router.post('/', async (req, res) => {
  try {
    const newData = new Questionnaire(req.body);
    await newData.save();
    res.status(201).json({ message: 'Questionnaire data saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
