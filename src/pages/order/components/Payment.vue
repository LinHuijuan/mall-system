<template>
  <div id='container'>支付</div>
</template>
<script>
import { regPayment } from './payment/init.js'

export default {
  name: 'Payment',
  mounted () {
    regPayment({
      container: document.getElementById('container')
    })
  }
}
</script>
<style lang='scss' scoped>
</style>
