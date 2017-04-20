'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todolist = sequelize.define('Todolist', {
    task: DataTypes.STRING,
    iscompleted: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Todolist.belongsTo(models.User,{foreignKey: "user_id"})
      }
    }
  });
  return Todolist;
};
