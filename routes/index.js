var express = require('express');
var router = express.Router();

const db = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express Restful CRUD' });

  var html = "";
  var memos_arr = [];

  // db.Memo.listMemo( memos => {
  // 	res.render('index', { title: 'Express Restful CRUD', memos: memos });
  // });

  db.User.findAll()
  .then (users => {
	  db.Memo.listMemo( memos => {
	  	res.render('index', { title: 'Express Restful CRUD', memos: memos, users: users });
	  });
  })

/*
	// using memo.getUser() cannot be used in this case
  db.Memo.findAll()
  .then (memos => {
  	// for (let i = 0 ; i < memos.length ; i++ ) {
  	// 	html += `${memos[i].name} ${memos[i].is_complete} <br>`;
  	// }
		// res.send(html);

  	for (let i = 0 ; i < memos.length ; i++ ) {
  		// html += `${memos[i].name} ${memos[i].is_complete} <br>`;
  		memos[i].getUser()
  		.then (user => {
  			let memos_temp = {};
  			memos_temp['title'] = memos[i].title;
  			memos_temp['is_complete'] = memos[i].is_complete;
  			memos_temp['user_email'] = user.email;
  			memos_temp['createdAt'] = memos[i].createdAt;

  			console.log(memos_temp);
  			memos_arr.push(memos_temp);

  		})
  	}
 		console.log("haha",memos_arr);
		res.render('index', { title: 'Express Restful CRUD', memos: memos_arr });
		return memos_arr;
  })
  .catch (err => {
  	console.log(err.message);
  })
*/

});

router.post('/addMemo', (req, res, next) => {
	console.log(req.body)
	
  // var user_email = req.body.user_email;
  var user_id = req.body.user_id
  var title = req.body.title;

  db.Memo.create({title: title, user_id: user_id})
  .then ( memo => {
  	let msg = `Created memo ${memo.title} - ${memo.getUser().then(u => { u.email }) }`;
  	console.log(msg);

  	res.redirect('/');
  })
  .catch ( err => {
  	console.log(err.message);
  })


})


router.get('/deleteMemo/:id', (req, res, next) => {
	console.log('delete memo')
	console.log(req.body)
	
  // var user_email = req.body.user_email;
  var memo_id = req.params.id

  db.Memo.destroy({where: {id: memo_id}})
  .then ( (rowDeleted) => {
  	if(rowDeleted === 1) {
  		console.log(`Deleted memo with id=${memo_id}.`)
  		res.redirect('/');
  	}
  })
  .catch ( err => {
  	console.log(err.message);
  })


})

router.get('/editMemo/:id', (req, res, next) => {
	var memo_id = req.params.id

	db.Memo.findById(memo_id).
	then (memo => {
		memo.getUser()
		.then( user => {
			console.log(JSON.stringify(memo));
			res.render('edit', { title: 'Edit Memo', memo: memo, user: user});
		})


	})

})


router.post('/editMemo/:id', (req, res, next) => {
	var memo_id = req.params.id
	var memo_title = req.body.title;
	db.Memo.update({title: memo_title} , {fields: ['title'], where: {id: memo_id}})
	.then (memo => {
		console.log("update success");
  	res.redirect('/');
	})

})



module.exports = router;
