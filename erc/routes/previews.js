var express = require('express');
var router = express.Router();
var db=require('../models');
var helper = require('../helpers/util');
/* GET users listing. */




router.post('/', function(req, res, next) {
  let id = req.body.email;
  db.Todo.findAll({where : {UserId:id}})
  .then(todos=>{
    helper.changeFormat(todos,function(source){
      res.render('listPriview',{
        title:'MeMo',
        todos:source
      })
    })
  })
});

module.exports = router;
