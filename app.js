require('./.env')
var express = require('express')
var app = express()
const path = require('path')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const { NODE_ENV, database } = require('./global')
const handleError = require('./routes/middlewares/handle-error')
// 连接数据库
mongoose.connect(database[NODE_ENV], {
  useMongoClient: true
})
// 添加mongoose对全局promise的依赖
mongoose.Promise = global.Promise

// 路由初始化
app.use('/bank', express.static('./bank'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended': 'true' }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride('X-HTTP-Method-Override'))
switch (NODE_ENV) {
  case 'production':
    app.use('/api', require('./routes'))
    app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))
    break
  case 'test':
    app.use('/api', require('./routes'))
    break
  case 'development':
    app.use('/api', require('./routes'))
    app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))
    break
  default:
}
app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))
// 错误捕获
app.use(handleError)

module.exports = app
