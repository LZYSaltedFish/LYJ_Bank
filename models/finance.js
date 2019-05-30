var mongoose = require('mongoose')

// Define the schema
module.exports = mongoose.model('Finance', {
  account_id: String,
  buy_time: Date,
  amount: Number,
  product_type: String,
  term: Number
})
