'use strict';
module.exports = (sequelize, DataTypes) => {
  const ccCoaFiles = sequelize.define('ccCoaFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ccCoaFiles.associate = function(models) {
    // associations can be defined here
    ccCoaFiles.belongsTo(models.ccCoa, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ccCoaFiles;
};