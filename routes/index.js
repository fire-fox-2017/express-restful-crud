var express = require('express');
var router = express.Router();
var connection = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.User.findAll()
  .then(users =>{
    connection.Memo.listMemo(memos =>{
      res.render('index',{list_user: users,list_memo:memos})
    });
  });
});

router.post('/', function(req,res,next){
  var id = req.body.user_id
  var title = req.body.title;

  connection.Memo.create({title: title, user_id: Number(id),is_complete:false})
  .then ( memo => {
  	let msg = `Created memo ${memo.title} - ${memo.getUser().then(user => { user.email }) }`;
  	res.redirect('/');
  })
  .catch ( err => {
  	res.send(err);
});

});

router.get('/edit/:id', (req, res, next) => {
	var memo_id = req.params.id

	connection.Memo.findById(memo_id).
	then (memo => {
		memo.getUser()
		.then( user => {
			res.render('edit', {memo: memo, user: user});
		})


	})

})


router.post('/edit/:id', (req, res, next) => {
	var id = req.params.id
	var title = req.body.title;

	connection.Memo.update({title: title},{where: {id: id}})
	.then (memo => {
  	res.redirect('/');
	})

})

router.get('/delete/:id', (req, res, next) => {

  var id = req.params.id
  connection.Memo.destroy({where: {id: id}})
  .then ( (memo) => {
  	if(memo === 1) {
  		res.redirect('/');
  	}
  })
  .catch ( err => {
  	console.log(err.message);
  })

  router.get('/complete/:id', (req, res, next) => {
  	var id = req.params.id

  	connection.Memo.update({is_complete: true},{where: {id: id}})
  	.then (memo => {
      res.redirect('/');
  	})

  })

  router.get('/uncomplete/:id', (req, res, next) => {
    var id = req.params.id

    connection.Memo.update({is_complete: false},{where: {id: id}})
    .then (memo => {
      res.redirect('/');
    })

  })

})

module.exports = router;
