<template>
  <div class="cart-wrap">
      <ul class='cart-header'>
        <li class="header-goods">商品</li>
        <li>单价</li>
        <li>数量</li>
        <li>总价</li>
        <li>删除</li>
      </ul>
      <ul class='cart-items' v-for='item in cartList' :key='item.id'>
        <li class="items-goods">
          <i class='cart-item-check el-icon-circle-check' v-show='item.checked' @click="editCart('',item)"></i>
          <i class='cart-item-check el-icon-circle-close' v-show='!item.checked' @click="editCart('',item)"></i>
          <img class='cart-item-pic' :src='`/static/${item.productImg}`'>
          <span class='cart-item-msg'>{{item.productName}}</span>
        </li>
        <li>{{item.productPrice | currency('￥')}}</li>
        <li>
          <i class='el-icon-remove-outline' @click="editCart('sub',item)"></i>
          <span class='cart-num'>{{item.productNum}}</span>
          <i class='el-icon-circle-plus-outline' @click="editCart('add',item)"></i>
        </li>
        <li>{{item.productPrice * item.productNum | currency('￥')}}</li>
        <li><a href="javascript:;" @click="cartDelConfirm(item.productId)"><i class='el-icon-delete'></i></a></li>
      </ul>
      <div class="cart-footer">
        <div class="cart-footer-left">
          <a href="javascript:;" class="cart-check" @click='checkAll'>{{isCheckAll ? '取消全选' : '全选'}}</a>
        </div>
        <div class="cart-fppter-right">
          <span class="cart-price">总价：{{totalPrice | currency('￥')}}</span>
          <el-button type="primary" plain>购买</el-button>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Cart',
  data () {
    return {
      itemChecked: true,
      cartList: [],
      productDelId: ''
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    isCheckAll () {
      let i = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          i++
        }
      })
      if (i === this.cartList.length) {
        return true
      } else {
        return false
      }
    },
    totalPrice () {
      let price = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          price += item.productNum * item.productPrice
        }
      })
      return price
    }
  },
  methods: {
    init () {
      axios.get('/users/cartList').then(response => {
        let res = response.data
        if (res.status === '0') {
          this.cartList = res.result
        } else if (res.status === '10001') {
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    cartDelConfirm (productId) {
      this.$confirm('请确认是否将商品移除购物车', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.productDelId = productId
        this.cartDel()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    cartDel () {
      axios.post('/users/cartDel', {
        productId: this.productDelId
      }).then(res => {
        if (res.data.status === '0') {
          this.init()
        }
      })
    },
    editCart (flag, item) {
      if (flag === 'sub') {
        if (item.productNum > 1) {
          item.productNum--
        } else {
          this.$message({
            type: 'info',
            message: '商品数量最低为1'
          })
        }
      } else if (flag === 'add') {
        item.productNum++
      } else {
        item.checked = !item.checked
      }
      axios.post('/users/editCart', {
        productId: item.productId,
        productNum: item.productNum,
        checked: item.checked
      }).then(res => {
        if (res.data.status === '0') {}
      })
    },
    checkAll () {
      let cartCheckAll = !this.isCheckAll
      axios.post('/users/cartCheckAll', {
        checked: cartCheckAll
      }).then(res => {
        if (res.data.status === '0') {
          this.init()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .cart-wrap{
    padding: 1% 5%;
    background: #ECF5FF;
    .cart-header{
      display: flex;
      justify-content: space-between;
      height: 30px;
      line-height: 30px;
      padding: 0;
      margin: 0;
      border: 2px solid #b3d8ff;
      background: #c8e3ff;
      li{
        flex: 1 0 17.5%;
        list-style: none;
        text-align: center;
      }
      .header-goods{
        flex-basis: 30%;
      }
    }
    .cart-items{
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin: 0;
      border: 2px solid #b3d8ff;
      border-top: 0;
      background: #fff;
      li{
        flex: 1 0 17.5%;
        list-style: none;
        text-align: center;
        height: 100px;
        line-height: 100px;
        a{
          color: #ccc;
        }
      }
      .items-goods{
        flex-basis: 30%;
        display: flex;
        align-items: center;
        .cart-item-pic{
          width: 100px;
          margin-right: 10px;
        }
        .cart-item-check{
          flex-basis: 30%;
        }
      }
    }
    .cart-footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      margin-top: 10px;
      padding-left: 4%;
      border-radius: 10px;
      a{
        text-decoration: none;
        color: #000;
      }
      a:hover{
        color: #3a8cde;
      }
      .cart-price{
        padding: 0 10px;
      }
    }
  }
</style>
<style lang="scss">
  .el-icon-circle-check, .el-icon-circle-close, .el-icon-remove-outline, .el-icon-circle-plus-outline, .el-icon-delete{
    font-size: 20px;
    transition: 0.5s;
  }
  a:hover{
    .el-icon-delete{
      font-size: 22px;
      color: #3a8cde;
      transition: 1s;
    }
  }
</style>
