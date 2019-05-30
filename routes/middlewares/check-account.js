const { ExpressAsyncCatch } = require('../../utils')
const { Errors } = require('../../global')
const Model = require('../../models')

/**
 * @description 对account_id进行验证
 * @param field account_id所在区域
 */
module.exports = (field) => {
  return ExpressAsyncCatch(async (req, res, next) => {
    const exists = await Model.Account.findOne({
      username: req.user.username,
      account_id: req[field].account_id
    })
    if (!exists) throw Errors.ClientError.forbidden('无权操作此账户')
    else next()
  })
}
