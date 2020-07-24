'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all( [
      queryInterface.removeConstraint('Claimants', 'Claimants_ArbitUserId_fkey'),
      queryInterface.removeConstraint('Claimants', 'Claimants_CompanyId_fkey')
    ] )
    /*
    removeConstraint
      Areturn dd altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
