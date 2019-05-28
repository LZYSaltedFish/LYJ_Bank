const { Todo } = require('../../models')
let todos = ['todo1', 'todo2', 'todo3']
module.exports = async () => {
  return Promise.all(todos.map(async todo => {
    const created = await Todo.create({
      text: todo,
      done: false
    })
    return created
  }))
}
