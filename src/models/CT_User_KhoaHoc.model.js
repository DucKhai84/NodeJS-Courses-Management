const sequelize = require('../config/db.js');
module.exports = (sequelize, DataTypes) => {
  const CT_User_KhoaHoc = sequelize.define('CT_User_KhoaHoc', {
    BaiHocCuoiCung: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    tableName: 'CT_User_KhoaHoc',
    timestamps: false
  });

  return CT_User_KhoaHoc;
};
