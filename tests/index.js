console.info = function () {}
const app = require('../app')
const Routes = require('../routes')
const Model = require('../models')
const supertest = require('supertest')
const request = supertest(app)
const Service = require('../service')
// console.log(tokens)

const tokens = {
  user_a: {
    'Authorization': 'Bearer ' + Service.JWT.sign({ username: '23333' })
  },
  user_b: {
    'Authorization': 'Bearer ' + Service.JWT.sign({ username: '66666' })
  }
}

module.exports = {
  request,
  Routes,
  tokens,
  Model
}
