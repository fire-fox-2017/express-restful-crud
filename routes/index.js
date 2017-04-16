var express = require('express');
var router = express.Router();

const db = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express Restful CRUD' });

  var html = "";
  db.Memo.findAll()
  .then (memos => {
  	// for (let i = 0 ; i < memos.length ; i++ ) {
  	// 	html += `${memos[i].name} ${memos[i].is_complete} <br>`;
  	// }
		// res.send(html);
/*
  	for (let i = 0 ; i < memos.length ; i++ ) {
  		html += `${memos[i].name} ${memos[i].is_complete} <br>`;
  		memos[i].getUser()
  		.then (user => {
  			memos[i]['user_email'] = user.email;
  		})
  	}
  	console.log("hahaha")
  	console.log(memos[0]);
 */

		res.render('index', { title: 'Express Restful CRUD', memos: memos });

  })
  .catch (err => {
  	console.log(err.message);
  })


  // var html = 'Hello: ' + userName + '.<br>' +
  //            '<a href="/">Try again.</a>';
  // res.send(html);

});

router.post('/addMemo', (req, res, next) => {
	console.log(req.body)
	
  // var user_email = req.body.user_email;
  var user_id = req.body.user_id
  var user_memo = req.body.user_memo;

  db.Memo.create({title: user_memo, user_id: user_id})
  .then ( memo => {
  	let msg = `Created memo ${memo.title} - ${memo.getUser().then(u => { u.email }) }`;
  	console.log(msg);

  	res.redirect('/');
  })
  .catch ( err => {
  	console.log(err.message);
  })


})


module.exports = router;
