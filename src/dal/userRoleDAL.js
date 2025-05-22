const UserDAL  =  require('./userDAL');
const RoleDAL  =  require('./roleDAL');
const { UserRole } = require('../models');

class UserRoleDAL {
    constructor(){
        this.userDAL = new UserDAL();
        this.roleDAL = new RoleDAL();
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

    async getRoleId(userId){
      return await UserRole.findOne({
        where: {
          UserId: userId
        }
      });
    }
}

module.exports = UserRoleDAL;