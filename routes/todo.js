var express = require('express');
var router = express.Router();
var db = require('../models');
var app = require('../app');

router.get('/', function(req, res, next) {
  db.User.findAll()
    .then(resultU => {
      db.Todo.findAll()
        .then(resultT => {
          // let arrObj = JSON.stringify(resultT);
          // for (let i = 0; i < arrObj.length; i++) {
          //   arrObj[i].newdate = app.locals.gdate(arrObj[i].createdAt);
          // }
          var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          resultT.forEach(todo => {
            var inddate = new Date(todo.createdAt);
            todo.newdate = days[inddate.getDay()] + ", " + inddate.getDate() + " " + month[inddate.getMonth()] + " " + inddate.getFullYear() + ", " + inddate.getHours() + ":" + inddate.getMinutes() + ":" + inddate.getSeconds();
          })
          res.render('todo', {
            title: 'TODO',
            list_users: resultU,
            list_todo: resultT
          })
        })
    })
    .then(err => {
      console.log(err);
    })
});
router.post('/add', function(req, res, next) {
  let user = req.body.user;
  let task = req.body.task;
  db.Todo.create({
      'title': task,
      'is_complete': false,
      'UserId': user
    })
    .then(result => {
      res.redirect('/todos');
    }).catch(err => {
      console.log(err);
    });
});
router.get('/delete', function(req, res, next) {
  let key = req.query.key;
  db.Todo.destroy({
      where: {
        id: key
      }
    }).then(result => {
      res.redirect('/todos');
    })
    .catch(err => {
      console.log("ERR Delete : " + err);
    })
});
router.get('/edit', function(req, res, next) {
  let key = req.query.key;
  db.Todo.findById(key)
    .then(result => {
      res.render('todoEdit', {
        title: 'TODO Edit',
        todo: result
      })
    })
});
router.post('/edit/post', function(req, res, next) {
  let title = req.body.title;
  let status = req.body.status;
  let id = req.body.id;
  db.Todo.update({
      title: title,
      is_complete: status || false
    }, {
      where: {
        id: id
      }
    }).then(result => {
      res.redirect('/todos');
    })
    .catch(err => {
      console.log("ERR Uncomplete : " + err);
    })
});
module.exports = router;
