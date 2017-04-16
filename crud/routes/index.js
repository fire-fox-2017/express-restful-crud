var express = require('express');
var router = express.Router();
var db = require('../models');

// GET localhost:3000/
router.get('/', function(req, res, next) {
  db.Todo.findAll()
  .then(todos => {
    res.render('index', { title: 'Express Restful CRUD', todos: todos });
  })
  .catch(err => {
    console.log(err.message);
  })

  db.User.findAll()
  .then(users => {
    res.render('index', { title: 'Express Restful CRUD', users: users });
  })
  .catch(err => {
    console.log(err.message);
  })
});


// POST localhost:3000/add
router.post('/add', (req, res, next) => {
  // ambil data dari submit form dengan action /add
  let todoTitle = req.body.title; // tag input di dalam form /add dengan tag input dengan id = title dan name = title.


  //insert data dari form ke model todo
  db.Todo.create({
    'title': todoTitle,
    'isComplete': false
  })
  .then(todo => {
    //alihkan ke localhost:3000/
    res.redirect('/');
  })
  .catch(err => {
    console.log(err.message);
  })
});


module.exports = router;
