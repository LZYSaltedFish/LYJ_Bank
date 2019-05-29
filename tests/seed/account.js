const Model = require('../../models')
let accounts = ['account1', 'account2', 'account3']
module.exports = async () => {
  const user = await Model.User.create({
    username: '66666'
  })
  return Promise.all(accounts.map(async account => {
    const created = await Model.Account.create({
      username: user.username,
      account_id: account,
      balance: 500
    })
    return created
  }))
}
