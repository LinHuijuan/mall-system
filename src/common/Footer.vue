<template>
  <div>
    <footer class='footer'>
      <div class='footer-region'>
        <el-select v-model='value' placeholder='请选择语言'>
          <el-option
            v-for='item in options'
            :key='item.value'
            :label='item.label'
            :value='item.value'
          >
            <span style='float: left'>{{ item.label }}</span>
            <span style='float: right; color: #8492a6; font-size: 13px'>{{ item.value }}</span>
          </el-option>
        </el-select>
      </div>
      <div class='footer-nav'>
        <span>Copyright © 2019 LHJ All Rights Reserved.</span>
        <a href='javascript:;'>About Us</a>
        <a href='javascript:;'>Terms &amp; Conditions</a>
        <a href='javascript:;'>Privacy Policy</a>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'HomeFooter',
  data () {
    return {
      options: [
        {
          value: '英文',
          label: 'English'
        },
        {
          value: '中文',
          label: 'Chinese'
        }
      ],
      value: ''
    }
  }
}
</script>
<style lang='scss' scoped>
  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #dcdfe6;
    height: 80px;
  }
    .footer-nav{
      color: #ccc;
      padding-left: 10px;
    }
      a{
         text-decoration: none;
         color: #ccc;
      }
</style>
