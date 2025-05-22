const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user.model')(sequelize, DataTypes);
const Role = require('./role.model')(sequelize, DataTypes);
const KhoaHoc = require('./khoaHoc.model')(sequelize, DataTypes);
const CT_User_KhoaHoc = require('./CT_User_KhoaHoc.model')(sequelize, DataTypes);
const CT_User_BaiHoc = require('./CT_User_BaiHoc.model')(sequelize, DataTypes);
const RoleClaim = require('./roleClaim.model')(sequelize, DataTypes);
const BaiHoc = require('./baiHoc.model')(sequelize, DataTypes);
const UserRole = require('./userRole.model')(sequelize, DataTypes);



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
  const count = await Role.count();
  if (count === 0) {
    await Role.bulkCreate([
      { Role: 'Admin', Claim: 'admin' },
      { Role: 'User', Claim: 'user' }
    ]);
    console.log("Tạo thành công!!");

    const adminRole = await Role.findOne({ where: { Role: 'Admin' } });
    const userRole = await Role.findOne({ where: { Role: 'User' } });

    await RoleClaim.bulkCreate([
      {RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.create'},
      {RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.view'},
      {RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.delete'},
      {RoleId: adminRole.id, ClaimType: 'permission', ClaimValue: 'user.update'},
      {RoleId: userRole.id, ClaimType: 'permission', ClaimValue: 'user.view'}
    ]);
    console.log("Tạo role claim thành công!!");
  }
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Role,
  KhoaHoc,
  CT_User_KhoaHoc, 
  CT_User_BaiHoc,
  RoleClaim,
  BaiHoc,
  UserRole
};
