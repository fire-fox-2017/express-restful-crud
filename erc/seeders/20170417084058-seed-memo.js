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
        return queryInterface.bulkInsert('Todos', [{
                title: 'makan',
                is_complete: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 1
            },
            {
                title: 'tidur',
                is_complete: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 2
            },
            {
                title: 'kentut',
                is_complete: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 3
            },
            {
                title: 'gosok gigi',
                is_complete: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 4
            },
            {
                title: 'mandi',
                is_complete: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: 5
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
