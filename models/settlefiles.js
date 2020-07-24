'use strict';
module.exports = (sequelize, DataTypes) => {
  const SettleFiles = sequelize.define('SettleFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  SettleFiles.associate = function(models) {
    // associations can be defined here
    SettleFiles.belongsTo(models.Settle, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return SettleFiles;
};