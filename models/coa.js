"use strict";
module.exports = (sequelize, DataTypes) => {
  const Coa = sequelize.define(
    "Coa",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  Coa.associate = function (models) {
    // associations can be defined here
    Coa.hasMany(models.CoaFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      Coa.belongsTo(models.Claimant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    Coa.belongsTo(models.Jurisdiction, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };
  return Coa;
};
