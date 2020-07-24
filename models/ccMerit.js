"use strict";
module.exports = (sequelize, DataTypes) => {
  const ccMerit = sequelize.define(
    "ccMerit",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  ccMerit.associate = function (models) {
    // associations can be defined here
    ccMerit.hasMany(models.ccMeritFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      ccMerit.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return ccMerit;
};
