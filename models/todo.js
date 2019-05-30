var mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Define the schema
module.exports = mongoose.model('Todo', {
  text: {
    type: String,
    default: ''
  }
})
