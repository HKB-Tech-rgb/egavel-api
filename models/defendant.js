"use strict";
module.exports = (sequelize, DataTypes) => {
  const Defendant = sequelize.define(
    "Defendant",
    {
      fullName: DataTypes.STRING,
      contactPerson: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      policyNumber: DataTypes.STRING,
      noticeEmailSent: DataTypes.BOOLEAN,
      timeLapsed: DataTypes.INTEGER,
    },
    {}
  );
  Defendant.associate = function (models) {
    // associations can be defined here
    Defendant.hasMany(models.Settle, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    }),
      Defendant.hasMany(models.DefLocusStandi, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.hasMany(models.Defense, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.hasMany(models.CoDefendant, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.hasMany(models.ccQuantum, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.hasMany(models.ccCoa, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.hasMany(models.ccMerit, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.hasMany(models.ccReliefSought, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      }),
      Defendant.belongsTo(models.Status, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      Defendant.belongsTo(models.Company, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      Defendant.belongsTo(models.ArbitUser, {
        foreignKey: {
          allowNull: true,
        },
      }),
      Defendant.belongsTo(models.ArbitCase, {
        foreignKey: {
          allowNull: false,
        },
      });
  };

  return Defendant;
};
