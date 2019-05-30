const router = require('express').Router()
const Joi = require('@hapi/joi')
const { Errors } = require('../global')
const { ExpressAsyncCatch } = require('../utils')
const validate = require('./middlewares/validate')
const Service = require('../service')
const Model = require('../models')

/**
 * 
 * @api {post} /login 用户登录
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiGroup User
 * @apiUse User
 */
router.post('/login',
  validate('body', Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    const { username, password } = req.body
    let user = await Model.User.findOne({
      username: username,
      password: password
    })
    if (!user) throw Errors.ClientError.badRequest('用户名或密码错误')
    // 删除password字段 防止信息泄露
    user = user.toJSON()
    delete user.password
    const token = Service.JWT.sign(user)
    res.set('Authorization', 'Bearer ' + token)
    res.send(user)
  })
)

/**
 * @api {post} /register 用户注册
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiGroup User
 * @apiUse User
 */
router.post('/register',
  validate('body', Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().min(6)
  })),
  ExpressAsyncCatch(async (req, res, next) => {
    const { username, password } = req.body
    const exists = await Model.User.findOne({
      username: username
    })
    if (exists) throw Errors.ClientError.conflict('该用户名已存在')
    const user = await Model.User.create({
      username,
      password
    })
    res.send(user)
  })
)

module.exports = router
