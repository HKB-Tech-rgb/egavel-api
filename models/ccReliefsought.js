"use strict";
module.exports = (sequelize, DataTypes) => {
  const ccReliefSought = sequelize.define(
    "ccReliefSought",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  ccReliefSought.associate = function (models) {
    // associations can be defined here
    ccReliefSought.hasMany(models.ccReliefSoughtFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      ccReliefSought.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return ccReliefSought;
};
