"use strict";
module.exports = (sequelize, DataTypes) => {
  const Jurisdiction = sequelize.define(
    "Jurisdiction",
    {
      description: DataTypes.STRING,
      court_type: DataTypes.STRING,
    },
    {}
  );
  Jurisdiction.associate = function (models) {
    // associations can be defined here
    Jurisdiction.hasMany(models.Coa, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    }),
      Jurisdiction.hasMany(models.ccCoa, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      });
  };

  return Jurisdiction;
};
