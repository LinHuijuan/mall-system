<template>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        layout="prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['page', 'total'],
  data () {
    return {
      currentPage3: this.page
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    }
  },
  // 父传子实时更新
  watch: {
    page: {
      immediate: true,
      handler (val) {
        this.currentPage3 = val
      }
    }
  }
}
</script>

<style lang="scss">
  .el-pagination{
    text-align: center
  }
    .el-pagination.is-background .btn-prev{
      background-color: #fff;
    }
    .el-pagination.is-background .el-pager li{
      background-color: #fff;
    }
    .el-pagination.is-background .btn-next{
      background-color: #fff;
    }
</style>
