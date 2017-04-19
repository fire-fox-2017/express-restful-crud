'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
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
                email: 'ivanhabi2@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'fearzen3@yahoo.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'mavericks@roketmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'rondoy@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'yossyyos@ariel.com',
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ], {});
    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
