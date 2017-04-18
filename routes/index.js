var express = require('express');
var router = express.Router();
var db = require('../models');
// var helper = require('../helper/convert');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findAll()
  .then(users => {
      res.render('index', { users: users});
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;
