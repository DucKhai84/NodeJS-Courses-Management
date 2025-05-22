const sequelize = require('../config/db.js');
module.exports = (sequelize, DataTypes) => {
  const KhoaHoc = sequelize.define('KhoaHoc', {
    TenKhoaHoc: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    LoaiKhoaHoc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MoTa: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Gia: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    HinhAnh: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DSHinh: {
      type: DataTypes.STRING,
      allowNull: true
    },
    NgonNgu: {
        type: DataTypes.STRING,
        allowNull: true
    },
    NgayTao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'KhoaHoc',
    timestamps: false
  });

  return KhoaHoc;
};
