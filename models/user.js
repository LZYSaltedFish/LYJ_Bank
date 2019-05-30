var mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Define the schema
module.exports = mongoose.model('User', {
  username: {
    type: String,
    unique: true
  }
})
