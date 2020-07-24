'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserToUserRole = sequelize.define('UserToUserRole', {
    status: DataTypes.INTEGER
  }, {});
  UserToUserRole.associate = function(models){
    UserToUserRole.belongsTo(models.ArbitUser, { 
        foreignKey: { 
            allowNull: false 
        }, 
        onDelete: 'CASCADE' 
    }),
    UserToUserRole.belongsTo(models.UserRole, { 
        foreignKey: { 
            allowNull: false 
        }, 
        onDelete: 'CASCADE' 
    }),
    UserToUserRole.belongsTo(models.Status, { 
        foreignKey: { 
            allowNull: false 
        }, 
        onDelete: 'CASCADE' 
    })
  }
  return UserToUserRole;
};
