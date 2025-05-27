class UserRoleDAL {
  constructor(userDAL, roleDAL, userRoleDAL) {
    this.userDAL = userDAL;
    this.roleDAL = roleDAL;
    this.userRoleDAL = userRoleDAL;
  }
  async createUserRole(userId, roleId) {
    try {

      const user = await this.userDAL.getUserId(userId);
      const role = await this.roleDAL.getRoleId(roleId);

      if (!role || !user) {
        console.log("Không tìm thấy user hoặc role.");
        return;
      }

      user.addRole(role);

      console.log("Đã thêm role cho user!");
    } catch (error) {
      console.error("Lỗi khi gán role:", error);
    }
  }

  async getRoleId(userId) {
    return await this.userRoleDAL.findOne({
      where: {
        UserId: userId
      }
    });
  }
}

module.exports = UserRoleDAL;