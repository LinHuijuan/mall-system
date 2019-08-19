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
  // reg.param('XXX'):返回XXX参数的值,字符串类型
  // 页码
  let page = parseInt(req.param('page'))
  // 每一页的文档条数
  let pageSize = parseInt(req.param('pageSize'))
  // 排序的方式
  let sort = req.param('sort')
  // 跳过的文档条数
  let skip = (page - 1) * pageSize
  let params = {}
  // limit(num)限定取出的文档条数
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  // 针对某个字段排序，1表示升序，-1表示降序
  goodsModel.sort({'productPrice': sort})
  // exec(callback)
  goodsModel.exec((err, doc) => {
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
