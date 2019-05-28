const { NODE_ENV } = require('../../config')

module.exports = async (err, req, res, next) => {
  console.warn('[Client Error]\t')
  console.error(err)
  return res.status(500).send()
}
