'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.TEXT,
    isComplete: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Todo.belongsTo(models.User,{foreignkey: 'UserId'})
      }
    }
  });
  return Todo;
};
