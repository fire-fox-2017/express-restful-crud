var express = require('express');
var router = express.Router();
var db = require('../models');
const help = require('../helper/helper.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Todo.findAll({include : {model:db.User}, order : 'id DESC'})
    .then(function (_todos){
      let helper = _todos.map((todo)=>{
        todo.help = help(todo.createdAt);
        return todo
      })
      res.render('index', { todos: helper});
    })
    .catch(function (err){
      res.send(err.message);
    })
});

module.exports = router;
