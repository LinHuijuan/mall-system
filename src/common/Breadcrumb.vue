<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item  :to="{ path: '/cart' }">购物车 </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb'
}
</script>
<style lang="scss">
.breadcrumb {
  padding-left: 5%;
  height: 44px;
  background: #D9ECFF;
  .el-breadcrumb{
    font-size: 18px;
    line-height: 44px;
  }
}
</style>
