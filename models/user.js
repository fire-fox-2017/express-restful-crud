'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Todo, {foreignKey: 'user_id'})
      }
    }
  });
  return User;
};
