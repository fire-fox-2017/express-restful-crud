var express = require('express');
var router = express.Router();
var db = require('../models');

// GET localhost:3000/
router.get('/', function(req, res, next) {
  db.Todo.findAll({
    include: [
      {model: db.User}
    ],
    order: '"id" DESC'
  })
  .then(todos => {
    // res.send(JSON.stringify(todos))
    // res.send(todos)
    res.render('index', { title: 'Express Restful CRUD', todos: todos })
  })
  .catch(error => {
    console.log(error.message);
  })

  // db.User.findAll()
  // .then(users => {
  //   res.render('index', { title: 'Express Restful CRUD', users: users });
  // })
  // .catch(err => {
  //   console.log(err.message);
  // })
});

router.post('/add:userId', function(req, res, next) {
  
});


// POST localhost/3000/add di form action /add
router.post('/add', function(req, res, next) {
  let userEmail = req.body.userEmail;

  db.User.create({
    'email': userEmail
  })
  .then(user => {
    res.redirect('/add')
  })
});

// POST localhost:3000 di form action /add
// router.post('/add', (req, res, next) => {
//   // ambil data dari submit form dengan action /add
//   let todoTitle = req.body.title; // tag input di dalam form /add dengan tag input dengan id = title dan name = title.


//   //insert data dari form ke model todo
//   db.Todo.create({
//     'title': todoTitle,
//     'isComplete': false
//   })
//   .then(todo => {
//     //alihkan ke localhost:3000/
//     res.redirect('/');
//   })
//   .catch(err => {
//     console.log(err.message);
//   })
// });


module.exports = router;
