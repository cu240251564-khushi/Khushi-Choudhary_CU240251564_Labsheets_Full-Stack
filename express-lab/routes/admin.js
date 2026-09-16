const express = require('express');
const router = express.Router();

// Middleware: check x-api-key header (Part D #12)
router.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(403).json({ error: '403 Forbidden: Missing x-api-key header' });
  }
  next();
});

// Protected route GET /admin/dashboard (Part D #13)
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', status: 'Authorized' });
});

module.exports = router;
