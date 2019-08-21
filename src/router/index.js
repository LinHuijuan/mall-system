import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/pages/goodsList/GoodsList'
import CartList from '@/pages/CartList/CartList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'CartList',
      component: CartList
    }
  ]
})
