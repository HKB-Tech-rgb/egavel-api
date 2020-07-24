'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResolutionFiles = sequelize.define('ResolutionFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ResolutionFiles.associate = function(models) {
    // associations can be defined here
    ResolutionFiles.belongsTo(models.Resolution, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ResolutionFiles;
};