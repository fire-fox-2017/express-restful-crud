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
      title: 'Makan Siang',
      is_complete: false,
      UserId:2,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Futsal',
      is_complete: false,
      UserId:1,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Terbang Tinggi',
      is_complete: false,
      UserId:1,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Sepak Bola',
      is_complete: false,
      UserId:3,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Naik Mobil',
      is_complete: false,
      UserId:1,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Makan Malam',
      is_complete: false,
      UserId:2,
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
