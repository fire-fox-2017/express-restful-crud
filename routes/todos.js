var express = require('express');
var router = express.Router();
var db = require('../models');
var helper = require('../helper/convert');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  var idUser = req.body.email;
  db.Todo.findAll({
    where : {
      'UserId':idUser
    }, include: [db.User]
  })
  .then(datas => {
    res.render('todos', { datas: datas, helper:helper });
  })
  .catch(err => {
    console.log(err);
  })
})

// render ke halaman daftar to do
router.get('/:id', (req, res, next) => {
  var UserId = req.params.id;
  db.Todo.findAll({
    where : {
      'UserId':UserId
    }, include: [db.User]
  })
  .then(datas => {
    res.render('todos', { datas: datas, helper:helper});
  })
  .catch(err => {
    console.log(err);
  })
})

// render ke halaman formulir tambahto do
router.get('/add/:id', function(req, res, next) {
  var UserId = req.params.id;
  res.render('todos/add', {UserId : UserId});
});

// method buat simpan data todo
router.post('/addTodo', (req, res, next) => {
  var todo = req.body.todo;
  var checkbox = req.body.checkbox;
  var UserId = req.body.UserId;

  if(checkbox == 't'){
    var complete = true;
  } else {
    var complete = false;
  }

  db.Todo.create({
    "todo" : todo,
    "complete" : complete,
    "UserId" : UserId,
    "createdAt" : new Date(),
    "updatedAt" : new Date()
  })
  .then(todo => {
    res.redirect('/todos/'+UserId);
  })
  .catch(err => {
    console.log(err);
  })

});

// render ke halaman formulir edit todo
router.get('/edit/:id', function(req, res, next) {
  var TodoId = req.params.id;
  db.Todo.findById(TodoId)
  .then(datas => {
    res.render('todos/edit', {datas : datas});
  })
});

// menerima input dari formulie edit todo
router.post('/editTodo', (req,res,next) => {
  var UserId = req.body.UserId;
  var id = req.body.id;
  var todo = req.body.todo;
  var checkbox = req.body.checkbox;

  if(checkbox == 't'){
    var complete = true;
  } else {
    var complete = false;
  }

  db.Todo.update({
    todo: todo,
    complete: complete
  }, {
    where: {
      id: id
    }
  })
  .then(todo => {
    res.redirect('/todos/'+UserId);
  })
  .catch(err => {
    console.log(err);
  })

})

router.get('/delete/:id', function(req, res, next) {
  var TodoId = req.params.id;
  db.Todo.findById(TodoId)
  .then(function(todo){
    if(todo){
      let data = todo.UserId;
      db.Todo.destroy({
        where: {
          id : TodoId
        }
      })
      .then(data => {
        res.redirect('/todos/'+data);
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
});


module.exports = router;
