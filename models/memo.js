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
      },
      listMemo: function(callback){
        sequelize.query('select "Memos".id, title, is_complete, "Users".email, "Memos"."createdAt" from "Memos" left join "Users" on "Memos".user_id = "Users".id', { type: sequelize.QueryTypes.SELECT})
        .then( (memos) => {
          // We don't need spread here, since only the results will be returned for select queries
          console.log(memos);
          console.log("-----")

          callback(memos);
        })
        .catch( err => {
          console.log(err.message);
        })

      }// end of listMemo
    }
  });
  return Memo;
};