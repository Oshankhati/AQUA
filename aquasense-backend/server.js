
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // <-- IMPORTANT to parse JSON body
app.use('/uploads', express.static('uploads'));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Route Imports
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const questionnaireRoutes = require('./routes/questionnaire');
const predictionRoutes = require('./routes/predictions');
const postRoutes = require('./routes/postRoutes'); // ✅ NEW LINE

// Route Middleware
app.use('/api/admin', adminRoutes);
app.use('/api', authRoutes); // <-- mounts /api/signup
app.use('/api', dashboardRoutes);
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api', predictionRoutes);
app.use('/api/posts', postRoutes); // ✅ NEW LINE

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));