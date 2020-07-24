module.exports = {
    up: (queryInterface, Sequelize) => {
      // job belongs To Company
      return queryInterface.addColumn(
        'job', // name of Source model
        'CompanyId', // name of the key we're adding 
        {
          type: Sequelize.Integer,
          references: {
            model: 'Company', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    },
  
    down: (queryInterface, Sequelize) => {
      // remove Order belongsTo Customer
      return queryInterface.removeColumn(
        'Orders', // name of Source model
        'CustomerId' // key we want to remove
      )}
  };