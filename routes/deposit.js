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
    res.send(account)
  })
)

module.exports = router
