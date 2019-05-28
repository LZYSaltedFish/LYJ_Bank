var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const validate = require('./middlewares/validate')
const Joi = require('@hapi/joi')
/**
 * @api {get} /account?account_id=account_id 获取用户存款信息
 * @apiParam {String} account_id 账户id
 * @apiGroup Account
 * @apiUse Balance
 */
router.get('/account',
  validate('query', Joi.object().keys({
    account_id: Joi.string().required()
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    let { account_id } = req.query
    const account = await Model.Account.findOne({
      account_id
    })
    res.send(account)
  })
)

/**
 * @api {post} /account 创建一个账户
 * @apiParam {String} account_id 账户id
 * @apiParam {Number} balance 初始存款
 * @apiGroup Account
 * @apiUse Balance
 */
router.post('/account',
  validate('body', Joi.object().keys({
    account_id: Joi.string().required(),
    balance: Joi.number().required().min(0)
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    const { account_id, balance } = req.body
    const account = await Model.Account.create({
      account_id,
      balance
    })
    res.send(account)
  })
)


module.exports = router
