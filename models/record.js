var mongoose = require('mongoose')

// Define the schema
module.exports = mongoose.model('Record', {
  remitter_id: String,
  recipient_id: String,
  record_time: Date,
  amount: Number,
  operation_type: String
})
