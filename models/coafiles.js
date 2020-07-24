'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoaFiles = sequelize.define('CoaFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  CoaFiles.associate = function(models) {
    // associations can be defined here
    CoaFiles.belongsTo(models.Coa, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return CoaFiles;
};