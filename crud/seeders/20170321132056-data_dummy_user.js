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
    return queryInterface.bulkInsert('Users', [{
      email: 'main@lagi.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'olahraga@sehat.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'susah@juga.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'agen@rahasia.com',
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
