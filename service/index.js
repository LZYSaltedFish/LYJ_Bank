const JWT = require('./jwt')
module.exports = {
  JWT: new JWT(process.env.JWT_KEY, process.env.JWT_EXPIRES_IN)
}
