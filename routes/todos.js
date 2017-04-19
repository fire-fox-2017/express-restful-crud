var express = require('express');
var router = express.Router();
var models = require('../models');
var date = require('../helper/date')

router.get('/',function(req, res, next){
  models.Todo.findAll({
    include: [
        models.User
      ],
      order: '"id" DESC'
  })
  .then((query) =>{
    res.render('todos/list_todo',{
      tampil:query,
      helper:date
    })
  })
})

router.get('/add_todo', function(req, res, next){
  models.User.findAll()
   .then((users) => {
     res.render('todos/add_todo', {
       users: users
     });
   })
})

router.post('/create',(req, res, next)=>{
  models.Todo.create({
    title : req.body.title,
    is_complete : req.body.is_complete,
    id_user : req.body.id_user
  })
  .then(() => {
    res.redirect('/todos')
  })
})

router.get('/delete/:id',(req, res, next)=>{
  models.Todo.destroy({
    where:{
      id : req.params.id
    }
  })
  .then(()=>{
    res.redirect('/todos')
  })
})

router.get('/edit/:id',(req, res, next)=>{
  models.Todo.find({
    include:[models.User],
    where:{
      id : req.params.id
    }
  })
  .then((todos)=>{
      res.render('todos/edit_todo', {
        todo: todos,
      })
  })
})

router.post('/update/:id',(req, res, next)=>{
  models.Todo.update({
    title : req.body.title,
    is_complete : req.body.is_complete || false,
    updatedAt : new Date()
  },{
    where:{
      id : req.params.id
    }
  })
  .then(()=>{
    res.redirect('/todos')
  })
})
module.exports = router;
