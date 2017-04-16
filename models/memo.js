'use strict';
module.exports = function(sequelize, DataTypes) {
  var Memo = sequelize.define('Memo', {
    title: DataTypes.STRING,
    is_complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Memo.belongsTo(models.User, { foreignKey: 'user_id'});
      }
    }
  });
  return Memo;
};