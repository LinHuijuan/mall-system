<template>
  <div class="order-step-wrap">
    <div class="step-bar">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写地址"></el-step>
        <el-step title="确认订单"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="完成订单"></el-step>
      </el-steps>
    </div>
    <Address v-show="stepShow(0)" :addressId='addressId' @click="getAddressId"></Address>
    <Confirm v-show="stepShow(1)" :orderConfirmList='orderConfirmList'  @click="next"></Confirm>
    <Payment v-show="stepShow(2)"></Payment>
    <Finish v-show="stepShow(3)"></Finish>
    <el-button style="margin-top: 12px;" @click="prev" v-show="!(active-1)">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next" v-show="active===0||active===2">下一步</el-button>
  </div>
</template>
<script>
import axios from 'axios'
import Address from './Address'
import Confirm from './Confirm'
import Payment from './Payment'
import Finish from './Finish'
export default {
  name: 'OrderSteps',
  data () {
    return {
      active: 0,
      addressId: '',
      orderConfirmList: ''
    }
  },
  components: {
    Address,
    Confirm,
    Payment,
    Finish
  },
  computed: {
    stepShow () {
      return (val) => {
        return this.active === val
      }
    }
  },
  methods: {
    prev () {
      this.active = this.active - 1
    },
    next () {
      if (this.active === 0) {
        let param1 = {
          addressId: this.addressId
        }
        axios.get('/orders/confirm', {params: param1}).then(res => {
          if (res.data.status === '0') {
            this.orderConfirmList = res.data.result
          }
        })
      }
      this.active++
    },
    getAddressId (val) {
      this.addressId = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .order-step-wrap{
    display: flex;
    flex-direction: column;
    margin: auto;
    background: #ECF5FF;
    padding: 2% 10%;
  }
</style>
<style lang="scss">
  .order-step-wrap{
    .el-step__head.is-success{
      color: #409eff;
      border-color: #409eff;
    }
    .el-step__title.is-success{
      color: #409eff;
    }
    .el-button+.el-button{
      margin-left: 0;
    }
  }
</style>
