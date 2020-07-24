'use strict';
module.exports = (sequelize, DataTypes) => {
  const ccReliefSoughtFiles = sequelize.define('ccReliefSoughtFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ccReliefSoughtFiles.associate = function(models) {
    // associations can be defined here
    ccReliefSoughtFiles.belongsTo(models.ccReliefSought, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ccReliefSoughtFiles;
};