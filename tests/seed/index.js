const Model = require('../../models')
const accounts = require('./account')
const users = require('./user')
module.exports = async () => {
  await Model.Account.deleteMany()
  await Model.User.deleteMany()
  await users()
  await accounts()
}
