'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        bookName: '101 lullaby',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookName: 'Far from homies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookName: 'Tips n Tricks on Springboot',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookName: 'Coming right behind you',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookName: '11 Stars',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookName: 'The Road of Springs',
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
    return queryInterface.bulkDelete('Books', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
