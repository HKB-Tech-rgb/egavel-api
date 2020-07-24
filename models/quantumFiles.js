'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuantumFiles = sequelize.define('QuantumFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  QuantumFiles.associate = function(models) {
    // associations can be defined here
    QuantumFiles.belongsTo(models.Quantum, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return QuantumFiles;
};