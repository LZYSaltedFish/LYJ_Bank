var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
/**
 * @api {get} /todos 获取todo
 * @apiGroup Todo
 * @apiUse Todos
 * @apiUse Todo
 */
router.get('/todos', ExpressAsyncCatch(async (req, res, next) => {
  // use mongoose to get all todos in the database
  const todos = await Model.Todo.find()
  res.send(todos)
}))

/**
 * @api {post} /todos 创建一个todo
 * @apiParam {String} text todo内容
 * @apiGroup Todo
 * @apiUse Todo
 */
router.post('/todos', ExpressAsyncCatch(async (req, res, next) => {
  // create a todo, information comes from AJAX request from Angular
  Model.Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if (err) { res.send(err) }

    // get and return all the todos after you create another
    res.send(todo)
  })
}))

/**
 * @api {delete} /todos/:todo_id 删除一项todo
 * @apiParam {String} todo_id todo编号
 * @apiGroup Todo
 * @apiUse Todo
 */
router.delete('/todos/:todo_id', ExpressAsyncCatch(async (req, res, next) => {
  const todo = await Model.Todo.remove({ _id: req.params.todo_id })
  res.send(todo)
}))


module.exports = router
