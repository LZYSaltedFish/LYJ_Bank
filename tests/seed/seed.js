const seed = require('./index')
const mongoose = require('mongoose')
const { NODE_ENV, database } = require('../../global')
mongoose.connect(database[NODE_ENV], {
  useMongoClient: true
})
// 添加mongoose对全局promise的依赖
mongoose.Promise = global.Promise
seed().then(() => {
  console.info('[模拟数据]\t插入成功')
})
