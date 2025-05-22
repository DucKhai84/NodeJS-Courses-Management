module.exports = (sequelize, DataTypes) => {
  const RoleClaim = sequelize.define('RoleClaim', {
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ClaimType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ClaimValue: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'roleclaims',
    timestamps: false
  });

  return RoleClaim;
};
