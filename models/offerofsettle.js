'use strict';
module.exports = (sequelize, DataTypes) => {
  const OfferOfSettle = sequelize.define('OfferOfSettle', {
    description: DataTypes.STRING,
    totalUploads: DataTypes.INTEGER 
  }, {});
  OfferOfSettle.associate = function(models) {
    // associations can be defined here
    OfferOfSettle.hasMany(models.OfferOfSettleFiles, { 
      foreignKey: { 
        allowNull: true 
      }, 
      onDelete: 'CASCADE' 
    }),
    OfferOfSettle.belongsTo(models.Defendant, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    }),
    OfferOfSettle.belongsTo(models.Claimant, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    })
  }  
  return OfferOfSettle;
};