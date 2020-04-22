<template>
  <div>
    <el-row :gutter="40">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/setting'}">个人设置</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="5">
        <div class="lawyer-info-card">
          <div class="lawyer-info">
            <div class="lawyer-info-picture">
              <img :src="lawyerInfo.avatar" alt="律师头像">
              <span @click="changPicture">更换头像</span>
            </div>
            <div class="lawyer-info-text">
              <p>上次登录时间：{{ userInfo.lastLoginTime | dateFormat("YYYY-mm-dd") }}</p>
              <p>个人积分：<span class="high-light">{{ lawyerInfo.points }}</span><i @click="Integralquery"/><span class="tip">提示文本提示文本提示文本</span></p>
            </div>
            <div class="lawyer-info-icon">
              <ul>
                <li><a href="javascript:void(0);"><i :style="{color:lawyerInfo.status === 1 || lawyerInfo.status === 2 ? '#F44E12' : '#B6B6B6'}" class="iconfont iconpersonnone"/><span>{{ statusName }}</span></a></li>
                <li><a href="javascript:void(0);"><i :style="{color:lawyerInfo.phone ? '#71C856' : '#B6B6B6'}" class="iconfont iconshoujihao"/><span>{{ lawyerInfo.phone ? '已绑定' : '绑定手机' }}</span></a></li>
                <li><a href="javascript:void(0);"><i :style="{color:lawyerInfo.email ? '#55A3FF' : '#B6B6B6'}" class="iconfont iconyouxiangrenzheng"/><span>{{ lawyerInfo.email ? '已绑定' : '绑定邮箱' }}</span></a></li>
              </ul>
            </div>
          </div>
          <div class="setting">
            <p>&nbsp;&nbsp;●&nbsp;&nbsp;个人设置</p>
            <ul>
              <li>修改密码</li>
              <li>修改手机号</li>
              <li>绑定邮箱</li>
            </ul>
          </div>
          <div class="addcase" style="">
            <img src="../../../assets/usercenter/plus-circle.png" alt="add">
            添加案件
          </div>
      </div></el-col>
      <el-col :span="19">
        <el-row class="changeform">
          <el-col :span="24">
            <p>修改密码</p>
            <b>温馨提示：密码可以用来登录京师在线相关产品，请勿随意泄露您的信息，以防不法分子利用造成个人损失</b>
            <el-form ref="passwordForm" :rules="rules" :model="passwordForm" label-position="right" label-width="100px">
              <el-form-item label="当前密码" prop="password">
                <el-input v-model="passwordForm.password" size="small" clearable placeholder="当前密码" />
              </el-form-item>
              <el-form-item label="新密码" prop="newpassword">
                <el-input v-model="passwordForm.newpassword" size="small" clearable placeholder="新密码" @input="checknum(passwordForm.newpassword)"/>
              </el-form-item>
              <el-form-item label="强度">
                <div class="input_span">
                  <span id="one" :class="one"/>
                  <span id="two" :class="two"/>
                  <span id="three" :class="three"/>
                </div>
              </el-form-item>
              <el-form-item label="确认密码" prop="password">
                <el-input v-model="passwordForm.confirmpassword" size="small" clearable placeholder="确认密码" />
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button @click="submit">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24">
            <p>修改绑定手机</p>
            <b>温馨提示：手机可以用来登录京师在线相关产品，请勿随意泄露您的信息，以防不法分子利用造成个人损失</b>
            <el-form ref="teleForm" :rules="telerules" :model="teleForm" label-position="right" label-width="100px">
              <el-form-item label="当前手机号" prop="telephone">
                <el-input v-model="teleForm.telephone" size="small" clearable placeholder="当前手机号" />
              </el-form-item>
              <el-form-item label="新手机号" prop="newtelephone">
                <el-input v-model="teleForm.newtelephone" size="small" clearable placeholder="新手机号" />
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
          <el-col :span="24" >
            <p>修改绑定邮箱</p>
            <b>温馨提示：邮箱可以用来登录京师在线相关产品，请勿随意泄露您的信息，以防不法分子利用造成个人损失</b>
            <el-form ref="emailForm" :rules="emailrules" :model="emailForm" label-position="right" label-width="100px">
              <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="emailForm.email" size="small" clearable placeholder="邮箱地址" />
              </el-form-item>
              <el-form-item label="新邮箱" prop="newemail">
                <el-input v-model="emailForm.newemail" size="small" clearable placeholder="新邮箱" />
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button @click="submitemail">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
      <el-dialog
        v-if="userInfo.status !== 1 || userInfo.status !== 2"
        :visible.sync="dialogVisible"
        width="510px"
      >
        <h4>您尚未进行律师认证</h4>
        <p>您尚未进行律师身份认证其他人无法检索到您，请您尽快前往律师认证，我们会对您提供的认证信息进行人工审核，请正确填写。</p>
        <a href="/userCenter/auth/update">前往认证</a>
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    const checknumber = (rule, value, callback) => {
      if (value.length < 6) {
        callback('验证码格式不正确')
      } else {
        callback()
      }
    }
    return {
      userInfo: {}, // 用户信息
      lawyerInfo: {}, // 律师信息
      statusName: '', // 律师状态
      dialogVisible: false,
      caseListParam: {// 案例检索条件
        lawyerId: '',
        pageCount: 10, // 页目条数 number
        pageIndex: 1// 页码 number
      },
      passwordForm: {
        password: '',
        newpassword: '',
        confirmpassword: ''
      },
      teleForm: {
        telephone: '',
        newtelephone: '',
        number: ''
      },
      emailForm: {
        email: '',
        newemail: ''
      },
      one: 'default',
      two: 'default',
      three: 'default',
      rules: {
        password: [
          { required: true, trigger: 'blur', message: '密码不可为空' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        newpassword: [
          { required: true, trigger: 'blur', message: '新密码不可为空' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        confirmpassword: [
          { required: true, trigger: 'blur', message: '确认密码不可为空' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      telerules: {
        telephone: [
          { required: true, trigger: 'blur', message: '手机号不可为空' },
          { validator: checktelephone, trigger: 'blur' }
        ],
        newtelephone: [
          { required: true, trigger: 'blur', message: '新手机号码不可为空' },
          { validator: checktelephone, trigger: 'blur' }
        ],
        number: [
          { required: true, trigger: 'blur', message: '验证码不可为空' },
          { validator: checknumber, trigger: 'blur' }
        ]
      },
      emailrules: {
        email: [
          { required: true, trigger: 'blur', message: '邮箱不可为空' }
        ],
        newemail: [
          { required: true, trigger: 'blur', message: '新邮箱不可为空' }
        ]
      }
    }
  },
  watch: {
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
  },
  methods: {
    ...mapActions('account', ['GetLoginUserInfo']),
    // 用户信息
    getUserInfo() {
      this.GetLoginUserInfo().then(res => {
        this.userInfo = res
        this.lawyerInfo = res.lawyerInfo
        // this.statusName = this.lawyerStatus.filter(item => item.id === this.userInfo.lawyerInfo.status)[0].displayName
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
      this.$refs.passwordForm.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.createUser({ ...this.$refs.passwordForm.passwordForm }).then(res => {
            this.$message.success(res)
          })
        }
      })
    },
    submittele() {
      this.$refs.teleForm.$refs.teleForm.validate(valid => {
        if (valid) {
          this.createUser({ ...this.$refs.teleForm.teleForm }).then(res => {
            this.$message.success(res)
          })
        }
      })
    },
    submitemail() {
      this.$refs.emailForm.$refs.emailForm.validate(valid => {
        if (valid) {
          this.createUser({ ...this.$refs.emailForm.emailForm }).then(res => {
            this.$message.success(res)
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
          bottom: 0px;
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
  padding: 30px;
  background: #fff;
  margin-bottom:25px;
  p{
    color: #f68020;
    padding-left: 20px;
    font-size: 16px;
  }
  ul{
    margin: 0px;
    li{
      text-align: center;
      line-height: 36px;
      font-size: 14px;
    }
  }
}
.addcase{
  height:40px;
  background:#f68020;
  text-align:center;
  font-size:16px;
  color:#fff;
  padding-top: 10px;
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
    }
    .el-form{
      width: 50%;
      margin: 20px auto;
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
		margin-left: 20px;
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
