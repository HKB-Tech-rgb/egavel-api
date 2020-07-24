"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArbitAlloc = sequelize.define(
    "ArbitAlloc",
    {
      comments: DataTypes.STRING,
    },
    {}
  );
  ArbitAlloc.associate = function (models) {
    ArbitAlloc.belongsTo(models.ArbitUser, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      ArbitAlloc.belongsTo(models.ArbitCase, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
      ArbitAlloc.belongsTo(models.Status, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return ArbitAlloc;
};
