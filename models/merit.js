"use strict";
module.exports = (sequelize, DataTypes) => {
  const Merit = sequelize.define(
    "Merit",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  Merit.associate = function (models) {
    // associations can be defined here
    Merit.hasMany(models.MeritFiles, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "CASCADE",
    }),
      Merit.belongsTo(models.Claimant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return Merit;
};
