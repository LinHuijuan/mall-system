var express = require('express')
var router = express.Router()

var User = require('../models/user.js')

// 登录
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
          maxAge: 1000 * 60 * 60
        })
        res.cookie('userName', doc.userName, {
          // 放在根路径下，而不是其他路径
          path: '/',
          // 单位：ms
          maxAge: 1000 * 60 * 60
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

// 登出
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    // 让cookie无效
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 校验
router.get('/checklogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: {
        userName: req.cookies.userName
      }
    })
  } else {
    next()
  }
})

// 获取购物车数据
router.get('/cartlist', (req, res, next) => {
  if (!req.cookies.userId) {
    next()
  } else {
    let params = {
      userId: req.cookies.userId
    }
    User.findOne(params, (err, doc) => {
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
            result: doc.cartList
          })
        } else {
          res.json({
            status: '1',
            msg: '当前购物车为空',
            result: ''
          })
        }
      }
    })
  }
})

// 删除购物车商品
router.post('/cartDel', (req, res, next) => {
  let userId = req.cookies.userId
  let productId = req.body.productId
  // model.update(查询条件,更新对象,callback)
  User.update({
    userId: userId
  }, {
    // $pull:删除指定数据
    $pull: {
      'cartList': {
        productId: productId
      }
    }
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: doc
      })
    }
  })
})

// 修改商品数量
router.post('/editCart', (req, res, next) => {
  let userId = req.cookies.userId
  let productId = req.body.productId
  let productNum = req.body.productNum
  let checked = req.body.checked
  User.update({
    'userId': userId,
    'cartList.productId': productId
  }, {
    // 更新子文档  $：代表数组的下标
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: doc
      })
    }
  })
})

// 购物车全选与取消全选
router.post('/cartCheckAll', (req, res, next) => {
  let userId = req.cookies.userId
  let checked = req.body.checked
  User.findOne({userId: userId}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        userDoc.cartList.forEach(item => {
          item.checked = checked
        })
        userDoc.save(err, doc => {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: 'suc',
              result: userDoc
            })
          }
        })
      }
    }
  })
})

module.exports = router
