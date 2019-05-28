var express = require('express')
var app = express()
const path = require('path')
var mongoose = require('mongoose')
var database = require('./config/database')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')


mongoose.connect(database.localUrl)

app.use(express.static('./public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended': 'true' }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride('X-HTTP-Method-Override'))

// 加载路由
app.use('/api', require('./app/routes'))
app.use('/doc', express.static(path.resolve(__dirname, 'docs', 'api')))

module.exports = app
