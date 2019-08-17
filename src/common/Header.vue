<template>
  <div class="header">
    <span class="title">奋超商城</span>
    <div class="header-msg">
      <div class="user">用户名</div>
      <div class="state">login</div>
      <div class="icon-wrap">
        <i class="el-icon-shopping-cart-2 cart-icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeHeader'
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
}
.title {
  margin-left: 5%;
  font-size: 44px;
  font-weight: bold;
  color: #409eff;
}
.header-msg {
  margin-right: 5%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 20px;
  color: #1989fa;
}
.state {
  padding-left: 10px;
  padding-right: 10px;
}
.icon-wrap {
  font-size: 30px;
}
</style>
