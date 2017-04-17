var express = require('express');
var router = express.Router();
var models = require('../models')
var moment = require('moment')

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

/* utk list of todo */
router.get('/', function(req, res, next) {
    models.Todo.findAll({
            include: [{
                model: models.User
            }],
            order: '"updatedAt" DESC'
        })
        .then(todos => {
            // console.log(JSON.stringify(todos[0].title, null, 2));
            // let convertDate = moment().format('dddd, D MMM YYYY, h:mm')
            // console.log(convertDate);
            let convertData = todos.map(todo => {
                // console.log(moment(todo.dataValues.createdAt).format('dddd, D MMM YYYY, h:mm'));
                // console.log(todo.dataValues.createdAt);
                todo.dataValues.createdAt = moment(todo.dataValues.createdAt).format('dddd, D MMM YYYY, h:mm')
                todo.dataValues.updatedAt = moment(todo.dataValues.updatedAt).format('dddd, D MMM YYYY, h:mm')
                return todo
            })
            // console.log(convertData[1].id);
            res.render('index', {
                title: 'List of Todos',
                dataTodo: convertData
            })
        })
        .catch(() => {
            res.redirect('/404')
        })
})

/* utk create */
router.get('/create', (req, res, next) => {
    models.User.findAll()
        .then((users) => {
            // console.log(users[1].email);
            res.render('./create_todo', {
                dataUsers: users
            })
        })
})

router.post('/create', (req, res, next) => {
    let cekComplete = req.body.isComplete === undefined ? false : true
    models.Todo.create({
            title: req.body.title,
            isComplete: cekComplete,
            userId: req.body.user
        })
        .then(() => {
            res.redirect('/')
        })
})

/* utk edit */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id
    models.Todo.findById(id)
        .then(todo => {
            models.User.findAll()
                .then(users => {
                    // console.log(users);
                    res.render('./edit', {
                        title: 'Edit Your Memo',
                        dataUsers: users,
                        id: id,
                        titleValue: todo.title,
                        dataTodo: todo
                    })
                })
        })
})

router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id
    models.Todo.update({
            title: req.body.title,
            userId: req.body.userId,
            isComplete: req.body.isComplete === undefined ? false : true
        }, {
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/')
        })
})

router.get('/delete/:id', (req, res, next) => {
    models.Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err.message)
        })
})

module.exports = router;