const jwt = require('jsonwebtoken')

class JsonWebToken {
  constructor (SECRET_KEY, EXPIRES_IN) {
    this.SECRET_KEY = SECRET_KEY
    this.EXPIRES_IN = EXPIRES_IN
    this.jwt = jwt
  }
  /**
   * @module JsonWebToken
   * @description 使用密钥对传入参数进行签名， 注意 expiredsIn 以毫秒为单位
   * 
   * @param {*} obj 待存储对象
   */
  sign (obj) {
    return jwt.sign(obj, this.SECRET_KEY, {
      expiresIn: this.EXPIRES_IN
    })
  }

  /**
   * @module JsonWebToken
   * @description 对 Token 进行校验
   * 
   * @param {*} token
   */
  verify (token) {
    return jwt.verify(token, this.SECRET_KEY)
  }
}

module.exports = JsonWebToken
