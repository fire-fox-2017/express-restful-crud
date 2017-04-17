var express = require('express');
var router = express.Router();

const db = require('../models');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/createUser', function(req, res){
	console.log(req.body)
	

  var user_name = req.body.user_name;
  var user_email = req.body.user_email;
  var user_memo = req.body.user_memo;
  var html = 'toLowerCase: "' + user_memo.toLowerCase() + '".<br>' ;

  db.User.create({name: user_name, email: user_email})
  .then ( user => {
  	let msg = `Created user ${user.name} - ${user.email}`;
  	console.log(msg);
  	res.send(msg);
  })
  .catch ( err => {
  	console.log(err.message);
  })


  // res.send(html);
});



module.exports = router;
