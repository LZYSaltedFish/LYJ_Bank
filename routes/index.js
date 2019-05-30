const router = require('express').Router()
const account = require('./account')
const deposit = require('./deposit')
const withdraw = require('./withdraw')
const transfer = require('./transfer')
const finance = require('./finance')
const user = require('./user')
const authenticate = require('./middlewares/authenticate')

// 无需认证的接口
router.get('/', (req, res) => { res.send('hello world') })
router.use('/', user)

// 以下接口都需要认证
router.use(authenticate)
router.use('/', account)
router.use('/', deposit)
router.use('/', withdraw)
router.use('/', transfer)
router.use('/', finance)

module.exports = router
