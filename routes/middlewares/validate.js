const { ExpressAsyncCatch } = require('../../utils')
const { Errors } = require('../../global')
const Joi = require('@hapi/joi')
/**
 * @namespace Middleware
 * @name 校验 query 字段
 * @description 参数校验
 * 
 * @param {String=[header,body,query]} requestField 待验证字段所在区域
 * @param {Object} shcema 标准模型
 * @param {Object} options
 */
module.exports = (requestField, schema) => {
  return ExpressAsyncCatch(async (req, res, next) => {
    let validateResult = null
    if (requestField === 'header') {
      validateResult = Joi.validate(req.headers, schema)
    } else {
      validateResult = Joi.validate(req[requestField], schema)
      req[requestField] = validateResult.value
    }
    if (validateResult.error) {
      console.log(validateResult)
      throw Errors.ClientError.badRequest('参数不合规')
    }
    next()
  })
}
