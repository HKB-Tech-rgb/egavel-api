"use strict";
module.exports = (sequelize, DataTypes) => {
  const LocusStandi = sequelize.define(
    "LocusStandi",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  LocusStandi.associate = function (models) {
    // associations can be defined here
    LocusStandi.hasMany(models.LocusStandiFiles, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "CASCADE",
    }),
      LocusStandi.belongsTo(models.Claimant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return LocusStandi;
};
