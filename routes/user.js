var express = require('express');
var router = express.Router();
const User = require("../models").User;
const Todo = require("../models").Todo;
const TimeConvert = require("../helpers/helper.js").timeConvert;

router.post('/', function(req, res) {
  let userId = req.body.userId;
  User.find({where: {id: userId}}).then((user) => {
    Todo.findAll({where: {user_id: userId}})
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
        res.render('user', {todos: newTodos, user: user});
      }).catch((err) => {
        res.send(err);
    });
  }).catch((err) => {
    res.send(err);
  });
});


router.post('/addTodo', function(req, res) {
  let userId = req.body.id;
  let task = req.body.task;
  if (task.length > 0) {
    Todo.create({title: task, user_id: userId})
      .then((task) => {
        User.find({where: {id: userId}}).then((user) => {
          Todo.findAll({where: {user_id: userId}}).then((todos) => {
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
            res.render('user', {todos: newTodos, user: user});
          }).catch((err) => {
            res.send(err);
          });
        }).catch((err) => {
          res.send(err);
        });
      }).catch((err) => {
        res.send(err);
      });
  } else {
    res.redirect(req.get('referer'));
  }
});

router.post('/updateTask', function(req, res) {
  let taskId = req.body.taskId;
  let taskMemo = req.body.taskMemo;
  let taskCheck = req.body.checkbox;
  Todo.findById(taskId).then((task) => {
    let mark = task.is_complete;
    if(taskCheck) {
      if (task.is_complete === false) {
        mark = true;
      } else {
        mark = false;
      }
    }
    if (taskMemo.length === 0) {
      taskMemo = task.title;
    }
    Todo.update({is_complete:mark, title: taskMemo},{where: {id: taskId}})
      .then((updated) => {
        let userId = req.body.userId;
        User.find({where: {id: userId}}).then((user) => {
          Todo.findAll({where: {user_id: user.id}})
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
            res.render('user', {todos: newTodos, user: user});
          }).catch((err) => {
            res.send(err);
          });
        }).catch((err) => {
          res.send(err);
        });
      }).catch((err) => {
        res.send(err);
      });
  }).catch((err) => {
    res.send(err);
  });
});

router.post('/deleteTask', function(req, res) {
  let taskId = req.body.taskId;
  let userId = req.body.userId;
  Todo.destroy({where: {id: taskId, user_id: userId}})
    .then((destroyed) => {
      User.find({where: {id: userId}}).then((user) => {
        Todo.findAll({where: {user_id: user.id}}).then((todos) => {
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
          res.render('user', {todos: newTodos, user: user});
        }).catch((err) => {
          res.send(err);
        });
      }).catch((err) => {
        res.send(err);
      });
    }).catch((err) => {
      res.send(err);
    });
});

module.exports = router;
