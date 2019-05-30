var mongoose = require('mongoose')
mongoose.Promise = global.Promise

// 记录不同理财产品利率的静态表
module.exports = mongoose.model('Product_Info', {
  product_type: String,
  term: Number,
  interest: Number
})
