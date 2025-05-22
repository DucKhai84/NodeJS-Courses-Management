const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const requireRole = require('../middlewares/auth.middleware');

router.get('/admin-only', requireRole(['admin']), (req, res) => {
    res.send('Chỉ admin mới vào được!');
  });

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
