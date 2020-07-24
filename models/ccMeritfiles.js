'use strict';
module.exports = (sequelize, DataTypes) => {
  const ccMeritFiles = sequelize.define('ccMeritFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ccMeritFiles.associate = function(models) {
    // associations can be defined here
    ccMeritFiles.belongsTo(models.ccMerit, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ccMeritFiles;
};