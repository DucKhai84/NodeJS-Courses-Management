const sequelize = require('../config/db.js');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Claim: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'roles',
    timestamps: false
  });

  return Role;
};
