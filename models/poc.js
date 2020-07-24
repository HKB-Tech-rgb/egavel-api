'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poc = sequelize.define('Poc', {
    Description: DataTypes.STRING,
    }, {});
    Poc.associate = function(models) {
      Poc.hasMany(models.ArbitCase, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    }
  return Poc;
};