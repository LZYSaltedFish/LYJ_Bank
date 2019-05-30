const { ExpressAsyncCatch } = require('../../utils')
const { Errors } = require('../../global')
const Model = require('../../models')

module.exports = (accout_id) => {
  return ExpressAsyncCatch(async (req, res, next) => {
    const exists = await Model.Account.findOne({
      username: req.user.username,
      accout_id: accout_id
    })
    if (!exists) throw Errors.ClientError.forbidden('无权操作此账户')
    else next()
  })
}
