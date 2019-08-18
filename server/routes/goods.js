var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../modules/goods')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall')

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected',() => {
  console.log('MongoDB disconnected.')
})

router.get('/', (req, res, next) => {
  // 用来测试
  // res.send('hello,guli')
  Goods.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router
