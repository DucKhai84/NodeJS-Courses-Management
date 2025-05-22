const sequelize = require('../config/db.js');
module.exports = (sequelize, DataTypes) => {
  const CT_User_BaiHoc = sequelize.define('CT_User_BaiHoc', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    KhoaHocId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    NgayBatDau: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    DaHoanThanh: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    tableName: 'CT_User_BaiHoc',
    timestamps: false
  });

  return CT_User_BaiHoc;
};
