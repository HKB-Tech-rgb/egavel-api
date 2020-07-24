"use strict";
module.exports = (sequelize, DataTypes) => {
  const ccCoa = sequelize.define(
    "ccCoa",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  ccCoa.associate = function (models) {
    // associations can be defined here
    ccCoa.hasMany(models.ccCoaFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      ccCoa.belongsTo(models.Jurisdiction, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      ccCoa.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return ccCoa;
};
