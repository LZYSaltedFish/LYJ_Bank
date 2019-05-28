console.info = function () {}
const app = require('../app')
const Routes = require('../routes')
const Model = require('../models')
const supertest = require('supertest')
const request = supertest(app)
// console.log(tokens)

module.exports = {
  request,
  Routes,
  Model
}
