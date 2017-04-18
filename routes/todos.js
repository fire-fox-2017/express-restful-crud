const express = require('express');
const router = express.Router();
const User = require("../models").User;
const Todo = require("../models").Todo;

router.get('/', function(req, res) {
  Todo.findAll({include: [{model: User}]})
    .then((todos) => {
      res.json(todos);
    }).catch((err) => {
      res,send(err);
    });
});


module.exports = router;
