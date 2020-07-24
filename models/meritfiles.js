'use strict';
module.exports = (sequelize, DataTypes) => {
  const MeritFiles = sequelize.define('MeritFiles', {
    filename: DataTypes.STRING,
    diskname: DataTypes.STRING
  }, {});
  MeritFiles.associate = function(models) {
    // associations can be defined here
    MeritFiles.belongsTo(models.Merit, { 
      foreignKey: { 
        allowNull: false 
      }, 
      onDelete: 'CASCADE' 
    });
  };
  return MeritFiles;
};