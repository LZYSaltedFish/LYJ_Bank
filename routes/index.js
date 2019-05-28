const router = require('express').Router()
const todo = require('./todo')
const balance = require('./account')

router.get('/', (req, res) => { res.send('hello world') })

router.use('/', todo)
router.use('/', balance)

module.exports = router
