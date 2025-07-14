const mongoose = require('mongoose');
const fs = require('fs');
const { Parser } = require('json2csv');
const Questionnaire = require('./models/Questionnaire');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const data = await Questionnaire.find().lean();
    const parser = new Parser();
    const csv = parser.parse(data);
    fs.writeFileSync('questionnaire_data.csv', csv);
    console.log('✅ Data exported to questionnaire_data.csv');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
