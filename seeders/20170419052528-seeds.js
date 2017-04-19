'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    let data = [{
      name : 'stedy',
      email: 'stedy@gmail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'parel',
      email: 'parel@gmail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]


      return queryInterface.bulkInsert('Users',data,{});

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
