"use strict";
module.exports = (sequelize, DataTypes) => {
  const ReliefSought = sequelize.define(
    "ReliefSought",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  ReliefSought.associate = function (models) {
    // associations can be defined here
    ReliefSought.hasMany(models.ReliefSoughtFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      ReliefSought.belongsTo(models.Claimant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return ReliefSought;
};
