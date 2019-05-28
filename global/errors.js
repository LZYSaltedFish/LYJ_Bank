/**
 * Bad Request 400:the server could not understand the request due to invalid syntax.
 * Unauthorized 401: request has not been applied because it lacks valid authentication credentials for the target resource
 * Forbidden 403: server understood the request but refuses to authorize it.
 * Confict 409: uploading a file which is older than the one already on the server resulting in a version control conflict.
 */

const Boom = require('@hapi/boom')
const SuggesstAction = {
  retry: 'retry',
  hint: 'hint',
  warn: 'warn',
  debug: 'debug'
}

const ClientError = {
  badRequest: (title, error) => Boom.badRequest(title || '语法错误', {
    type: 'badRequest',
    suggest: SuggesstAction.debug,
    error
  }),
  unauthorized: (title, error) => Boom.unauthorized(title || '未认证', {
    type: 'unauthorized',
    suggest: SuggesstAction.debug,
    error
  }),
  forbidden: (title, error) => Boom.forbidden(title || '拒绝授权', {
    type: 'forbidden',
    suggest: SuggesstAction.debug,
    error
  }),
  conflict: (title, error) => Boom.conflict(title || '冲突', {
    type: 'conflict',
    suggest: SuggesstAction.debug,
    error
  })
}


const InternalError = {
  enumError: (error) => Boom.internal('枚举出错', {
    type: 'internal',
    suggest: SuggesstAction.debug,
    error
  }),
  databaseError: (title, error) => Boom.internal(title || '数据库错误', {
    type: 'internal',
    suggest: SuggesstAction.debug,
    error
  }),
  redisError: (error) => Boom.internal('Redis错误', {
    type: 'internal',
    suggest: SuggesstAction.debug,
    error
  }),
  frameworkError: (msg) => Boom.internal(`框架使用错误: ${msg}`, {
    type: 'internal',
    suggest: SuggesstAction.debug
  }),
  unknownError: (error) => Boom.internal('未知错误', {
    type: 'internal',
    suggest: SuggesstAction.debug,
    error
  }),
  customError: (title, error) => Boom.internal(title, {
    type: 'internal',
    suggest: SuggesstAction.debug,
    error
  })
}

const ServiceError = {
  databaseError: (error) => Boom.serverUnavailable('数据库出错', {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.debug,
    error
  }),
  wechatServerError: (error) => Boom.serverUnavailable('微信服务器', {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.retry,
    error
  }),
  templateMessageError: (error) => Boom.serverUnavailable('微信模板消息出错', {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.retry,
    error
  }),
  aiImageError: (error) => Boom.serverUnavailable('微信 AI 图片处理服务出错了', {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.debug,
    error
  }),
  smsError: (error) => Boom.serverUnavailable('短信服务出错', {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.debug,
    error
  }),
  cosError: (error) => Boom.serverUnavailable('COS 服务出错', {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.debug,
    error
  }),
  customError: (title, error) => Boom.internal(title, {
    type: 'serviceUnavailable',
    suggest: SuggesstAction.debug,
    error
  })
}

const ParameterError = {
  illegal: (title, error) => Boom.badData(title || '参数不合规', {
    type: 'illegal',
    suggest: SuggesstAction.debug,
    error
  })
}


module.exports = {
  ClientError,
  InternalError,
  ServiceError,
  ParameterError
}
