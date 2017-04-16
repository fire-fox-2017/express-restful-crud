'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    isComplete: {
      type: DataTypes.BOOLEAN, 
      defaultValues: function() {
        return false;
      },
    }, 
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Todo.belongsTo(models.User, {foreignKey: 'userId'});
      }
    }
  });
  return Todo;
};