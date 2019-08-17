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
            <dd><a href="javascript:void(0)">0 - 100</a></dd>
            <dd><a href="javascript:void(0)">100 - 500</a></dd>
            <dd><a href="javascript:void(0)">500 - 1000</a></dd>
            <dd><a href="javascript:void(0)">1000 - 2000</a></dd>
          </dl>
        </div>
        <!-- search result accessories list -->
        <ul class="goods-list">
          <li>
            <div class="goods-pic">
              <a href="#"><img src="static/1.jpg" alt /></a>
            </div>
            <div class="goods-msg">
              <div class="name">XX</div>
              <div class="price">999</div>
              <el-button>加入购物车</el-button>
            </div>
          </li>
          <li>
            <div class="goods-pic">
              <a href="#">
                <img src="static/2.jpg" alt />
              </a>
            </div>
            <div class="goods-msg">
              <div class="name">XX</div>
              <div class="price">1000</div>
              <el-button>加入购物车</el-button>
            </div>
          </li>
          <li>
            <div class="goods-pic">
              <a href="#">
                <img src="static/3.jpg" alt />
              </a>
            </div>
            <div class="goods-msg">
              <div class="name">XX</div>
              <div class="price">500</div>
              <el-button>加入购物车</el-button>
            </div>
          </li>
          <li>
            <div class="goods-pic">
              <a href="#">
                <img src="static/3.jpg" alt />
              </a>
            </div>
            <div class="goods-msg">
              <div class="name">XX</div>
              <div class="price">2499</div>
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
        console.log(res)
        var data = res.data
        this.goodsList = data.result
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
      }
        a{
          text-decoration: none;
          color: #000;
        }
      .goods-list{
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
        li{
          list-style: none;
          background: #FFF;
          text-align: center;
        }
          img{
            width: 200px;
          }
          .goods-msg /deep/ .el-button{
            width: 98%;
            color: #1989fa;
          }
</style>
