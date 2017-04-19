var express = require('express');
var router = express.Router();
var models = require ('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({})
  .then(function (user) {
    res.render ('users/index' , {
      users : user
    })
  })
// res.render('users/index', { title: 'Express' });

})

//Form Add Users
router.get('/add', function (req, res, next) {
  // res.render('users/add')
  res.render('users/add', {

  })
})

// Create Users
router.post('/create', function(req,res,next) {
  models.User.create({
    name : req.body.name,
    email: req.body.email
  })
  .then(function () {
     res.redirect ('/users')
  })
})


//Edit Users
router.get('/edit/:id', function(req, res, next) {
  models.User.find({
    where : {
      id : req.params.id
    }
  })
  .then(function(user) {
    res.render('users/edit', {
      users : user
    })

  })
})


// Update Users
router.post('/update/:id', function(req,res,next) {
  models.User.update({
    name : req.body.name,
    email : req.body.email
}, {
  where : {
    id : req.params.id
  }
})
   .then(function() {
    res.redirect ("/users")
  })
})


//Delete Users
router.get('/delete/:id', function (req,res,next) {
  models.User.destroy({
    where : {
      id : req.params.id
    }
  })
  .then(function() {
    res.redirect ("/users")
  })
})


module.exports = router;
