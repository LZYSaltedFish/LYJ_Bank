const Model = require('../../models')
let names = ['23333']
module.exports = async () => {
  return Promise.all(names.map(async name => {
    const created = await Model.User.create({
      username: name
    })
    return created
  }))
}
