"use strict";
module.exports = (sequelize, DataTypes) => {
  const DefLocusStandi = sequelize.define(
    "DefLocusStandi",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  DefLocusStandi.associate = function (models) {
    // associations can be defined here
    DefLocusStandi.hasMany(models.DefLocusStandiFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      DefLocusStandi.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return DefLocusStandi;
};
