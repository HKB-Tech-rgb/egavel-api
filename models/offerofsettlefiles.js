'use strict';
module.exports = (sequelize, DataTypes) => {
  const OfferOfSettleFiles = sequelize.define('OfferOfSettleFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  OfferOfSettleFiles.associate = function(models) {
    // associations can be defined here
    OfferOfSettleFiles.belongsTo(models.OfferOfSettle, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return OfferOfSettleFiles;
};