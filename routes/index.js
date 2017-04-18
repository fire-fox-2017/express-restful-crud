var express = require('express');
var router = express.Router();
const User = require("../models").User;
const Todo = require("../models").Todo;
const TimeConvert = require("../helpers/helper.js").timeConvert;
const Hallo = require("../helpers/helper.js").hallo;

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll().then((users) => {
    res.render('index', { title: 'JS Todo', users: users });
  }).catch((err) => {
    res.send(err);
  });
  // res.render('index', { title: 'JS Todo' });
});

/* create new user */
router.post('/', function(req, res) {
  let newEmail = req.body.email;
  if (newEmail) {
    User.create({
      email: req.body.email
    }).then((user) => {
      res.redirect("/");
    }).catch((err) => {
      res.send(err);
    });
  } else {
    res.redirect("/");
  }
});

// delete user
router.post('/deleteUser', function(req, res) {
  let userId = req.body.userId;
  console.log(userId)
  if(userId) {
    User.destroy({where: {id: userId}})
      .then((destroyed) => {
        res.redirect("/");
      }).catch((err) => {
        res.send(err);
      });
  } else {
    res.redirect("/");
  }
});

// show all todos
router.get('/todos', function(req, res) {
  Todo.findAll({include: [{model: User}]})
    .then((todos) => {
      let newTodos = []
      todos.forEach((todo) => {
        let reformatTodo = {
          id: todo.id,
          title: todo.title,
          is_complete: todo.is_complete,
          user_id: todo.user_id,
          createdAt: TimeConvert(todo.createdAt),
          updatedAt: TimeConvert(todo.updatedAt),
          User: todo.User
        };
        newTodos.push(reformatTodo);
      });
      res.render('todos',{todos: newTodos});
    }).catch((err) => {
      res.send('wahoo');
    });
});



module.exports = router;
