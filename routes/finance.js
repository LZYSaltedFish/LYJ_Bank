var Model = require('../models')
const router = require('express').Router()
const { ExpressAsyncCatch } = require('../utils')
const { validate, checkAccount } = require('./middlewares')
const { Errors } = require('../global')
const Joi = require('@hapi/joi')
/**
 * @api {put} /account/finance 购买理财
 * @apiParam {String} account_id 账户id
 * @apiParam {Number} amount 购买金额
 * @apiParam {String} product_type 产品类型：国债/定期
 * @apiParam {Number} term 时长
 * @apiGroup Finance
 * @apiSuccessExample 购买理财成功
 * {
 *    __v: 0    //MongoDB自己的东西，没用的
 *    account_id: 'account3',
 *    buy_time: 2019-05-30T15:26:01.288Z,
 *    amount: 40,
 *    product_type: 'Fixed_Term',
 *    term: 4,
 *    _id: 5ceff609c110fa1c802ae256   //理财产品在数据库中的id
 *    estimated_money: 43.462817433   //预计到期时的本金＋利息
 * }
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
  checkAccount('body'),
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
      var estimated_money = account_finance.amount * Math.pow((interest.interest + 1), account_finance.term)
      res.send(account_finance + estimated_money)
    }
  })
)

/**
 * @api {get} /account/finance?account_id=account_id 查询理财
 * @apiParam {String} account_id 账户id
 * @apiGroup Finance
 * @apiUse Finance
 * @apiSuccessExample all_products_info
 * {
 *    _id: 5cefa2c6f1360f23d8a64da0,   //理财产品id，在取消理财的时候用这个id
 *    account_id: 'account3',
 *    buy_time: 2019-05-30T09:30:46.303Z,
 *    amount: 40,
 *    product_type: 'Fixed_Term',
 *    term: 4,
 *    __v: 0    //和上面那个一样，没用的
 * }
 * @apiErrorExample account_not_found
 * {
 *    errcode: 3,   //errcode 为非零值
 *    errmsg: '收款账号不存在'
 * }
 */
router.get('/account/finance',
  validate('query', Joi.object().keys({
    account_id: Joi.string().required()
  })),
  checkAccount('query'),
  ExpressAsyncCatch(async (req, res, next) => {
    let { account_id } = req.query
    const exist = await Model.Account.findOne({
      account_id: account_id
    })
    const finances = await Model.Finance.find({
      account_id: account_id
    })
    if (!exist) {
      res.send({
        errcode: 3,
        errmsg: '收款账号不存在'
      })
    }
    res.send(finances)
  })
)

/**
 * @api {delete} /account/finance/:finance_id?account_id=account_id 取消理财
 * @apiParam {String} account_id 账户id
 * @apiGroup Finance
 * @apiSuccessExample balance_after_cancel
 * {
 *    account_id: 'account3',
 *    balance: 500    //取消理财后的余额
 * }
 */
router.delete('/account/finance/:finance_id',
  validate('query', Joi.object().keys({
    account_id: Joi.string().required()
  })),
  checkAccount('query'),
  ExpressAsyncCatch(async (req, res, next) => {
    let { finance_id } = req.params
    let { account_id } = req.query
    const account = await Model.Account.findOne({
      account_id: account_id
    })
    console.log('取消前的余额' + account.balance)
    const finance = await Model.Finance.findOne({
      _id: finance_id
    })
    await Model.Account.update(
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
    const balance = await Model.Account.findOne({
      account_id: account_id
    })
    res.send(balance)
  })
)

module.exports = router
