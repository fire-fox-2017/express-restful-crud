'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Todos', [{
      title: 'nonton tv',
      isComplete: false,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'main bola',
      isComplete: false,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'tidur siang',
      isComplete: false,
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'jangan lupa mandi',
      isComplete: false,
      UserId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
