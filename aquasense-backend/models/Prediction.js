const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  predictedUsage: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
