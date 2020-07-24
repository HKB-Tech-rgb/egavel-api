'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocusStandiFiles = sequelize.define('LocusStandiFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  LocusStandiFiles.associate = function(models) {
    // associations can be defined here
    LocusStandiFiles.belongsTo(models.LocusStandi, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return LocusStandiFiles;
};