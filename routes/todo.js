var express = require ('express');
var router = express.Router();
var models = require ('../models');
var date = require('../helper/date')

//Tampilan halaman todo
router.get('/', (req, res, next)=> {
  models.Todo.findAll({
    include : [
      models.User
    ],
    order: '"id" DESC'
  })
  .then((todo) => {
    res.render('todos/index', {
      todos : todo,
      helper : date
    })
  })
})

//add todo
router.get('/addtodo', (req, res, next)=>{
  models.User.findAll()
  .then((users) => {
    res.render('todos/add', {
      users : users
    })
  })
})

// //create todo
router.post('/create', (req,res,next) => {
  models.Todo.create({
    title : req.body.title,
    is_complite: req.body.is_complite,
    id_user : req.body.id_user
  })
  .then( ()=> {
    res.redirect('/todo')
  })
})

//delete todo
router.get('/delete/:id', (req, res, next) => {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( () => {
    res.redirect('/todo')
 })
})

//edit todo
router.get('/edit/:id', (req,res,next) => {
  models.Todo.find({
    include: [models.User],
    where: {
      id : req.params.id
    }
  })
  .then((todos)=> {
    res.render('todos/edit', {
      todos: todos,
    })
  })
})

// //update todo
router.post('/update/:id', (req,res,next)=> {
  models.Todo.update({
    title: req.body.title,
    is_complite : req.body.is_complite || false,
    updatedAt : new Date()
  }, {
    where: {
      id: req.params.id
    }
  })
  .then( ()=> {
    res.redirect('/todo')
  })
})

module.exports = router;
