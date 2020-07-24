'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReliefSoughtFiles = sequelize.define('ReliefSoughtFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ReliefSoughtFiles.associate = function(models) {
    // associations can be defined here
    ReliefSoughtFiles.belongsTo(models.ReliefSought, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ReliefSoughtFiles;
};