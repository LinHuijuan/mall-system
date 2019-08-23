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

module.exports = router
