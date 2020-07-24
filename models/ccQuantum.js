"use strict";
module.exports = (sequelize, DataTypes) => {
  const ccQuantum = sequelize.define(
    "ccQuantum",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  ccQuantum.associate = function (models) {
    // associations can be defined here
    ccQuantum.hasMany(models.ccQuantumFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      ccQuantum.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return ccQuantum;
};
