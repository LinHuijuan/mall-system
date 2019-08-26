var express = require('express')
var router = express.Router()

var User = require('../models/user.js')

// 获取地址
router.get('/address', (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.addressList
        })
      } else {
        res.json({
          status: '1',
          msg: '地址列表为空',
          result: ''
        })
      }
    }
  })
})

// 修改默认地址
router.post('/addressDefault', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  User.findOne({'userId': userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.meaasge,
        result: ''
      })
    } else {
      if (doc) {
        doc.addressList.forEach(item => {
          if (item.addressId !== addressId) {
            item.isDefault = false
          } else {
            item.isDefault = true
          }
        })
        doc.save(err, doc => {
          if (err) {
            res.json({
              status: '1',
              msg: err.meaasge,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    }
  })
})

// 获取购买订单
router.get('/confirm', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.query.addressId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.meaasge,
        result: ''
      })
    } else {
      if (doc) {
        let orderConfirmList = []
        for (let item of doc.addressList) {
          if (item.addressId === addressId) {
            orderConfirmList.push(item)
            break
          }
        }
        doc.cartList.filter(item => {
          if (item.checked) {
            orderConfirmList.push(item)
          }
        })
        res.json({
          status: '0',
          msg: '',
          result: orderConfirmList
        })
      }
    }
  })
})
module.exports = router
