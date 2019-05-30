const Model = require('../../models')
const accounts = require('./account')
const users = require('./user')
const product_info = require('./product_info')
module.exports = async () => {
  await Model.Account.deleteMany()
  await Model.User.deleteMany()
  await users()
  await accounts()
  await product_info()
}
