'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comissioner = sequelize.define('Comissioner', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Comissioner.associate = function(models) {
    // associations can be defined here
      Comissioner.belongsTo(models.ArbitCase, { 
        foreignKey: { 
          allowNull: false 
        }, 
        onDelete: 'CASCADE' 
      });
  };
  return Comissioner;
};