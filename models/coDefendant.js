'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoDefendant = sequelize.define('CoDefendant', {
      fullName: DataTypes.STRING,
      contactPerson: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      policyNumber: DataTypes.STRING,
      noticeEmailSent: DataTypes.BOOLEAN
  }, {});
  CoDefendant.associate = function(models) {
    // associations can be defined here
   
    CoDefendant.belongsTo(models.Defendant, { 
      foreignKey: {
        allowNull: false 
      },
        onDelete: 'CASCADE' 
    }),
    CoDefendant.belongsTo(models.Company, { 
        foreignKey: {
          allowNull: false 
        },
          onDelete: 'CASCADE' 
      })
  };
  return CoDefendant;
};