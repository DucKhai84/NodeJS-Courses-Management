const sequelize = require('../config/db.js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    HoTen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DiaChi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    SDT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NgayTao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};
