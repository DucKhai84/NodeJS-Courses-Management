const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const khoaHocRoutes = require('./khoaHoc.routes'); 

// Routes
router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', khoaHocRoutes);

module.exports = router;