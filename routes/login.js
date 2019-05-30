const router = require('express').Router()
const Joi = require('@hapi/joi')
const { ExpressAsyncCatch } = require('../utils')
const validate = require('./middlewares/validate')
const Service = require('../service')
const Model = require('../models')

/**
 * 
 * @api {post} /login 用户登录
 * @apiParam  {string} username 用户名
 * @apiGroup Authenticate
 * @apiUse User
 */
router.post('/login',
  validate('body', Joi.object().keys({
    username: Joi.string().required()
  })),
  ExpressAsyncCatch(async (req, res) => {
    const { username } = req.body
    const user = await Model.User.findOne({
      username: username
    })
    const token = Service.JWT.sign(user)
    res.set('Authorization', 'Bearer ' + token)
    res.send(user)
  })
)

/**
 * @api {get} /users 用户列表
 * @apiGroup User
 * @apiUse User
 */
router.get('/users',
  ExpressAsyncCatch(async (req, res, next) => {
    const users = await Model.User.find()
    res.send(users)
  })
)

module.exports = router
