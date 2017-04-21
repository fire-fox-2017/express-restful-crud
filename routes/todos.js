var express = require('express');
var router = express.Router();
var db = require('../models');
var helper = require('../helper/date_format');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.Todo.findAll({
    include: [
      db.User
    ],
    order: 'id DESC'
  })
  .then(data => {
    res.render('todos/todo', { todos:data, helper:helper });
  })
  .catch(err => {
    res.send(err);
  })
});

router.get('/add', function(req, res, next) {
  db.User.findAll({
    order : 'email asc'
  })
  .then(data => {
    res.render('todos/add', {users:data});
    //res.send(data);
  })
  .catch(err => {
    res.send(err);
  })
});

router.post('/create', function(req, res, next) {
  db.Todo.create({
    task: req.body.task,
    completed: req.body.completed || false,
    user_id: req.body.user_id
  })
  .then(data => {
    res.redirect('/todos')
    //res.send(data)
  })
  .catch(err => {
    res.send(err);
  })
})

router.get('/delete/:id', function(req, res, next) {
  db.Todo.destroy({
    where : {
      id : req.params.id
    }
  })
  .then(data => {
    res.redirect('/todos');
    //res.send(data);
  })
  .catch(err => {
    res.send(err);
  })
});

router.get('/edit/:id', function(req, res, next) {
  db.Todo.find({
    where : {
      id : req.params.id
    },
    include : [db.User]
  })
  .then(data => {
    db.User.findAll()
    .then(user => {
      res.render('todos/edit', {todo: data, users: user});
    })
    .catch(err => {
      res.send(err);
    })
  })
  .catch(err => {
    res.send(err);
  })
});

router.post('/update/:id', function(req, res, next) {
  db.Todo.update({
      task: req.body.task,
      completed: req.body.completed || false,
      user_id: req.body.user_id
    },{
    where : {
      id : req.params.id
    }
  })
  .then(data => {
    res.redirect('/todos');
  })
  .catch(err => {
    res.send(err);
  })
})

module.exports = router;
