const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  'productId': String,
  'productName': String,
  'prodcutPrice': Number,
  'prodcutImg': String,
  'productNum': Number,
  'checked': Boolean
})
module.exports = mongoose.model('Good', productSchema)
