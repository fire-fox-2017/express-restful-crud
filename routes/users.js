var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({})
  .then((query) => {
    res.render('users',{
      tampil:query
    })
  })
});

router.get('/add_user', (req, res, next) =>{
  res.render('users/add_user',{})
})

router.post('/create',(req, res, next) => {
  models.User.create({
    fullname : req.body.fullname,
    email : req.body.email
  })
  .then(function(){
    res.redirect('/users')
  })
})

router.get('/delete/:id',(req, res, next) => {
  models.User.destroy({
    where:{
      id : req.params.id
    }
  })
  .then(function(){
    res.redirect('/users')
  })
})

router.get('/edit/:id',(req,res,next)=>{
  models.User.find({
    where :{
      id : req.params.id
    }
  })
  .then(function(user){
    res.render('users/edit_users',{
      user:user
    })
  })
})

router.post('/update/:id',(req, res, next)=>{
  models.User.update({
    fullname : req.body.fullname,
    email : req.body.email
  },{
    where:{
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/users')
  })
})

module.exports = router;
