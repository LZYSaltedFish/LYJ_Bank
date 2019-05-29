const router = require('express').Router()
const Joi = require('@hapi/joi')
const { ExpressAsyncCatch } = require('../utils')
const validate = require('./middlewares/validate')
const Service = require('../service')
const Model = require('../models')

/**
 * 
 * @api {post} /login 用户登录
 * @apiGroup Authenticate
 * @apiParam  {string} username 用户名
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

module.exports = router
