'use strict';
module.exports = (sequelize, DataTypes) => {
  const ccQuantumFiles = sequelize.define('ccQuantumFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  ccQuantumFiles.associate = function(models) {
    // associations can be defined here
    ccQuantumFiles.belongsTo(models.ccQuantum, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return ccQuantumFiles;
};