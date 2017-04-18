'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Todo, {foreignKey: 'UserId'})
      }
    }
  });
  return User;
};
