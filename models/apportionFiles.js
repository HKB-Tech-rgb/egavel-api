'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApportionFiles = sequelize.define('ApportionFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ApportionFiles.associate = function(models) {
    // associations can be defined here
    ApportionFiles.belongsTo(models.Apportionment, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ApportionFiles;
};