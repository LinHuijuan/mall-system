<template>
  <div class='header'>
    <span class='title'>奋超商城</span>
    <div class='header-msg'>
      <div class='user'>{{userLoginName}}</div>
      <div class='state' @click='dialogFormVisible = true' v-if='!logined'>登录</div>
      <div class="state" @click='logout' v-if='logined'>退出</div>
      <el-dialog title="登录" :visible.sync="dialogFormVisible">
        <el-form
          :model='ruleForm'
          status-icon
          :rules='rules'
          ref='ruleForm'
          label-width='100px'
          class='demo-ruleForm'
        >
          <el-form-item label='用户名' prop='name'>
            <el-input type='text' v-model='ruleForm.name'></el-input>
          </el-form-item>
          <el-form-item label='密码' prop='pass'>
            <el-input type='password' v-model='ruleForm.pass'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="submitForm('ruleForm');">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class='icon-wrap'>
        <i class='el-icon-shopping-cart-2 cart-icon'></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'HomeHeader',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        this.userName = value
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        this.userPwd = value
        callback()
      }
    }
    return {
      userName: '',
      userPwd: '',
      userLoginName: '',
      logined: false,
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [{ validator: checkName, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用methods里的另一个函数
          let _this = this
          this.$options.methods.login(_this)
        } else {
          this.$message({
            type: 'info',
            message: '请正确登录'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login (_this) {
      axios.post('/users/login', {
        userName: _this.userName,
        userPwd: _this.userPwd
      }).then(res => {
        if (res.data.status === '0') {
          _this.dialogFormVisible = false
          _this.logined = true
          _this.userLoginName = _this.userName
          _this.$message({
            type: 'success',
            message: '登陆成功'
          })
        } else {
          _this.$message({
            type: 'info',
            message: res.data.msg
          })
        }
      })
    },
    logout () {
      axios.post('/users/logout').then(res => {
        if (res.data.status === '0') {
          this.logined = false
          this.userLoginName = ''
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
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
