const router = require('express').Router()
const todo = require('./todo')
const path = require('path')


// 托管静态网页
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../bank/html/index.html'))
})

router.use('/api', todo)

module.exports = router
