<template>
  <div class="order-step-wrap">
    <div class="step-bar"><el-steps :active="active" finish-status="success"  align-center>
      <el-step title="填写地址"></el-step>
      <el-step title="确认订单"></el-step>
      <el-step title="支付"></el-step>
      <el-step title="完成订单"></el-step>
    </el-steps></div>
    <Address v-show="stepShow(0)"></Address>
    <Confirm v-show="stepShow(1)"></Confirm>
    <Payment v-show="stepShow(2)"></Payment>
    <Finish v-show="stepShow(3)"></Finish>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>
<script>
import Address from './Address'
import Confirm from './Confirm'
import Payment from './Payment'
import Finish from './Finish'
export default {
  name: 'OrderSteps',
  data () {
    return {
      active: 0
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
    next () {
      if (this.active++ > 3) this.active = 0
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
  }
</style>
