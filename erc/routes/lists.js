var express = require('express');
var router = express.Router();
var db=require('../models');




//munculin dropdown
router.get('/', function(req, res, next) {
  db.User.findAll()
  .then(users=>{
    res.render('listMemo', {
      title:'MeMo',
        users:users
    })
    .catch(err=>{
      console.log(err.message);
    })
  })
});

//add
router.get('/add', function(req, res, next) {
  db.User.findAll()
  .then(users=>{
    res.render('listAdd', {
      title:'MeMo',
        users:users
    })
  })
});
router.get('/delete/:id', function(req, res, next) {
  let idTodo = req.params.id;
  db.Todo.destroy({where:{id:idTodo}})
  .then(todos=>{
    res.redirect('/')
  })
});

router.post('/update', function(req, res, next) {

  let idTodo = req.body.todo;
  db.Todo.update({is_complete:true},{where:{id:idTodo}})
  .then(todos=>{
    res.redirect('/')
  })
});
router.post('/unupdate', function(req, res, next) {
  let idTodo = req.body.todo;
  db.Todo.update({is_complete:false},{where:{id:idTodo}})
  .then(todos=>{
    res.redirect('/')
  })
});

router.post('/updatememo', function(req, res, next) {
  let UpdateTask = req.body.todo;
  let idTodo = req.body.button;
  db.Todo.update({title:UpdateTask},{where:{id:idTodo}})
  .then(todos=>{
    res.redirect('/')
  })
});

module.exports = router;
