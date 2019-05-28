const ENV_ENUM = ['development', 'production', 'test']
const env = process.env.NODE_ENV

const databse = require('./database')
const Errors = require('./errors')
if (ENV_ENUM.indexOf(env) < 0) {
  console.error('[Config]\t环境有误:\t', env)
  process.exit(1)
} else {
  console.info(`[Config]\t环境\t\t${env}`)
}

module.exports = {
  NODE_ENV: env,
  database: databse,
  Errors: Errors
}
