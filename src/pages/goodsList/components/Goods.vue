<template>
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">排序：</span>
        <a href="javascript:;" class="default cur">综合排序</a>
        <a href="javascript:;" class="price" @click="sortGoods">价格 {{priceSort}}</a>
        <a href="javascript:;" class="filterby stopPop">筛选</a>
      </div>
      <div class="goods-wrap">
        <!-- filter -->
        <div class="price-filter">
          <dl>
            <dt>价格：</dt>
            <dd><a href="javascript:;" :class="{'cur':priceIndex==='all'}" @click="priceFilter('all')">All</a></dd>
            <dd><a href="javascript:;" :class="{'cur':priceIndex==='1'}" @click="priceFilter('1')">0 - 30</a></dd>
            <dd><a href="javascript:;" :class="{'cur':priceIndex==='2'}" @click="priceFilter('2')">30 - 50</a></dd>
            <dd><a href="javascript:;" :class="{'cur':priceIndex==='3'}" @click="priceFilter('3')">50 - 70</a></dd>
            <dd><a href="javascript:;" :class="{'cur':priceIndex==='4'}" @click="priceFilter('4')">70 以上</a></dd>
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
              <el-button @click="addCart(item.productId)">加入购物车</el-button>
            </div>
          </li>
        </ul>
      </div>
      <pagination @current-change='pageChange' :page='page' :total='pageTotal'></pagination>
      <!-- <el-backtop target=".goods-wrap .goods-list"></el-backtop> -->
  </div>
</template>
<script>
import axios from 'axios'
import Pagination from './Pagination'
export default {
  name: 'Goods',
  data () {
    return {
      goodsList: [],
      page: 1,
      pageSize: 8,
      sortFlag: true,
      priceSort: '↑',
      total: 0,
      priceIndex: 'all'
    }
  },
  components: {
    Pagination
  },
  mounted () {
    this.getGoodsList()
  },
  computed: {
    pageTotal () {
      return Math.ceil(this.total / this.pageSize) * 10
    }
  },
  methods: {
    getGoodsList () {
      // 传入参数
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceIndex: this.priceIndex
      }
      // 不能直接把param丢进来，要加在params里
      axios.get('/goods', { params: param }).then((res) => {
        if (res.data.status === '0') {
          this.goodsList = res.data.result.list
          this.total = res.data.result.total
        } else {
          this.goodsList = []
        }
      })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.priceSort = this.sortFlag ? '↑' : '↓'
      this.page = 1
      this.getGoodsList()
    },
    pageChange (val) {
      this.page = val
      this.getGoodsList()
    },
    priceFilter (val) {
      this.priceIndex = val
      this.page = 1
      this.getGoodsList()
    },
    addCart (val) {
      axios.post('/goods/addCart', {
        productId: val
      }).then(res => {
        if (res.data.status === '0') {
          this.$message({
            type: 'success',
            message: '加入成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: res.data.msg
          })
        }
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
        margin-right: 8px;
      }
    .goods-wrap{
      display: flex;
      margin: 1%;
    }
      .price-filter{
        font-size: 20px;
        flex-basis: 150px;
        flex-shrink: 0;

        a{
          text-decoration: none;
          color: #000;
        }
        a:hover{
          color: #1989fa;
          border-left: #1989fa 2px solid;
          padding-left: 15px;
        }
        a:visited{
          color: #000;
        }
        .cur{
          color: #1989fa;
          border-left: #1989fa 2px solid;
          padding-left: 15px;
        }
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
</style>
<style lang="scss">
  .goods-pic{
    .el-image{
            width: 210px;
          }
  }
  .goods-msg{
    .el-button{
      width: 98%;
      color: #1989fa;
    }
  }
</style>
