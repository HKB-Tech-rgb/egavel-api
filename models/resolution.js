"use strict";
module.exports = (sequelize, DataTypes) => {
  const Resolution = sequelize.define(
    "Resolution",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  Resolution.associate = function (models) {
    // associations can be defined here
    Resolution.hasMany(models.ResolutionFiles, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "CASCADE",
    }),
      Resolution.belongsTo(models.ArbitCase, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return Resolution;
};
