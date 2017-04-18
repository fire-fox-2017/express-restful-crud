var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll()
    .then(result => {
      res.render('users', {
        title: 'LIST USER',
        list_users: result
      })
    })
    .then(err => {
      console.log(err);
    })
});
router.post('/add', function(req, res, next) {
  let email = req.body.email;
  db.User.create({
      'email': email,
    })
    .then(result => {
      res.redirect('/users');
    }).catch(err => {
      console.log(err);
    });
});

module.exports = router;
