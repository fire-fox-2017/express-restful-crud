'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: function(value, next) {
          User.find({where: {email: value}})
            .then((value) => {
              if(value) {
                return next(new Error("Email is already taken."));
              } else {
                return next();
              }
            });
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Todo, {foreignKey: "user_id"});
      }
    }
  });
  return User;
};
