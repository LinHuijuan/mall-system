<template>
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">Sort by:</span>
        <a href="javascript:void(0)" class="default cur">Default</a>
        <a href="javascript:void(0)" class="price">Price</a>
        <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
      </div>
      <div class="goods-wrap">
        <!-- filter -->
        <div class="price-filter">
          <dl>
            <dt>Price:</dt>
            <dd><a href="javascript:void(0)">All</a></dd>
            <dd><a href="javascript:void(0)">0 - 30</a></dd>
            <dd><a href="javascript:void(0)">30 - 50</a></dd>
            <dd><a href="javascript:void(0)">50 - 70</a></dd>
            <dd><a href="javascript:void(0)">70 以上</a></dd>
          </dl>
        </div>
        <!-- search result accessories list -->
        <ul class="goods-list">
          <li v-for='item in goodsList' :key='item.productId'>
            <div class="goods-pic">
              <a href="#">
                <el-image :src='`/static/${item.productImg}`' lazy>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image></a>
            </div>
            <div class="goods-msg">
              <div class="name">{{item.productName}}</div>
              <div class="price">{{item.productPrice}}</div>
              <el-button>加入购物车</el-button>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Goods',
  data () {
    return {
      goodsList: []
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      axios.get('/goods').then((res) => {
        var data = res.data
        this.goodsList = data.result.list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    background:#ECF5FF;
    display: flex;
    flex-direction: column;
    align-content: center;
  }
    .filter-nav{
      width: 96%;
      height: 50px;
      line-height: 50px;
      margin: 1%;
      border-radius: 20px;
      background: #fff;
      text-align: end;
      padding-right: 2%;
    }
      a{
        text-decoration: none;
        color: #000;
      }
    .goods-wrap{
      display: flex;
      margin: 1%;
    }
      .price-filter{
        font-size: 20px;
        flex-basis: 150px;
        flex-shrink: 0;
      }
        a{
          text-decoration: none;
          color: #000;
        }
      .goods-list{
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
      }
        li{
          list-style: none;
          background: #FFF;
          text-align: center;
          margin-right: 20px;
          margin-bottom: 10px;
          flex-grow: 1;
        }
          .goods-pic /deep/ .el-image{
            width: 210px;
          }
          .goods-msg /deep/ .el-button{
            width: 98%;
            color: #1989fa;
          }
</style>
