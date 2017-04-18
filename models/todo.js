'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    is_complete: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Todo.belongsTo(models.User, {
          foreignKey: "UserId"
        })
      }
    }
  });
  return Todo;
};
