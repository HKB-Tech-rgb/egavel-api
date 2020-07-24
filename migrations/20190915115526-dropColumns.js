'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all( [
      queryInterface.removeColumn('Claimants', 'ArbitUserId'),
      queryInterface.removeColumn('Claimants', 'CompanyId')
    ] )
    
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Claimants', 'ArbitUserId'),
      queryInterface.addColumn('Claimants', 'CompanyId')
  }
};
