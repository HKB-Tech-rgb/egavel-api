"use strict";
module.exports = (sequelize, DataTypes) => {
  const DefLocusStandiFiles = sequelize.define(
    "DefLocusStandiFiles",
    {
      filename: DataTypes.STRING,
      diskname: DataTypes.STRING,
    },
    {}
  );
  DefLocusStandiFiles.associate = function (models) {
    // associations can be defined here
    DefLocusStandiFiles.belongsTo(models.DefLocusStandi, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };
  return DefLocusStandiFiles;
};
