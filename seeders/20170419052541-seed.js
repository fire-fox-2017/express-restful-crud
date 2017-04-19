'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    let data = [{
      name: 'John Doe',
      email:'john.doe@gmail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'Parel Hutahaean',
      email:'parel.hutahaean@gmail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'Eltina Hutahaean',
      email:'eltinahut@gmail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'Stedy Yulius',
      email:'stedybangke@yahoo.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'Edim Dendi',
      email:'edimcute@yahoo.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'Eci Lubis',
      email:'eci@gmail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },{
      name: 'James Sraun',
      email:'james@yahoo.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
    return queryInterface.bulkInsert('Users', data, {});

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
