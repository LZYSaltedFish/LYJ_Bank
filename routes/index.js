const router = require('express').Router()
const todo = require('./todo')
const account = require('./account')
const user = require('./user')
const authenticate = require('./middlewares/authenticate')

// 无需认证的接口
router.get('/', (req, res) => { res.send('hello world') })
router.use('/', user)

// 以下接口都需要认证
router.use(authenticate)
router.use('/', todo)
router.use('/', account)

module.exports = router
