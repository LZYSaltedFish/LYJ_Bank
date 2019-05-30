var mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Define the schema
module.exports = mongoose.model('Account', {
  username: {
    type: String,
    required: true
  },
  account_id: {
    type: String,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  }
})
