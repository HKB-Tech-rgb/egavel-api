"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArbitCase = sequelize.define(
    "ArbitCase",
    {
      particularsOfClaim: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  ArbitCase.associate = function (models) {
    // associations can be defined here
    ArbitCase.hasMany(models.ArbitAlloc, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    }),
      ArbitCase.hasMany(models.Comissioner, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      ArbitCase.hasMany(models.Defendant, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      ArbitCase.hasMany(models.Resolution, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      ArbitCase.belongsTo(models.ArbitUser, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      ArbitCase.belongsTo(models.Claimant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      ArbitCase.belongsTo(models.Poc, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    ArbitCase.belongsTo(models.Status, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };
  return ArbitCase;
};
