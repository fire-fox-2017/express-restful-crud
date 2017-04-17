var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* routing baru utk user baru menggunakan method HTTP POST */
// router.post('/user/create', (req, res, next) => {
//     models.User.create({
//             email: req.body.email
//         })
//         .then(() => {
//             res.redirect('/')
//         })
//         .then(user => {
//             res.json(user)
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// })

// router.get('/todo/create', (req, res, next) => {
//     models.User.findAll()
//         .then(_users => {
//             // console.log(JSON.stringify(users[0].email, null, 2));
//             res.render('./create_todo', {
//                 title: 'Add New Todo',
//                 users: _users
//             })
//         })
// })

/* routing baru utk todo baru menggunakan method HTTP POST */
// router.post('/todo/create', (req, res, next) => {
//     let valueComplete = req.body.isComplete === undefined ? false : true
//     models.Todo.create({
//             title: req.body.title,
//             isComplete: valueComplete,
//             userId: req.body.user
//         })
//         .then(() => {
//             res.redirect('/')
//         })
//         .then(todo => {
//             res.json(todo)
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// })

/* routing baru utk get all todo menggunakan method HTTP GET */
// router.get('/todos', (req, res, next) => {
//     models.Todo.findAll({})
//         .then(todos => {
//             res.json(todos)
//         })
// })

/* routing baru utk get single todo menggunakan method HTTP GET */
// router.get('/todo/:id', (req, res, next) => {
//     models.Todo.find({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(todo => {
//             res.json(todo)
//         })
// })

/* routing baru utk update single todo menggunakan method HTTP PUT */
// router.put('/todo/update/:id', (req, res, next) => {
//     models.Todo.find({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(todo => {
//             if (todo) {
//                 todo.updateAttributes({
//                         title: req.body.title,
//                         isComplete: req.body.isComplete
//                     })
//                     .then(todo => {
//                         res.json(todo)
//                     })
//                     .catch(err => {
//                         console.log(err.message);
//                     })
//             }
//         })
// })

/* routing baru utk delete single todo menggunakan method HTTP DELETE */
// router.delete('/todo/destroy/:id', (req, res, next) => {
//     models.Todo.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(() => {
//             // dialihkan ke localhost:3000/
//             res.redirect('/');
//         })
//         .then(todo => {
//             res.json(todo)
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// })

// cara delete pake get
// router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
//   models.Task.destroy({
//     where: {
//       id: req.params.task_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });

module.exports = router;