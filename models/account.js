var mongoose = require('mongoose')

// Define the schema
module.exports = mongoose.model('Account', {
  account_id: String,
  balance: {
    type: Number,
    default: 0
  }
})
