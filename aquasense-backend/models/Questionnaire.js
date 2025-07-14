const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  people: Number,
  children: Number,
  temperature: Number,
  waterSavingDevices: String,
  showersPerDay: Number,
  timePerShower: Number,
  washingPerWeek: Number,
  rainwaterHarvesting: String,
  tapsRunning: String,
  estimatedUsage: Number
}, { timestamps: true });

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
