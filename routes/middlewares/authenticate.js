const { Errors } = require('../../global')
const { ExpressAsyncCatch } = require('../../utils')
const { JWT } = require('../../service')
const jwt = JWT.jwt
/**
 * @module middleware
 * @description 对请求进行鉴权，并写入 username 到 req.ids
 * 
 */
module.exports = ExpressAsyncCatch(async (req, res, next) => {
// 检查存在
  const authorization = req.get('Authorization') || req.get('authorization')
  if (!authorization) throw Errors.ClientError.unauthorized('缺少登录凭证')

  // 校验格式
  const [bearer, token] = authorization.split(' ')
  if (!bearer || token.length <= 0) throw Errors.ClientError.unauthorized('登录凭证格式有误')

  try {
    const user = JWT.verify(token)
    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.NotBeforeError) throw Errors.ClientError.unauthorized('登录凭证已过期')
    if (error instanceof jwt.JsonWebTokenError) throw Errors.ClientError.unauthorized('登录凭证无效')

    throw Errors.InternalError.unknownError(error)
  }
})
