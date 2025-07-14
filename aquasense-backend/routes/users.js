// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// ✅ Example protected route to get all users (update logic as needed)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.get('/test', (req, res) => {
//   res.send('Users route working');
// });

// module.exports = router;
