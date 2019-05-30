var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const validate = require('./middlewares/validate')
const { Errors } = require('../global')
const Joi = require('@hapi/joi')
/**
 * @api {put} /account/finance 购买理财
 * @apiParam {String} account_id 账户id
 * @apiParam {Number} amount 购买金额
 * @apiParam {String} product_type 产品类型：国债/定期
 * @apiParam {Number} term 时长
 * @apiGroup Finance
 * @apiErrorExample insufficient_funds
 * {
 *    errcode: 2,   // errcode 为非零值
 *    errmsg: '余额不足'
 * }
 */
router.put('/account/finance',
  validate('body', Joi.object().keys({
    account_id: Joi.string().required(),
    amount: Joi.number().required(),
    product_type: Joi.string().required(),
    term: Joi.number().required().min(1).max(20)
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    const { account_id, amount, product_type, term } = req.body
    const account_balance = await Model.Account.findOne({
      account_id
    })
    if (account_balance.balance < amount) {
      res.send({
        errcode: 2,
        errmsg: '余额不足'
      })
    } else {
      await Model.Account.update(
        { account_id: account_id },
        { balance: account_balance.balance - amount }
      )
      await Model.Record.create({
        remitter_id: account_id,
        record_time: new Date(),
        amount: amount,
        operation_type: product_type === 'National_Debt' ? 'National_Debt' : 'Fixed_Term'
      })
      const account_finance = await Model.Finance.create({
        account_id: account_id,
        buy_time: new Date(),
        amount: amount,
        product_type: product_type === 'National_Debt' ? 'National_Debt' : 'Fixed_Term',
        term: term
      })
      const interest = await Model.Product_Info.findOne({
        product_type: account_finance.product_type,
        term: account_finance.term
      })
      console.log(account_finance)
      console.log(interest.interest)
      var estimated_money = account_finance.amount * Math.pow((interest.interest + 1), account_finance.term)
      console.log('预计得到的本金和利息为：' + estimated_money)
      res.send(account_finance)
    }
  })
)

/**
 * @api {get} /account/fiannce?account_id=account_id 查询理财
 * @apiParam {String} account_id 账户id
 * @apiGroup Finance
 */
router.get('/account/finance',
  validate('query', Joi.object().keys({
    account_id: Joi.string().required()
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    let { account_id } = req.query
    const exist = await Model.Account.findOne({
      account_id: account_id
    })
    const finances = await Model.Finance.find({
      account_id: account_id
    })
    if (!exist) throw Errors.ClientError.badRequest('account_id不正确')
    res.send(finances)
  })
)

/**
 * @api {delete} /account/finance/:finance_id?account_id=account_id 取消理财
 * @apiParam {String} account_id 账户id
 * @apiGroup Finance
 */
router.delete('/account/finance/:finance_id',
  validate('query', Joi.object().keys({
    account_id: Joi.string().required()
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    let { finance_id } = req.params
    let { account_id } = req.query
    const account = await Model.Account.findOne({
      account_id: account_id
    })
    const finance = await Model.Finance.findOne({
      _id: finance_id
    })
    const balance = await Model.Account.update(
      { account_id: account_id },
      { balance: account.balance + finance.amount }
    )
    await Model.Record.create({
      remitter_id: account.account_id,
      record_time: new Date(),
      amount: finance.amount,
      operation_type: 'cancel_' + finance.product_type
    })
    await Model.Finance.remove({
      _id: finance_id
    })
    res.send(balance)
  })
)

module.exports = router
