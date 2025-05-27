const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const AuthService = require('../services/auth.service');

const { userDAL, roleDAL, userRoleDAL } = require('../models');

const authService = new AuthService(userDAL, roleDAL, userRoleDAL);
const authController = new AuthController(authService);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
