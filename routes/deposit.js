var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const { validate, checkAccount } = require('./middlewares')
const Joi = require('@hapi/joi')
/**
 * @api {put} /account/deposit 存款
 * @apiParam {String} account_id 账户id
 * @apiParam {Number} amount 存款金额
 * @apiGroup Account
 * @apiUse Account
 * @apiSuccessExample account_after_deposit
 * {
 *    _id: '5cf00e9a84b2e35ac0360b00',   //数据库里的序号，没用的
 *    username: '66666',
 *    account_id: 'account1',
 *    __v: 0,
 *    balance: 700
 * }
 */
router.put('/account/deposit',
  validate('body', Joi.object().keys({
    account_id: Joi.string().required(),
    amount: Joi.number().required().min(0)
  })),
  checkAccount('body'),
  ExpressAsyncCatch(async (req, res, next) => {
    const { account_id, amount } = req.body
    const account = await Model.Account.findOne({
      account_id
    })
    await Model.Account.update(
      { account_id: account_id },
      { balance: account.balance + amount }
    )
    await Model.Record.create({
      remitter_id: account_id,
      amount: amount,
      operation_type: 'deposit',
      record_time: new Date()
    })
    const account_new = await Model.Account.findOne({
      account_id: account_id
    })
    res.send(account_new)
  })
)

module.exports = router
