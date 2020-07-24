"use strict";
module.exports = (sequelize, DataTypes) => {
  const Defense = sequelize.define(
    "Defense",
    {
      description: DataTypes.STRING,
      totalUploads: DataTypes.INTEGER,
    },
    {}
  );
  Defense.associate = function (models) {
    // associations can be defined here
    Defense.hasMany(models.DefenseFiles, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    }),
      Defense.belongsTo(models.Defendant, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
  };
  return Defense;
};
