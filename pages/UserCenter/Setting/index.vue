<template>
  <div>
    <el-row :gutter="40">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/setting'}">个人设置</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="5">
        <div class="lawyer-info-card">
          <UserInfo/>
          <div class="setting">
            <p>&nbsp;&nbsp;●&nbsp;&nbsp;个人设置</p>
            <ul>
              <li><a href="#changepassword">修改密码</a></li>
              <li><a href="#changetele">修改手机号</a></li>
              <li><a href="#changemail">绑定邮箱</a></li>
            </ul>
          </div>
          <div class="addcase" style="">
            <nuxt-link :to="{name: 'UserCenter-Case-create'}"><el-button icon="el-icon-circle-plus-outline">添加案例</el-button></nuxt-link>
          </div>
      </div></el-col>
      <el-col :span="19">
        <el-row class="changeform">
          <el-col id="changepassword" :span="24">
            <p>修改密码</p>
            <b>温馨提示：密码可以用来登录京师在线相关产品，请勿随意泄露您的信息，以防不法分子利用造成个人损失</b>
            <el-form ref="passwordForm" :rules="rules" :model="passwordForm" label-position="left" label-width="100px">
              <el-form-item label="当前密码" prop="oldPassword">
                <el-input v-model="passwordForm.oldPassword" size="small" clearable placeholder="当前密码" />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="passwordForm.newPassword" size="small" clearable placeholder="新密码" @input="checknum(passwordForm.newPassword)"/>
              </el-form-item>
              <el-form-item label="密码强度">
                <div class="input_span">
                  <span id="one" :class="one"/>
                  <span id="two" :class="two"/>
                  <span id="three" :class="three"/>
                </div>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="passwordForm.confirmPassword" size="small" clearable placeholder="确认密码" />
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button @click="submit">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col id="changetele" :span="24">
            <p>修改绑定手机</p>
            <b>温馨提示：手机可以用来登录京师在线相关产品，请勿随意泄露您的信息，以防不法分子利用造成个人损失</b>
            <el-form ref="teleForm" :rules="telerules" :model="teleForm" label-position="left" label-width="100px">
              <el-form-item label="当前手机号" prop="oldtelephone">
                <el-input v-model="teleForm.oldtelephone" size="small" clearable placeholder="当前手机号" />
              </el-form-item>
              <el-form-item label="新手机号" prop="phone">
                <el-input v-model="teleForm.phone" size="small" clearable placeholder="新手机号" />
              </el-form-item>
              <el-form-item label="短信验证" prop="number" class="number">
                <el-input v-model="teleForm.number" size="small" clearable placeholder="验证码" />
                <el-button type="primary" @click="submittele">获取验证码</el-button>
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button @click="submittele">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col id="changemail" :span="24">
            <p>修改绑定邮箱</p>
            <b>温馨提示：邮箱可以用来登录京师在线相关产品，请勿随意泄露您的信息，以防不法分子利用造成个人损失</b>
            <el-form ref="emailForm" :rules="emailrules" :model="emailForm" label-position="left" label-width="100px">
              <el-form-item label="邮箱地址" prop="oldemail">
                <el-input v-model="emailForm.oldemail" size="small" clearable placeholder="邮箱地址" />
              </el-form-item>
              <el-form-item label="新邮箱" prop="email">
                <el-input v-model="emailForm.email" size="small" clearable placeholder="新邮箱" />
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button @click="submitemail">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserInfo from '@/pages/UserCenter/components/UserInfo'

export default {
  layout: 'userCenter',
  name: 'UserCenterSetting',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心-个人设置',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    UserInfo
  },
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback('密码格式不正确')
      } else {
        callback()
      }
    }
    const checktelephone = (rule, value, callback) => {
      if (value.length < 11) {
        callback('手机号码格式不正确')
      } else {
        callback()
      }
    }
    // const checknumber = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback('验证码格式不正确')
    //   } else {
    //     callback()
    //   }
    // }
    return {
      userInfo: {}, // 用户信息
      lawyerInfo: {}, // 律师信息
      statusName: '', // 律师状态
      caseListParam: {// 案例检索条件
        lawyerId: '',
        pageCount: 10, // 页目条数 number
        pageIndex: 1// 页码 number
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      teleForm: {
        oldtelephone: '',
        phone: '',
        number: ''
      },
      emailForm: {
        email: '',
        oldemail: ''
      },
      one: 'default',
      two: 'default',
      three: 'default',
      rules: {
        oldPassword: [
          { required: true, trigger: 'blur', message: '密码不可为空' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, trigger: 'blur', message: '新密码不可为空' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', message: '确认密码不可为空' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      telerules: {
        // oldtelephone: [
        //   { required: true, trigger: 'blur', message: '手机号不可为空' },
        //   { validator: checktelephone, trigger: 'blur' }
        // ],
        phone: [
          { required: true, trigger: 'blur', message: '新号码不可为空' },
          { validator: checktelephone, trigger: 'blur' }
        ]
        // number: [
        //   { required: true, trigger: 'blur', message: '验证码不可为空' },
        //   { validator: checknumber, trigger: 'blur' }
        // ]
      },
      emailrules: {
        // oldemail: [
        //   { required: true, trigger: 'blur', message: '邮箱不可为空' }
        // ],
        email: [
          { required: true, trigger: 'blur', message: '新邮箱不可为空' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      lawyerStatus: state => state.lawyer.status
    })
  },
  watch: {
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
  },
  methods: {
    ...mapActions('account', ['GetLoginUserInfo', 'ChangeEmail', 'ChangePassWord', 'ChangePhone']),
    // 用户信息
    getUserInfo() {
      this.GetLoginUserInfo().then(res => {
        this.userInfo = res
        this.lawyerInfo = res.lawyerInfo
        this.statusName = this.lawyerStatus.filter(item => item.id === this.userInfo.lawyerInfo.status)[0].displayName
        this.caseListParam.lawyerId = this.userInfo.lawyerInfo.id
      })
    },
    // 积分查询
    Integralquery() {
      console.log('积分查询')
    },
    // 更换头像
    changPicture() {
      console.log('跟换头像')
    },
    submit() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.ChangePassWord(this.passwordForm).then(res => {
            this.$message.success(res)
            this.passwordForm = {
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            }
          })
        }
      })
    },
    submittele() {
      this.$refs.teleForm.validate(valid => {
        if (valid) {
          this.ChangePhone(this.teleForm).then(res => {
            this.$message.success(res)
            this.teleForm = {
              oldtelephone: '',
              phone: '',
              number: ''
            }
          })
        }
      })
    },
    submitemail() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.ChangeEmail(this.emailForm).then(res => {
            this.$message.success(res)
            this.emailForm = {
              email: '',
              oldemail: ''
            }
          })
        }
      })
    },
    checknum(newValue) {
      console.log(newValue)
      this.msgText = this.checkStrong(newValue)
      if (this.msgText > 1 || this.msgText === 1) {
        this.one = 'light'
      } else {
        this.one = 'default'
      }
      if (this.msgText > 2 || this.msgText === 2) {
        this.two = 'light'
      } else {
        this.two = 'default'
      }
      if (this.msgText === 3) {
        this.three = 'light'
      } else {
        this.three = 'default'
      }
    },
    checkStrong(sValue) {
      var modes = 0
      // 正则表达式验证符合要求的
      if (sValue.length < 1) return modes
      if (/\d/.test(sValue)) modes++ // 数字
      if (/[a-z]/.test(sValue)) modes++ // 小写
      if (/[A-Z]/.test(sValue)) modes++ // 大写
      if (/\W/.test(sValue)) modes++ // 特殊字符

      // 逻辑处理
      if (modes === 1) { return 1 }
      if (modes === 2) { return 2 }
      if (modes === 3) { return 3 }
      if (modes === 4) { return sValue.length < 6 ? 3 : 4 }
      return modes
    }
  }
}
</script>
<style lang='scss' scoped>
 .high-light {
    font-size: 14px;
    font-weight: bold;
    color: #ED0F0F;
  }
  .el-dialog{
    height: 380px;
    border-radius:3px;
    overflow: hidden;
    box-sizing: border-box;
    h4 {
      font-size:24px;
      color:rgba(0,0,0,1);
      text-align: center;
      margin: 59px 0 40px 0;
      font-weight:400;
    }
    p {
      padding: 0 80px;
      text-align: center;
      margin-bottom: 88px;
      font-size:16px;
      color:rgba(51,51,51,1);
      line-height:30px;
    }
    a {
      display: block;
      width:166px;
      height:38px;
      line-height: 38px;
      background:rgba(246,128,32,1);
      font-size:16px;
      border-radius:3px;
      text-align: center;
      margin: 0 auto;
      color: #fff;
    }
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
.lawyer-info-card{
    width: 240px;
    float: left;
    margin-right: 40px;
    .lawyer-info{
      width:240px;
      height:340px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229, 229, 229, 0.3);
      margin-bottom: 25px;
      padding-top: 40px;
      .lawyer-info-picture:hover span {
        bottom: 0px;
      }
      .lawyer-info-picture {
        margin: 0 auto;
        position: relative;
        display: block;
        width: 140px;
        height: 140px;
        box-sizing: border-box;
        border:1px solid rgba(215, 215, 215, 1);
        cursor: pointer;
        overflow: hidden;
        padding: 2px;
        margin-bottom: 18px;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        span{
          font-size: 14px;
          text-align: center;
          line-height: 26px;
          position: absolute;
          bottom: -30px;
          left: 0;
          transition: bottom .5s;
          color:rgba(255,255,255,1);
          background:rgba(0,0,0,1);
          opacity:0.5;
          width: 100%;
        }
      }
      .lawyer-info-text{
        padding-left: 30px;
        font-size: 12px;
        line-height: 28px;
        margin-bottom: 15px;
        position: relative;
        i {
          cursor: pointer;
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url("../../../assets/usercenter/help.png") no-repeat center;
          vertical-align: -2px;
          margin-left: 6px;
          position: relative;
        }
        .tip {
          transition: opacity 2s;
          position: absolute;
          display: block;
          width: 160px;
          height: 60px;
          border: 1px solid #ccc;
          background: #fff;
          z-index: 99;
          border-radius: 5px;
          top: -33px;
          left: 94px;
          font-size: 12px;
          opacity: 0;
        }
        .tip:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          bottom: -5px;
          left: 20px;
          transform: rotate(-45deg);
          border-width: 1px;
          border-style: solid;
          border-color: transparent transparent #ccc #ccc;
          z-index: 100;
          background: #fff;
        }
        i:hover +.tip {
          opacity: 1;
        }
      }
      .lawyer-info-icon {
        ul {
          display: flex;
          list-style: none;
          padding: 0 36px 0 30px;
          justify-content: space-between;
          overflow: hidden;
          li{
            font-size: 12px;
            line-height: 12px;
            a{
              color: #999999;
              i{
                line-height: 33px;
                display: block;
                font-size: 30px;
                text-align: center;
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
    .lawyer-business{
      width:238px;
      min-height:172px;
      border:1px solid rgba(229, 229, 229, 0.3);
      background-size: 100vh 100vh;
      background: url("../../../assets/usercenter/index-practice-bj.png") repeat-y;
      color: #333;
      h4 {
        font-size:12px;
        margin: 23px 0 12px 26px;
      }
      a {
        line-height: 34px;
        padding-left: 50px;
        color: #333;
        font-size:14px;
        font-weight:bold;
      }
    }
  }

.setting{
  padding: 20px;
  background: #fff;
  margin-bottom:25px;
  p{
    color: #f68020;
    padding-left: 10px;
    font-size: 16px;
    margin-bottom: 10px!important;
  }
  ul{
    margin: 0px;
    padding-left: 40px;
    li{
      line-height: 36px;
      font-size: 14px;
      a{
        display: block;
        color:#333;
      }
    }
  }
}
.addcase{
  .el-button{
    background:#f68020;
    color:#fff;
    width: 100%;
  }
  }
.changeform{
  .el-col{
    background:#fff;
    margin-bottom:40px;
    padding: 35px 50px;
    p{
      font-size: 16px;
      font-weight: bold;
    }
    b{
      font-weight: 400;
      display: block;
      font-size: 14px;
      color: #e91d1d;
      padding: 20px;
      letter-spacing: 1px;
    }
    .el-form{
      width: 50%;
      margin: 50px auto 30px auto;
      .number{
        overflow: hidden;
        .el-input{
          float: left;
          width:200px;
        }
        .el-button{
          float: right;
          height: 36px;
        }

      }
    }
  }
}
.dialog-footer{
  text-align: right;
  .el-button{
    background: #f68020;
    color: #fff;
    width:122px;
    font-size: 14px;
    margin-top: 10px;
  }
}
//密码强度
#inputValue{
		width:240px;
		margin-left: 20px;
		padding-left: 10px;
		border-radius: 3px;
	}
	.input_span span {
		display: inline-block;
		width: 85px;
		height: 10px;
		background: #eee;
		line-height: 20px;
	}

	#one {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-right: 0px solid;
		margin-right: 3px;
	}

	#two {
		border-left: 0px solid;
		border-right: 0px solid;
		margin-left: -5px;
		margin-right: 3px;
	}

	#three {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-left: 0px solid;
		margin-left: -5px;
	}
  #one.default{
    background: #eee;
  }
  #two.default{
    background: #eee;
  }
  #three.default{
    background: #eee;
  }
  #one.light{
    background: #e01c04;
  }
  #two.light{
    background: #FF9007;
  }
  #three.light{
    background: #65BD26;
  }
</style>
