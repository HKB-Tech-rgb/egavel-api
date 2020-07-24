"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArbitUser = sequelize.define(
    "ArbitUser",
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      pword: DataTypes.STRING,
      cellnumber: DataTypes.STRING,
      initialLogin: DataTypes.INTEGER,
      signFilename: DataTypes.STRING,
      signDiskname: DataTypes.STRING,
    },
    {}
  );
  ArbitUser.associate = function (models) {
    ArbitUser.hasMany(models.AuditTrail, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    }),
      ArbitUser.hasMany(models.ArbitAlloc, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      ArbitUser.hasMany(models.ArbitCase, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      ArbitUser.hasMany(models.Defendant, { foreignKey: { allowNull: true } }),
      ArbitUser.belongsTo(models.Company, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    ArbitUser.belongsToMany(models.UserRole, {
      through: "UserToUserRole",
    });
  };
  return ArbitUser;
};
