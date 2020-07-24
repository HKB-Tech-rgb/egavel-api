"use strict";
module.exports = (sequelize, DataTypes) => {
  const Claimant = sequelize.define(
    "Claimant",
    {
      fullName: DataTypes.STRING,
      contactPerson: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      policyNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      timeLapsed: DataTypes.INTEGER,
    },
    {}
  );
  Claimant.associate = function (models) {
    // associations can be defined here
    Claimant.hasMany(models.LocusStandi, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    }),
      Claimant.hasMany(models.Coa, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Claimant.hasMany(models.ReliefSought, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Claimant.hasMany(models.Merit, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Claimant.hasMany(models.Quantum, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Claimant.hasOne(models.ArbitCase, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Claimant.belongsTo(models.Status, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      Claimant.belongsTo(models.Company, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return Claimant;
};
