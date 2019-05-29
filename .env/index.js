const path = require('path')
const ENV_ENUM = ['development', 'production', 'test']
if (!process.env.NODE_ENV || ENV_ENUM.indexOf(process.env.NODE_ENV) < 0) {
  console.error(`[环境]\t\t有误\t\t${process.env.NODE_ENV}`)
  console.info(`[环境]\t\t应为\t\t${ENV_ENUM.join(',')}`)
  process.exit(1)
}

require('dotenv').config({ path: path.join('.', '.env', '.env.' + process.env.NODE_ENV) })
console.info(`[环境]\t\t${process.env.NODE_ENV}\t\t加载配置成功`)
