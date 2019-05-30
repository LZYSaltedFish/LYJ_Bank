var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const validate = require('./middlewares/validate')
const { Errors } = require('../global')
const Joi = require('@hapi/joi')
/**
 * @api {put} /account/transfer 转账
 * @apiParam {String} remitter_id 汇款人id
 * @apiParam {String} recipient_id 收款人id
 * @apiGroup Account
 * @apiUse Account
 * @apiErrorExample account_not_found
 * {
 *    errcode: 3,   //errcode 为非零值
 *    errmsg: '收款账号不存在'
 * }
 * @apiErrorExample insufficient_funds
 * {
 *    errcode: 2,   // errcode 为非零值
 *    errmsg: '余额不足'
 * }
 */
router.put('/account/transfer',
  validate('body', Joi.object().keys({
    remitter_id: Joi.string().required(),
    recipient_id: Joi.string().required(),
    amount: Joi.number().required().min(0)
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    const { remitter_id, recipient_id, amount } = req.body
    const remitter = await Model.Account.findOne({
      account_id: remitter_id
    })
    const recipient = await Model.Account.findOne({
      account_id: recipient_id
    })
    if (!recipient) {
      res.send({
        errcode: 3,
        errmsg: '收款账号不存在'
      })
    } else if (remitter.balance < amount) {
      res.send({
        errcode: 2,
        errmsg: '余额不足'
      })
    } else {
      await Model.Account.update(
        { account_id: remitter_id },
        { balance: remitter.balance - amount }
      )
      await Model.Account.update(
        { account_id: recipient_id },
        { $set: { balance: recipient.balance + amount } }
      )
      await Model.Record.create({
        remitter_id: remitter_id,
        recipient_id: recipient_id,
        amount: amount,
        operation_type: 'Transfer',
        record_time: new Date()
      })
      res.send(remitter)
    }
  })
)

module.exports = router
