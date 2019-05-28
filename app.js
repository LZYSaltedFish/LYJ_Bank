var express = require('express')
var app = express()
const path = require('path')
var mongoose = require('mongoose')
var database = require('./config/database')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const { NODE_ENV } = require('./config')

// 连接数据库
mongoose.connect(database[NODE_ENV])

// 路由初始化
app.use('/bank', express.static('./bank'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended': 'true' }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride('X-HTTP-Method-Override'))
switch (NODE_ENV) {
  case 'production':
    app.use('/', require('./app/routes'))
    app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))
    break
  case 'test':
    app.use('/api', require('./app/routes'))
    break
  case 'development':
    app.use('/api', require('./app/routes'))
    app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))
    break
  default:
}
app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))

module.exports = app
