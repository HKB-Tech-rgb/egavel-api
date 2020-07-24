'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuditTrail = sequelize.define('AuditTrail', {
    tableName: DataTypes.STRING,
    action: DataTypes.STRING,
    dataBefore: DataTypes.STRING,
    dataAfter: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
  }, {});
  AuditTrail.associate = function(models) {
    AuditTrail.belongsTo(models.ArbitUser, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return AuditTrail;
};