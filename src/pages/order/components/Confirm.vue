<template>
  <div class="confirm-wrap">
    <ul class='confirm-cart-header'>
      <li class="goods">商品</li>
      <li>单价</li>
      <li>数量</li>
      <li>总价</li>
    </ul>
    <ul class="cart-wrap" v-for="item in cartList" :key="item.productId">
      <li class="goods">
        <img class='item-pic' :src='`/static/${item.productImg}`'>
        <span class='item-msg'>{{item.productName}}</span>
      </li>
      <li>{{item.productPrice | currency('￥')}}</li>
      <li>{{item.productNum}}</li>
      <li>{{item.productPrice * item.productNum | currency('￥')}}</li>
    </ul>
    <ul class="confirm-footer">
      <li>总价：{{totalPrice | currency('￥')}}</li>
      <li>优惠：{{discounts | currency('￥')}}</li>
      <li>运费险：{{insurance | currency('￥')}}</li>
      <li>配送费：{{shippingFee | currency('￥')}}</li>
      <li>实付金额：{{(totalPrice - discounts + insurance + shippingFee) | currency('￥')}}</li>
      <el-button @click="pay">支付</el-button>
    </ul>
    <!-- <ul>
      <li>收件人：{{addressList.addressName}}</li>
      <li>联系电话：{{addressList.tel}}</li>
      <li>收件地址：{{addressList.stressName}}</li>
    </ul> -->
  </div>
</template>
<script>
export default {
  name: 'Confirm',
  props: ['orderConfirmList'],
  data () {
    return {
      discounts: 1,
      insurance: 2,
      shippingFee: 3
    }
  },
  computed: {
    cartList () {
      return this.orderConfirmList.slice(1)
    },
    totalPrice () {
      let price = 0
      Array.prototype.forEach.call(this.cartList, item => {
        price += item.productPrice * item.productNum
      })
      return price
    }
    // addressList () {
    //   // console.log(JSON.stringify(this.orderConfirmList[0]))
    //   return JSON.parse(JSON.stringify(this.orderConfirmList[0]))
    // }
  },
  methods: {
    pay () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
  .confirm-wrap{
    display: flex;
    flex-direction: column;
    padding: 1% 5%;
    background: #fff;
    .confirm-cart-header{
      display: flex;
      justify-content: space-between;
      height: 30px;
      line-height: 30px;
      padding: 0;
      margin: 0;
      border: 2px solid #bdd7f3;
      background: #b9cbe4;
      li{
        flex: 1 0 24%;
        list-style: none;
        text-align: center;
      }
      .goods{
        flex-basis: 28%;
      }
    }
    .cart-wrap{
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin: 0;
      border: 2px solid #bdd7f3;
      border-top: 0;
      background: #fff;
      li{
        flex: 1 0 24%;
        list-style: none;
        text-align: center;
        height: 100px;
        line-height: 100px;
        a{
          color: #ccc;
        }
      }
      .goods{
        flex-basis: 28%;
        display: flex;
        align-items: center;
        justify-content: center;
        .item-pic{
          width: 100px;
          margin-right: 10px;
        }
      }
    }
    .confirm-footer{
      align-self: flex-end;
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
</style>
