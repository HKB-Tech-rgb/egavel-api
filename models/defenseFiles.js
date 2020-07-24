'use strict';
module.exports = (sequelize, DataTypes) => {
  const DefenseFiles = sequelize.define('DefenseFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  DefenseFiles.associate = function(models) {
    // associations can be defined here
    DefenseFiles.belongsTo(models.Defense, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return DefenseFiles;
};