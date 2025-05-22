// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware'); 
const { RoleClaim } = require('../models');


router.get('/me/claims', authenticate(), async (req, res) => {
    try {
      const roleId = req.user.roleId;
      if (!roleId) return res.status(400).json({ message: 'Token không chứa RoleId' });
  
      const roleClaims = await RoleClaim.findAll({ where: { RoleId: roleId } });
  
      const claims = roleClaims.map(rc => ({
        type: rc.ClaimType,
        value: rc.ClaimValue
      }));
  
      res.json({
        userId: req.user.id,
        roleId,
        claims
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Lỗi khi lấy quyền người dùng' });
    }
  });

router.get('/users', (req, res) => (userController.getAll(req, res)));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));

module.exports = router;
