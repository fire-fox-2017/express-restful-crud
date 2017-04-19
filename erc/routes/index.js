var express = require('express');
var router = express.Router();
var db=require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'MeMo',
    })
});

router.post('/', (req, res, next) => {
    let email = req.body.email;
    let todo = req.body.todo;
    db.Todo.create({
        'title': todo,
        'UserId':email,
        'is_complete':false
    }).then(user => {
        res.redirect('/')
    }).catch(err => {
        console.log(err.message)
    })

})



module.exports = router;
