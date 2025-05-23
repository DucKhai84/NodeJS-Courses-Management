const sequelize = require('../config/db.js');
module.exports = (sequelize, DataTypes) => {
  const BaiHoc = sequelize.define('BaiHoc', {
    KhoaHocId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LoaiBaiHoc: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ThuTu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TenBaiHoc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NoiDung: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Video: {
        type: DataTypes.STRING,
        allowNull: true
    },
    HinhAnh: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'baiHocs',
    timestamps: false
  });

  return BaiHoc;
};
