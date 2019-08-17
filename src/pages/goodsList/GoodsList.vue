<template>
  <div>
    <home-header></home-header>
    <breadcrumb></breadcrumb>
    <goods></goods>
    <home-footer></home-footer>
  </div>
</template>
<script>
import HomeHeader from '@/common/Header'
import HomeFooter from '@/common/Footer'
import Breadcrumb from '@/common/Breadcrumb'
import Goods from './components/Goods'
export default {
  name: 'GoodsList',
  data () {
    return {}
  },
  components: {
    HomeHeader,
    HomeFooter,
    Breadcrumb,
    Goods
  }
}
</script>
