var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const { validate, checkAccount } = require('./middlewares')
const { Errors } = require('../global')
const Joi = require('@hapi/joi')
/**
 * @api {put} /account/withdraw 取款
 * @apiParam {String} account_id 账户id
 * @apiParam {Number} amount 取款金额
 * @apiGroup Account
 * @apiUse Account
 * @apiErrorExample insufficient_funds
 * {
 *    errcode: 2,   // errcode 为非零值
 *    errmsg: '余额不足'
 * }
 */
router.put('/account/withdraw',
  validate('body', Joi.object().keys({
    account_id: Joi.string().required(),
    amount: Joi.number().required().min(0)
  })),
  checkAccount('body'),
  ExpressAsyncCatch(async (req, res, next) => {
    const { account_id, amount } = req.body
    let account = await Model.Account.findOne({
      account_id
    })
    if (account.balance < amount) {
      res.send({
        errcode: 2,
        errmsg: '余额不足'
      })
    } else {
      account = await Model.Account.update(
        { account_id: account.account_id },
        { balance: account.balance - amount }
      )
      await Model.Record.create({
        remitter_id: account.account_id,
        amount: amount,
        operation_type: 'withdraw',
        record_time: new Date()
      })
      const account_new = await Model.Account.findOne({
        account_id: account_id
      })
      res.send(account_new)
    }
  })
)

module.exports = router
