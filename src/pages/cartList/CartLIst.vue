<template>
  <div>
    <home-header></home-header>
    <breadcrumb></breadcrumb>
    <cart></cart>
    <home-footer></home-footer>
  </div>
</template>
<script>
import HomeHeader from '@/common/Header'
import HomeFooter from '@/common/Footer'
import Breadcrumb from '@/common/Breadcrumb'
import Cart from './components/Cart'
export default {
  name: 'CartList',
  components: {
    HomeHeader,
    HomeFooter,
    Breadcrumb,
    Cart
  }
}
</script>
<style lang='scss' scoped>

</style>
