const jwt = require('jsonwebtoken');
const { RoleClaim } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (requiredClaims = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token không được cung cấp' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token không được cung cấp' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = {
        id: decoded.id,
        roleId: decoded.roleId,
      };


      const roleId = decoded.roleId;
      if (!roleId) return res.status(403).json({ message: 'Không tìm thấy role của user' });

      const roleClaims = await RoleClaim.findAll({ where: { RoleId: roleId } });
      const claimValues = roleClaims.map(rc => rc.ClaimValue);

      if (requiredClaims.length === 0) {
        return next();
      }
      const hasPermission = requiredClaims.some(claim => claimValues.includes(claim));
      if (!hasPermission) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: 'Token không hợp lệ hoặc hết hạn' });
    }
  };
};
