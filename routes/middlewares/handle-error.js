const { NODE_ENV } = require('../../global')

module.exports = async (err, req, res, next) => {
  console.warn('[Client Error]\t')
  // console.warn(err)
  if (err.isBoom && !err.isServer) {
    if (err.output.statusCode === 401) {
      err.data = {
        type: 'Unauthorized',
        suggest: 'debug'
      }
    }
    return res.status(err.output.statusCode).send({
      type: err.data.type,
      message: err.output.payload.message,
      suggest: err.data.suggest
    })
  }

  // 只在非生产环境下打印详细错误信息
  if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
  } else {
    console.error(err)
  }
  return res.status(500).send()
}
