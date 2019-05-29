const Model = require('../../models')
const todos = require('./todo')
const accounts = require('./account')
const users = require('./user')
module.exports = async () => {
  await Model.Todo.deleteMany()
  await Model.Account.deleteMany()
  await Model.User.deleteMany()
  await users()
  await todos()
  await accounts()
}
