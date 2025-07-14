const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/admin/dashboard', auth, admin, (req, res) => {
  res.json({ message: 'Welcome Admin. This is the admin dashboard.' });
});

module.exports = router;
