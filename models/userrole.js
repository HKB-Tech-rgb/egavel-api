"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      RoleDescription: DataTypes.STRING,
    },
    {}
  );
  UserRole.associate = function (models) {
    UserRole.belongsToMany(models.ArbitUser, {
      through: "UserToUserRole",
    });
  };
  return UserRole;
};
