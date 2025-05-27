const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserDAL = require('../dal/userDAL');
const RoleDAL = require('../dal/roleDAL');
const UserRoleDAL = require('../dal/userRoleDAL');
const BaiHocDAL = require('../dal/baiHocDAL');
const KhoaHocDAL = require('../dal/khoaHocDAL');
require('dotenv').config();


const User = require('./user.model')(sequelize, DataTypes);
const Role = require('./role.model')(sequelize, DataTypes);
const KhoaHoc = require('./khoaHoc.model')(sequelize, DataTypes);
const CT_User_KhoaHoc = require('./CT_User_KhoaHoc.model')(sequelize, DataTypes);
const CT_User_BaiHoc = require('./CT_User_BaiHoc.model')(sequelize, DataTypes);
const RoleClaim = require('./roleClaim.model')(sequelize, DataTypes);
const BaiHoc = require('./baiHoc.model')(sequelize, DataTypes);
const UserRole = require('./userRole.model')(sequelize, DataTypes);

const roleDAL = new RoleDAL(Role);
const userDAL = new UserDAL(User);
const userRoleDAL = new UserRoleDAL(userDAL, roleDAL, UserRole);
const baiHocDAL = new BaiHocDAL(BaiHoc);
const khoaHocDAL = new KhoaHocDAL(KhoaHoc, User);


User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });
KhoaHoc.belongsToMany(User, { through: CT_User_KhoaHoc });
User.belongsToMany(KhoaHoc, { through: CT_User_KhoaHoc });
User.belongsToMany(BaiHoc, { through: CT_User_BaiHoc });
BaiHoc.belongsToMany(User, { through: CT_User_BaiHoc });


Role.hasMany(RoleClaim, {
  foreignKey: 'RoleId',
  as: 'claims'
});

RoleClaim.belongsTo(Role, {
  foreignKey: 'RoleId',
  as: 'role'
});

KhoaHoc.hasMany(BaiHoc, {
  foreignKey: 'KhoaHocId',
  as: 'baihoc'
});

BaiHoc.belongsTo(KhoaHoc, {
  foreignKey: 'KhoaHocId',
  as: 'khoahoc'
});

sequelize.sync({ force: false, logging: console.log }).then(async () => {
  try {
    const count = await Role.count();
    if (count === 0) {
      await Role.bulkCreate([
        { Role: 'Admin', Claim: 'admin' },
        { Role: 'User', Claim: 'user' }
      ]);
      console.log("Tạo roles thành công!");

      const adminRole = await Role.findOne({ where: { Role: 'Admin' } });
      const userRole = await Role.findOne({ where: { Role: 'User' } });

      await RoleClaim.bulkCreate([
        { RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.create' },
        { RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.view' },
        { RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.delete' },
        { RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.update' },
        { RoleId: userRole.id, ClaimType: 'permission', ClaimValue: 'user.view' }
      ]);

      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newUserData = {
        Username: process.env.ADMIN_USERNAME,
        Password: hashedPassword,
        HoTen: process.env.ADMIN_HOTEN,
        SDT: process.env.ADMIN_SDT
      };

      console.log("Dữ liệu admin sắp tạo:", newUserData);

      const adminAccount = await userDAL.createUser(newUserData);
      const defaultRole = await roleDAL.findByRoleName('Admin');

      if (!adminAccount) {
        throw new Error('Không thể tạo tài khoản admin!');
      }

      await userRoleDAL.createUserRole(adminAccount.id, defaultRole.id);

      console.log("Tạo tài khoản và gán role admin thành công!");
    }
  } catch (err) {
    console.error("❌ Lỗi khi khởi tạo dữ liệu mặc định:", err);
  }
});


module.exports = {
  sequelize,
  Sequelize,
  userDAL,
  roleDAL,
  khoaHocDAL,
  CT_User_KhoaHoc,
  CT_User_BaiHoc,
  RoleClaim,
  baiHocDAL,
  userRoleDAL
};
