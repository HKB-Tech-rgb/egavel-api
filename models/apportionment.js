'use strict';
module.exports = (sequelize, DataTypes) => {
  const Apportionment = sequelize.define('Apportionment', {
    description: DataTypes.STRING,
    totalUploads: DataTypes.INTEGER 
  }, {});
  Apportionment.associate = function(models) {
    // associations can be defined here
    Apportionment.hasMany(models.ApportionFiles, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    }),
    Apportionment.belongsTo(models.Defendant, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    }),
    Apportionment.belongsTo(models.Claimant, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return Apportionment;
};