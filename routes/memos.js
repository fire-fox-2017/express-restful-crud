var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findAll()
  .then(function (_users){
    res.render('add_memo', { users: _users});
  })
});

// router.get('/:id/:value/update_values', function(req, res, next) {
//   res.send(req.params.value);
//   // if(req.params.value == FALSE){
//   //   let value = TRUE;
//   // }
//   // else{
//   //   let value = FALSE;
//   // }
//   // db.Todo.update({is_complete:value}, { where : { id : req.params.id }})
//   // .then(function (){
//   //   res.redirect('/');
//   // })
// });

router.get('/edit/:id', function(req, res, next) {
let param = req.params.id;
db.Todo.findById(param,{include: {model:db.User}})
  .then((todo)=>{
    db.User.findAll()
      .then((_users)=>{
        res.render('edit_memo', {tasks: todo, users: _users})

      })
  })
});

// router.get('/edit/:id', function (req, res, next) {
//   res.render('')
// })

router.get('/delete/:id', function (req, res, next) {
  let param = req.params.id;
  db.Todo.destroy({where:{id: param}})
    .then(()=>{
      res.redirect('/')
    })
})



//post
router.post('/add', function(req, res, next) {
  if(req.body.complete){
    value = true
  } else {
    value = false
  }

  let memo = {
    title : req.body.memo,
    is_complete: value,
    UserId : req.body.userId
  }

    db.Todo
    .create(memo)
    .then(function(){
      res.redirect('/');
    })
})

router.post('/update/:id', function(req, res, next) {
  if(req.body.complete){
    value = true
  } else {
    value = false
  }

  db.Todo
    .update(
      {
        title: req.body.memo,
        is_complete: value,
        UserId: req.body.userId
      }, {where: {id: req.params.id}})
    .then(()=>{
      res.redirect('/')
    })
    .catch((err)=>{
      res.send(err.message)
    })
  // db.Todo.update( {title: req.body.todo_title}, { where : { id : req.params.id }})
  // .then(function(){
  //   db.User.update( {email:req.body.user_email}, { where : { id : req.params.idUser}})
  //   .then(function(){
  //     res.redirect('/');
  //   })
  // })
})


module.exports = router;