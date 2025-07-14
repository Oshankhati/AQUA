require('dotenv').config();
const mongoose = require('mongoose');
const Usage = require('../models/Usage');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Connected to MongoDB');

  // 🔧 Replace with your actual user ID from your Users collection
  const userId = '686a26ba1ad6c494eabc0039'
;

  // Create dummy usage data for last 7 days
  const today = new Date();
  const usageData = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    usageData.push({
      userId: userId,
      date: date,
      amount: Math.floor(Math.random() * 200) + 50, // random between 50-250 liters
    });
  }

  try {
    await Usage.insertMany(usageData);
    console.log('🌟 Dummy usage data inserted successfully');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
