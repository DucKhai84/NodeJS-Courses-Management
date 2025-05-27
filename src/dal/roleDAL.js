
class RoleDAL {
  constructor(Role) {
    this.role = Role;
  }
  getAllRoles() {
    return this.role.findAll();
  }

  findByRoleName(roleName) {
    return this.role.findOne({ where: { Role: roleName } });
  }

  getRoleId(roleId) {
    return this.role.findByPk(roleId);
  }

  createRole(role) {
    return this.role.create(role);
  }

  deleteRole(roleId) {
    return this.role.destroy({
      where: {
        Id: roleId
      }
    });
  }

  updateRole(roleId, role) {
    return this.role.update(role, {
      where: {
        Id: roleId
      }
    });
  }
}
module.exports = RoleDAL;