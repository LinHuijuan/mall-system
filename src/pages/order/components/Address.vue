<template>
  <div>
    <ul class="address-wrap">
      <li v-for="item in address" :key="item.addressId" :class='{active: item.isDefault}'>
        <div>收件人：{{item.addressName}}</div>
        <div>联系电话：{{item.tel}}</div>
        <div>邮政编码：{{item.postCode}}</div>
        <div>收件地址：{{item.stressName}}</div>
        <div class="address-foot">
          <span>{{item.isDefault ? '默认地址' : '常用地址'}}</span>
          <i class='el-icon-delete'></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Address',
  data () {
    return {
      address: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      axios.get('/orders/address').then(res => {
        if (res.data.status === '0') {
          this.address = res.data.result
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .address-wrap{
    display: flex;
    li {
      flex-flow: 1;
      width: 200px;
      list-style: none;
      border: 2px solid #ccc;
      border-radius: 6px;
      background: #fff;
      padding: 2% 3%;
      margin: 1%;
      .address-foot{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    li:hover, .active{
      border: 2px solid #409eff;
    }
  }
</style>
