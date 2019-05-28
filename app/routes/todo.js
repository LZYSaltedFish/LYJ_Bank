var Todo = require('../models/todo')
const router = require('express').Router()
function getTodos () {
  Todo.find(function (err, todos) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      throw new Error(err)
    }

    return todos
  })
};
/**
 * @api {get} /todos 获取todo
 * @apiGroup Todo
 * @apiUse Todo
 */
router.get('/todos', function (req, res) {
  // use mongoose to get all todos in the database
  res.send(getTodos())
})

/**
 * @api {post} /todos 创建一个todo
 * @apiParam {String} text todo内容
 * @apiGroup Todo
 * @apiUse Todo
 */
router.post('/todos', function (req, res) {
  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if (err) { res.send(err) }

    // get and return all the todos after you create another
    res.send(getTodos())
  })
})

/**
 * @api {delete} /todos/:todo_id 删除一项todo
 * @apiParam {String} todo_id todo编号
 * @apiGroup Todo
 * @apiUse Todo
 */
router.delete('/todos/:todo_id', function (req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if (err) { res.send(err) }
    res.send(getTodos())
  })
})


module.exports = router
