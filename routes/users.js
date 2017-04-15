var express = require('express');
var router = express.Router();
let models = require('../models')
/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({})
    .then(function(users) {
      res.render('users/index', {
        users: users
      });
    });
});
router.post('/create', function(req, res) {
  models.User.create({
      name: req.body.name,
      email: req.body.email
    })
    .then(function(user) {
      res.redirect("/users")
    });
});
router.get('/add', function(req, res, next) {
  res.render('users/add');
});
router.get('/edit/:id', function(req, res, next) {
  models.User.find({
      where: {
        id: req.params.id
      }
    })
    .then(function(users) {
      res.render('users/edit', {
        users: users
      });
    });
});
router.post('/update/:id', function(req, res, next) {
  models.User.find({
      where: {
        id: req.params.id
      }
    })
    .then(function(users) {
      if (users) {
        users.updateAttributes({
            name: req.body.name,
            email: req.body.email
          })
          .then(function(todo) {
            res.redirect("/users");
          });
      }
    });
});
router.get('/delete/:id', function(req, res, next) {
  models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(users) {
      res.redirect("/users");
    });
});
module.exports = router;
