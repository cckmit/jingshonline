<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
      <el-breadcrumb-item>律师认证</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="auth">
      <h4>您提交的认证信息正在<span>审核中...</span></h4>
      <p>
        温馨提示：未通过认证您将不会进入律师库（他人无法检索到您）我们会对您提供的认证信息进行人工审核，请正确填写信息。
      </p>
      <hr>
      <h2>您所提交的信息正在<span>审核中...</span></h2>
      <div class="div">
        我们将以&nbsp;&nbsp;<u>短信</u>&nbsp;&nbsp;的方式告知您的审核状态，您可以进行
        <router-link to="/usercenter/case/create"><el-button icon="el-icon-circle-plus-outline" size="mini">添加案例</el-button></router-link>
        或
        <router-link to="/usercenter/resume"><el-button icon="el-icon-circle-plus-outline" size="mini">添加简历</el-button></router-link>
      </div>
      <div class="info">
        <div>
          <el-form :rules="authFormRules" label-width="92px" label-position="left">
            <el-row>
              <el-col :span="14">
                <el-form-item label="头像" prop="realName" class="avatar" style="line-height:normal;">
                  <dl>
                    <dt>
                      <el-image :src="lawyerCertifyInfo.avatar"/>
                    </dt>
                    <dd>本图片将作为您的头像进行展示，仅支持jpg/png格式。</dd>
                  </dl>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="律师姓名" prop="realName">{{ lawyerCertifyInfo.realName }}</el-form-item>
                <el-form-item label="性别" prop="realName">{{ lawyerCertifyInfo.sex===1?'男':'女' }}</el-form-item>
                <el-form-item label="所在地区" prop="realName">{{ lawyerCertifyInfo.regionId }}</el-form-item>
                <el-form-item label="执业机构" prop="realName">{{ lawyerCertifyInfo.lawfirmId }}</el-form-item>
                <el-form-item label="执业证号" prop="realName">{{ lawyerCertifyInfo.licenceNo }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="opt">
        <router-link to="/usercenter/auth/update">修改资料</router-link>
        <router-link to="/usercenter">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Oss from '@/components/Oss'
import { mapState } from 'vuex'
export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  middleware: 'auth',
  head() {
    return {
      title: '律师认证-用户中心-京师在线',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    Oss
  },
  data() {
    return {
      lawyerCertifyInfo: { },
      authFormRules: {
        realName: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      lawyerInfo: state => state.account.lawyerInfo
    })
  },
  watch: {
    lawyerInfo: function() {
      this.getLawyerInfo()
    }
  },
  mounted() {
    this.getLawyerInfo()
  },
  methods: {
    getLawyerInfo() {
      this.lawyerInfo.lawyerInfo !== undefined ? this.lawyerCertifyInfo = this.lawyerInfo.lawyerInfo : ''
    }
  }
}
</script>
<style lang='scss' scoped>
.auth{
  background-color: #fff;
  border:1px solid rgba(229, 229, 229, 0.3);
  margin-bottom: 45px;
  padding: 48px 76px 72px 76px;
  h4{
    font-size: 16px;
    font-weight: bold;
    span{
      color: #FF7200;
    }
  }
  >p{
    font-size:14px;
    color:rgba(233,29,29,1);
    text-indent: 80px;
    margin: 14px 0 24px 0 !important;
  }
  hr{
    border-bottom: none;
    border-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 80px;
  }
  h2{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 24px !important;
    span{
      color: #FF7200;
    }
  }
  .div{
    text-align: center;
    margin-bottom: 44px;
    line-height: 28px;
    font-size: 16px;
    color: #333333;
    u{
      color: #E91D1D;
    }
    .el-button{
      width: 94px;
      background: #F68020;
      color: #fff;
    }
  }
  .info{
    margin: 0 127px 58px 127px;
    >div{
      width: 100%;
      height: 334px;
      background-color: #FDFDFD;
      border: 1px solid #F5F5F5;
      padding: 80px 0 70px 90px;
      .el-form{
        .el-form-item{
          color: #6C6C6C;
          margin-bottom: 0;
          .el-image{
              width: 150px;
              height: 150px;
          }
          dt{
            height: 150px;
          }
          dd{
            display: inline-block;
            font-size: 12px;
            color: #999;
            line-height: normal;
          }
        }
      }
    }
  }
  .opt{
    text-align: center;
    a{
      display: inline-block;
      width: 100px;
      height: 32px;
      line-height: 32px;
      color: #fff;
      background: #E1E1E1;
      border-radius: 3px;
      font-size: 14px;
      &:last-child{
        background: #F68020;
        margin-left: 32px;
      }
    }
  }
}
</style>
