var express = require('express');
var router = express.Router();
const User = require("../models").User;
const Todo = require("../models").Todo;

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll().then((users) => {
    res.render('index', { title: 'JS Todo', users: users });
  }).catch((err) => {
    res.send(err);
  });
  // res.render('index', { title: 'JS Todo' });
});

/* create new user */
router.post('/', function(req, res) {
  let newEmail = req.body.email;
  if (newEmail) {
    User.create({
      email: req.body.email
    }).then((user) => {
      res.redirect("/");
    }).catch((err) => {
      res.send(err);
    });
  } else {
    res.redirect("/");
  }
});

// delete user
router.post('/deleteUser', function(req, res) {
  let userId = req.body.userId;
  console.log(userId)
  if(userId) {
    User.destroy({where: {id: userId}})
      .then((destroyed) => {
        res.redirect("/");
      }).catch((err) => {
        res.send(err);
      });
  } else {
    res.redirect("/");
  }
});


// show user page
router.get('/user/:id', function(req, res) {
  let userId = req.params.id;
  User.find({where: {id: userId}}).then((user) => {
    Todo.findAll({where: {user_id: userId}}).then((todos) => {
      res.render('user', {todos: todos, user: user});
    }).catch((err) => {
      res.send(err);
    });
  }).catch((err) => {
    res.send(err);
  });
});

// add new task
router.post('/addTodo', function(req, res) {
  let userId = req.body.id;
  let task = req.body.task;
  if (task.length > 0) {
    Todo.create({title: task, user_id: userId})
      .then((task) => {
        res.redirect("/user/"+userId);
      }).catch((err) => {
        res.send(err);
      });
  } else {
    res.redirect("/user/"+userId);
  }
});

//  update task memo
router.post('/updateTask', function(req, res) {
  let userId = req.body.userId;
  let taskId = req.body.taskId;
  let taskMemo = req.body.taskMemo
  Todo.update({title: taskMemo}, {where: {id: taskId, user_id: userId}})
    .then((updated) => {
      res.redirect("/user/"+userId);
    }).catch((err) => {
      res.send(err);
    });
});

//  update task status
router.post('/completeTask', function(req, res) {
  let userId = req.body.userId;
  let taskId = req.body.taskId;
  Todo.update({is_complete: true}, {where: {id: taskId, user_id: userId}})
    .then((updated) => {
      res.redirect("/user/"+userId);
    }).catch((err) => {
      res.send(err);
    });
});

// delete task
router.post('/deleteTask', function(req, res) {
  let userId = req.body.userId;
  let taskId = req.body.taskId;
  if(taskId) {
    Todo.destroy({where: {id: taskId, user_id: userId}})
      .then((destroyed) => {
        res.redirect("/user/"+userId);
      }).catch((err) => {
        res.send(err);
      });
  } else {
    res.redirect("/user/"+userId);
  }
});



// get all todos
router.get('/todos', function(req, res) {
  Todo.findAll().then((todos) => {
    res.json(todos);
  });
});

// get single todo
router.get('/todo/:id', function(req, res) {
  Todo.find({
    where: {id: req.params.id}
  }).then((todo) => {
    res.json(todo);
  });
});

// add new todos
router.post('/todos', function(req,res) {
  Todo.create({
    title: req.body.title,
    user_id: req.body.user_id
  }).then((todo) => {
    res.json(todo);
  });
});

// update single todo
router.put('/todo/:id', function(req, res) {
  Todo.find({
    where: {id: req.params.id}
  }).then((todo) => {
    todo.updateAttributes({
      title: req.body.title,
      is_complete: req.body.complete
    }).then((todo) => {
      res.send(todo);
    });
  });
});

// delete a single todo
router.delete('/todo/:id', function(req, res) {
  Todo.destroy({
    where: {id: req.params.id}
  }).then((todo) => {
    res.json(todo);
  });
});

function timeConvert(time) {
  let newTime = new Date(time);
  let day = newTime.getDay();
  let date = newTIme.getDate();
  let month = newTime.getMonth();
  let year = newTime.getFullYear();
  let hours = newTime.getHours() +1;
  let minutes = newTime.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[day]}, ${day}-${months[month]}-${year}, ${hours}:${minutes}`;
}

module.exports = router;
