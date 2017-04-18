var express = require('express');
var router = express.Router();
var connection = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.post('/',(req,res,next)=>{

  let email = req.body.email
  connection.User.create({email:email})
  .then (result =>{
    res.send(`${email} has been added!`)
  })
  .catch (err =>{
    console.log(err);
  });
});

module.exports = router;
