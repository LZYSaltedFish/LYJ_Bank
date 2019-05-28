const Model = require('../../models')
const todos = require('./todo')
const accounts = require('./account')
module.exports = async () => {
  await Model.Todo.deleteMany()
  await Model.Account.deleteMany()
  await todos()
  await accounts()
}
