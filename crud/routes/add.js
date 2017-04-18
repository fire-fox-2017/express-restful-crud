var express = require('express');
var router = express.Router();
var db = require('../models');

 // GET localhost/3000/add
router.get('/', function(req, res, next) {
  db.User.findAll()
  .then(users => {
    res.render('add', {title: 'Add new user', users: users});
  })
  .catch(err => {
    console.log(err.message);
  })
});

router.get('/add/:id', function(req, res, next) {
  db.User.find({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    res.render('/add/:id', {user: user})
  })
  .catch(err => {
    console.log(err.message);
  })
});


module.exports = router;
