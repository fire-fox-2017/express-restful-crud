'use strict';
module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        title: DataTypes.STRING,
        isComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            reference: {
                model: 'User',
                key: 'id'
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Todo.belongsTo(models.User, {
                    foreignKey: 'userId'
                })
            }
        }
    });
    return Todo;
};