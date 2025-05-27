
const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const UserService = require('../services/user.service');
const authenticate = require('../middlewares/auth.middleware');
const { userDAL, roleDAL, userRoleDAL, RoleClaim } = require('../models');


const userService = new UserService(userDAL);
const userController = new UserController(userService);

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

router.get('/me', authenticate(), async (req, res) => {
  try {

    const user = await userService.getUserId(req.user.id);
    const userRole = await userRoleDAL.getRoleId(req.user.id);
    const role = await roleDAL.getRoleId(userRole.RoleId);
    const roleClaims = await RoleClaim.findAll({ where: { RoleId: req.user.roleId } });



    res.json({
      username: user.Username,
      fullName: user.HoTen,
      phone: user.SDT,
      role: role.Role,
      claimValues: roleClaims.map(c => c.ClaimValue)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin người dùng' });
  }
});


router.get('/users', (req, res) => (userController.getAll(req, res)));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));

module.exports = router;
