<template>
  <div>
    <home-header></home-header>
    <breadcrumb></breadcrumb>
    <order-steps></order-steps>
    <home-footer></home-footer>
  </div>
</template>
<script>
import HomeHeader from '@/common/Header'
import HomeFooter from '@/common/Footer'
import Breadcrumb from '@/common/Breadcrumb'
import OrderSteps from './components/OrderSteps'
export default {
  name: 'Order',
  components: {
    HomeHeader,
    HomeFooter,
    Breadcrumb,
    OrderSteps
  }
}
</script>
