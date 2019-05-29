var mongoose = require('mongoose')

// Define the schema
module.exports = mongoose.model('User', {
  username: {
    type: String,
    unique: true
  }
})
