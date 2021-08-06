'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        name: 'Joshua',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Joseph',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lisa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jean',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nolan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jimmy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
