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
      title: 'main bola',
      isComplete: false,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'main ps bareng',
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
      title: 'coding express dulu',
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
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
