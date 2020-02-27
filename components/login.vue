<template>
  <div>
    <el-dialog :title="type==='login'?'登录':'注册'" :visible.sync="formVisible" width="350px" custom-class="login" @close="close">
      <el-form v-show="type==='login'" ref="loginForm" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入用户名或手机号"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin">登录</el-button>
          <p>没有账号?<span @click="changeForm('register')">注册</span><nuxt-link to="">忘记密码</nuxt-link></p>
        </el-form-item>
      </el-form>
      <el-form v-show="type==='register'" ref="registerForm" :model="registerForm" :rules="registerFormRules">
        <el-form-item prop="userName">
          <el-input v-model="registerForm.userName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input v-model="registerForm.verificationCode" placeholder="请输入验证码"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码(不少于6位)"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegister">注册</el-button>
          <p class="register" @click="changeForm('login')">已有账号登录</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      formVisible: false,
      type: 'login',
      loginForm: {
        account: '',
        password: ''
      },
      loginFormRules: {
        account: [
          { required: true, tigger: 'change', message: '账号不可为空' }
        ],
        password: [
          { required: true, tigger: 'change', message: '密码不可为空' }
        ]
      },
      registerForm: {
        userName: '',
        phone: '',
        verificationCode: '',
        password: ''
      },
      registerFormRules: {
        userName: [
          { required: true, tigger: 'change', message: '用户名不可为空' }
        ],
        phone: [
          { required: true, tigger: 'change', message: '手机号不可为空' }
        ],
        verificationCode: [
          { required: true, tigger: 'change', message: '请输入验证码' }
        ],
        password: [
          { required: true, tigger: 'change', message: '请输入密码' },
          { min: 6, tigger: 'change', message: '密码格式不正确，' }
        ]
      }
    }
  },

  watch: {
    visible(val) {
      this.formVisible = val
    }
  },

  mounted() {
  },

  methods: {
    ...mapActions('account', ['Login', 'Register', 'GetLoginUserInfo']),
    changeForm(type) {
      this.type = type
      // this.type === 'login' ? this.registerForm.resetFields() : this.loginForm.resetFields()
    },
    close() {
      this.formVisible = false
      this.type === 'login' ? this.$refs.loginForm.resetFields() : this.$refs.registerForm.resetFields()
      this.type = 'login'
      this.$emit('close')
    },
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.Login(this.loginForm).then(res => {
            this.$notify({
              type: 'success',
              title: '提示',
              message: '账号登录成功'
            })
            this.GetLoginUserInfo()
            this.formVisible = false
          })
        }
      })
    },
    submitRegister() {
      this.$refs.registerForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.Register(this.registerForm).then(res => {

          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.login{
  .el-form-item:last-child{
    margin-bottom: 0;
  }
  .el-input__inner{
    border-radius: 2px;
  }
  .el-button{
    width: 100%;
    border-radius: 2px;
  }
  p{
    line-height: 18px;
    margin-top: 10px;
    span{
      padding-left: 10px;
      color: #409EFF;
      cursor: pointer;
    }
    a{
      float: right;
      color: #409EFF;
    }
  }
  .register{
    text-align: center;
    color: #409EFF;
    cursor: pointer;
  }
}
</style>
