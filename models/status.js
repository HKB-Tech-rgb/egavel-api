"use strict";
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "Status",
    {
      StatusDescription: DataTypes.STRING,
    },
    {}
  );
  Status.associate = function (models) {
    Status.hasMany(models.Claimant, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    }),
      Status.hasMany(models.Defendant, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Status.hasMany(models.ArbitCase, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Status.hasMany(models.UserToUserRole, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Status.hasMany(models.ArbitAlloc, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      });
  };
  return Status;
};
