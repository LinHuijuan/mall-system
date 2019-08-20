var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall', {useNewUrlParser: true})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.')
})

// 查询商品列表数据
router.get('/', (req, res, next) => {
  // reg.param('XXX'):返回XXX参数的值,字符串类型
  // 页码
  let page = parseInt(req.query.page)
  // 每一页的文档条数
  let pageSize = parseInt(req.query.pageSize)
  // 排序的方式
  let sort = req.query.sort
  // 跳过的文档条数
  let skip = (page - 1) * pageSize
  let params = {}
  let priceIndex = req.query.priceIndex
  let priceGt, priceLte
  if (priceIndex !== 'all') {
    switch (priceIndex) {
      case '1': priceGt = 0; priceLte = 30; break
      case '2': priceGt = 30; priceLte = 50; break
      case '3': priceGt = 50; priceLte = 70; break
      case '4': priceGt = 70; priceLte = 100000; break
    }
    params = {
      productPrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  // 总的文档数
  let total
  Goods.find(params, (err, doc) => {
    if (err) {
      total = 0
    } else {
      total = doc.length
    }
  })
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
          total: total,
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 加入到购物车
module.exports = router.post('/addCart', (req, res, next) => {
  let userId = '00000000001'
  let productId = req.body.productId
  let User = require('../models/user')
  User.findOne({userId: userId}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        let hasAdd = false
        userDoc.cartList.forEach((item) => {
          if (item.productId === productId) {
            hasAdd = true
            item.productNum++
          }
        })
        if (hasAdd) {
          userDoc.save((err3, doc3) => {
            if (err3) {
              res.json({
                status: '1',
                msg: err3.message
              })
            } else {
              res.json({
                status: '0',
                msg: 'suc',
                result: userDoc
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, (err1, doc) => {
            if (err1) {
              res.json({
                status: '1',
                msg: err1.message
              })
            } else {
              if (doc) {
                doc.productNum = 1
                doc.checked = true
                doc.save()
                userDoc.cartList.push(doc)
                userDoc.save((err2, doc2) => {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: 'suc',
                      result: doc
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})
