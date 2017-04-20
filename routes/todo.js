var express = require('express');
var router = express.Router();
var db = require("../models");
var helper = require('../helper/format_date')

/* GET users listing. */
router.get("/",function(req,res,next){
  db.Todolist.findAll({
    include:[
    db.User ],
    order: 'id DESC'
  })
  .then(function(data){
    //res.send(data)
    res.render("todo/list",{todos: data, newDate: helper})
  })
})



router.get("/add",function(req,res,next){
  db.User.findAll()
  .then(function(data){
    res.render("todo/add",{users: data})
  })
})

router.post('/add',function(req,res,next){
  db.Todolist.create({
    task: req.body.things,
    iscompleted: req.body.iscompleted || false,
    user_id: req.body.user_id
  })
  .then(function(){
    res.redirect("/todo")
  })
})

router.get('/delete/:id',function(req,res,next){
  db.Todolist.destroy({
    where : {
      id: req.params.id
    }
  })
  .then(function(){
    res.redirect('/todo')
  })
})

router.get('/edit/:id',function(req,res,next){
  db.Todolist.find({
    include : [db.User],
    where:{
      id:req.params.id
    }
  })
  .then(function(data){
    db.User.findAll()
    .then(user=>{
      res.render('todo/edit',{todo: data, users: user})
    })

  })
})

router.post("/update/:id",function(req,res,next){
  db.Todolist.update({
    task: req.body.things,
    iscompleted: req.body.iscompleted || false,
    user_id: req.body.user_id
  },
  {
    where:{
      id:req.params.id
    }
    })
  .then(function(data){
    res.redirect('/todo')
  })
})

module.exports = router
