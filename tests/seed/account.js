const Model = require('../../models')
let accounts = ['account1', 'account2', 'account3']
module.exports = async () => {
  return Promise.all(accounts.map(async account => {
    const created = await Model.Account.create({
      account_id: account,
      balance: 500
    })
    return created
  }))
}
