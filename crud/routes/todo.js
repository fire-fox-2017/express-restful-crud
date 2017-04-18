var express = require('express');
var router = express.Router();
var db = require('../models')
const convertDate = require("../helper/convert_time.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Todo.findAll({include:[{model:db.User}],order: '"updatedAt" DESC'})
  .then(recordsTodo => {
    let newArray = recordsTodo.map(function (record) {
      record.dataValues.createdAt = convertDate(record.dataValues.createdAt)
      record.dataValues.updatedAt = convertDate(record.dataValues.updatedAt)
      console.log("++++++++++",convertDate(record.dataValues.createdAt));
      return record
    });
    res.render ('index',{ title: 'List Todo', tampilkan: newArray})
  })
  .catch(() => {
    res.redirect('/404')
  })
});
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   db.Todo.findAll({include: [{model: db.User}], order: [['id','ASC']]})
//   .then(list => {
//     res.render('index', { title: 'List Todo', tampilkan: list });
//   })
// });

router.get('/create',function(req,res,next) {
  db.User.findAll()
  .then(users => {
    res.render ('./create_todo',{users:users,validate:""})
  })
})

router.post('/create',function(req,res,next) {
  let cek = req.body.status === undefined? false:true;
  db.Todo.create(
    {title: req.body.title, isComplete:cek, UserId: req.body.user}
  ).then(data => {
    res.redirect('/')
  })
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
  db.Todo.findById(id)
  .then(todo => {
    db.User.findAll()
    .then(users => {
      res.render('./edit', {users: users, id: id, search: todo.title, todo:todo})
    })
  })
})

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id
  db.Todo.update({
    title : req.body.title,
    UserId : req.body.userid,
    isComplete : req.body.status == undefined? false:true
  }, {
    where : {
      id : id
    }
  }).then(()=> {
    res.redirect('/')
  })
})

router.get("/delete/:id", function(req, res){
  db.Todo
    .destroy(
      {where: {id: req.params.id}}
    )
    .then(() =>{
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err.message)
    })
})

module.exports = router;
