var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

router.get('/', function(req, res, next) {
    models.Todo.findAll({
            include: {
                model: models.User
            }
        })
        .then(todos => {
            // console.log(JSON.stringify(todos[0].title, null, 2));
            res.render('index', {
                title: 'List of Todos',
                todos: todos
            })
        })
})

module.exports = router;