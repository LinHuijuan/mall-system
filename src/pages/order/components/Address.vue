<template>
  <div>
    <ul class="address-wrap">
      <li v-for="item in address" :key="item.addressId" :class='{active: item.addressId === AddressId}' @click="getAddress(item.addressId)">
        <div>收件人：{{item.addressName}}</div>
        <div>联系电话：{{item.tel}}</div>
        <div>邮政编码：{{item.postCode}}</div>
        <div>收件地址：{{item.stressName}}</div>
        <div class="address-foot">
          <span :class="{common: !item.isDefault}" @click="setDefault(item.addressId)">
            {{item.isDefault ? '默认地址' : '设为默认地址'}}
          </span>
          <i class='el-icon-delete'></i>
        </div>
      </li>
      <li class="address-plus">+</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Address',
  props: ['addressId'],
  data () {
    return {
      address: [],
      AddressId: this.addressId
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
    },
    setDefault (val) {
      axios.post('/orders/addressDefault', {
        addressId: val
      }).then(res => {
        if (res.data.status === '0') {
          this.init()
        }
      })
    },
    getAddress (val) {
      this.AddressId = val
      this.$emit('click', val)
    }
  }
}
</script>
<style lang="scss" scoped>
  .address-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      flex-flow: 1;
      width: 200px;
      height: 100px;
      list-style: none;
      border: 2px solid #ccc;
      border-radius: 6px;
      background: #fff;
      padding: 2% 3%;
      margin-bottom: 4px;
      .address-foot{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #1989fa;
        .common{
          opacity: 0;
        }
      }
    }
    li:hover, .active{
      border: 2px solid #1989fa;
    }
    li:hover{
      .common{
        opacity: 1;
        transition: 0.5s;
      }
    }
    .address-plus{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 100px;
      color: #ccc;
      border: 2px dashed #ccc;
    }
    .address-plus:hover{
      border: 2px solid #ccc;
    }
  }
</style>
