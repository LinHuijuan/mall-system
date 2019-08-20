const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': [{
    'orderId': String,
    'orderTotal0': String,
    'orderStatus': String,
    'creatDate': String,
    'goodsList': []
  }],
  'cartList': [{
    'productId': String,
    'productName': String,
    'productPrice': Number,
    'productImg': String,
    'checked': Boolean,
    'productNum': Number
  }],
  'addressList': [{
    'addressId': String,
    'addressName': String,
    'stressName': String,
    'postCode': String,
    'tel': String,
    'isDefault': Boolean
  }]
})

module.exports = mongoose.model('User', userSchema)
