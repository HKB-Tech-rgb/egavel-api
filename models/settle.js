"use strict";
module.exports = (sequelize, DataTypes) => {
  const Settle = sequelize.define(
    "Settle",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  Settle.associate = function (models) {
    // associations can be defined here
    Settle.hasMany(models.SettleFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      Settle.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return Settle;
};
