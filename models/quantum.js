"use strict";
module.exports = (sequelize, DataTypes) => {
  const Quantum = sequelize.define(
    "Quantum",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  Quantum.associate = function (models) {
    // associations can be defined here
    Quantum.hasMany(models.QuantumFiles, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "CASCADE",
    }),
      Quantum.belongsTo(models.Claimant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return Quantum;
};
