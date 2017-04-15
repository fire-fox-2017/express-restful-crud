var express = require('express');
var router = express.Router();
let models = require('../models')
let helper = require('../helper/format_date')

/* GET todos listing. */
router.get('/', function(req, res, next) {
  models.Todo.findAll({
    include: [
      models.User
    ], order: '"id" DESC'
  }).then(todos => {
    console.log(JSON.stringify(todos))
    //res.send(JSON.stringify(todos))
  res.render('todos/index', {result: todos, helper:helper})
});
});

router.post('/create', function(req, res) {
  models.Todo.create({
    task: req.body.task,
    completed: req.body.completed || false,
    user_id: req.body.user_id
  }).then(function(todos) {
    res.redirect("/todos")
  });
});

router.get('/add', function(req, res, next) {
  models.User.findAll().then((users)=>{
    res.render('todos/add', { users : users});
  })

});

router.get('/edit/:id', function(req, res, next) {
  models.Todo.find({
    include: [ models.User ],
    where: {
      id: req.params.id
    }
  }).then(function(todo){
    models.User.findAll().then((users) => {
      res.render('todos/edit', {todos: todo, users: users})
    })
})
});

router.post('/update/:id', function(req, res, next) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todos) {
    if(todos){
      todos.updateAttributes({
        task: req.body.task,
        completed: req.body.completed,
        user_id: req.body.user_id
      }).then(function(todos) {
        res.redirect("/todos");
      });
    }
  });
});

router.get('/delete/:id', function(req, res, next) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(todos) {
    res.redirect("/todos")
  });
});
module.exports = router;
