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
      email: 'John@cloud.com',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      email: 'Doe@cloud.com',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      email: 'Santender@cloud.com',
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
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
