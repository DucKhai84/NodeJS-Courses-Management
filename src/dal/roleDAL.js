const { Role } = require('../models');

class RoleDAL {
  getAllRoles() {
    return Role.findAll();
  }

  findByRoleName(roleName) {
    return Role.findOne({ where: { Role: roleName } });
  }

  getRoleId(roleId) {
    return Role.findByPk(roleId);
  }

  createRole(role) {
    return Role.create(role);
  }

  deleteRole(roleId) {
    return Role.destroy({
      where: {
        Id: roleId
      }
    });
  }

  updateRole(roleId, role) {
    return Role.update(role, {
      where: {
        Id: roleId
      }
    });
  }
}
module.exports = RoleDAL;