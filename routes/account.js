var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const { validate, checkAccount } = require('./middlewares')
const { Errors } = require('../global')
const Joi = require('@hapi/joi')
/**
 * @api {get} /account?account_id:=account_id 获取用户存款信息
 * @apiParam {String} account_id 账户id
 * @apiGroup Account
 * @apiUse Account
 * @apiErrorExample account_id不正确
 * {
 *    '抛出handle-error错误,好像是401代码'
 * }
 */
router.get('/account',
  validate('query', Joi.object().keys({
    account_id: Joi.string().required()
  })),
  checkAccount('query'),
  ExpressAsyncCatch(async (req, res, next) => {
    let { account_id } = req.query
    const account = await Model.Account.findOne({
      account_id
    })
    if (!account) throw Errors.ClientError.badRequest('account_id不正确')
    res.send(account)
  })
)

/**
 * @api {post} /account 创建一个账户
 * @apiParam {String} account_id 账户id
 * @apiParam {Number} balance 初始存款
 * @apiGroup Account
 * @apiUse Account
 * @apiErrorExample {json} error
 * {
 *    errcode: 1,   // errcode 为非零值
 *    errmsg: 'account_id已存在'
 * }
 */
router.post('/account',
  validate('body', Joi.object().keys({
    account_id: Joi.string().required(),
    balance: Joi.number().required().min(0)
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    const { account_id, balance } = req.body
    const exists = await Model.Account.findOne({
      account_id
    })
    if (exists) {
      res.send({
        errcode: 1,
        errmsg: 'account_id已存在'
      })
    } else {
      const account = await Model.Account.create({
        username: req.user.username,
        account_id,
        balance
      })
      res.send(account)
    }
  })
)

module.exports = router
