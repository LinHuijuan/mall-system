var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

const User = require('../models/user.js')
router.post('/login', (req, res, next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          // 放在根路径下，而不是其他路径
          path: '/',
          // 单位：ms
          maxAge: 1000 * 60 * 10
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName,
            list: doc
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '用户名或密码错误'
        })
      }
    }
  })
})
module.exports = router
