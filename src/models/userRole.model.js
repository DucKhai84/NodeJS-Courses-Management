const sequelize = require('../config/db.js');
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
    UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true
        },
    RoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true
        }
    }, {
      tableName: 'userRoles',
      timestamps: false
    });
  
    return UserRole;
  };
  