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
          <i class='cart-item-check el-icon-circle-check' v-show='item.checked' @click='checked'></i><i class='cart-item-check el-icon-circle-close' v-show='!itemChecked' @click='checked'></i>
          <img class='cart-item-pic' :src='`/static/${item.productImg}`'>
          <span class='cart-item-msg'>{{item.productName}}</span>
        </li>
        <li>￥{{item.productPrice}}</li>
        <li>
          <i class='el-icon-remove-outline'></i>
          <span class='cart-num'>{{item.productNum}}</span>
          <i class='el-icon-circle-plus-outline'></i>
        </li>
        <li>￥{{item.productPrice * item.productNum}}</li>
        <li><a href="javascript:;" @click="cartDelConfirm(item.productId)"><i class='el-icon-delete'></i></a></li>
      </ul>
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
    checked () {
      this.itemChecked = !this.itemChecked
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
      border: 2px solid #ccc;
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
      border: 2px solid #ccc;
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
