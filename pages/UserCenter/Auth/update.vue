<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter/auth'}">律师认证</el-breadcrumb-item>
      <el-breadcrumb-item>提交认证资料</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="auth">
      <h4>您正在进行律师身份认证</h4>
      <p>
        温馨提示：未通过认证您将不会进入律师库（他人无法检索到您）我们会对您提供的认证信息进行人工审核，请正确填写信息。
      </p>
      <hr>
      <el-row>
        <el-col :span="13">
          <el-form ref="authForm" :model="authForm" :rules="authFormRules" label-position="left" label-width="90px">
            <el-form-item label="律师姓名" prop="realName">
              <el-input v-model="authForm.realName" placeholder="姓名" size="small" clearable/>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="authForm.sex" size="small">
                <el-radio :label="true">男</el-radio>
                <el-radio :label="false">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                v-model="authForm.birthday"
                type="month"
                size="small"
                style="width:100%"
                placeholder="选择出生日期"/>
            </el-form-item>
            <el-form-item label="所在地区" prop="regionId">
              <el-cascader
                v-model="authForm.regionId"
                :options="regionTreeData"
                :props="{ expandTrigger: 'hover', checkStrictly: true, label: 'name', value: 'id' }"
                placeholder="请选择您所在的地区"
                filterable
                clearable
                style="width:100%"
                size="small"
                @change="regionChange"/>
            </el-form-item>
            <el-form-item label="执业机构" prop="lawfirmId">
              <el-select
                v-model="authForm.lawfirmId"
                placeholder="请选择您所在的执业机构"
                size="small"
                style="width:100%"
                filterable
                clearable>
                <el-option
                  v-for="item in lawfirmData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="执业证号" prop="licenceNo">
              <el-input v-model="authForm.licenceNo" placeholder="请输入真实有效的执业证号" size="small" clearable/>
            </el-form-item>
            <el-form-item label="执业证领取时间" prop="licenceDate">
              <el-date-picker
                v-model="authForm.licenceDate"
                type="month"
                size="small"
                style="width:100%"
                placeholder="选择执业证领取时间"/>
            </el-form-item>
            <el-form-item label="执业证" prop="licencePath">
              <Oss :option="licencePathOssOption" @change="licencePathOssChange"/>
            </el-form-item>
            <el-form-item label="上传头像" prop="avatar">
              <Oss :option="avatarOssOption" @change="avatarOssChange"/>
            </el-form-item>
            <el-form-item class="auth_form_button">
              <el-button size="small" @click="()=>{this.$router.push('/usercenter/auth')}">返回</el-button>
              <el-button size="small" @click="submit">提交认证</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11">
          <p>头像示例：</p>
          <div class="clear">
            <dl>
              <dt>
                <img :src="manSamplen" alt="">
              </dt>
              <dd>
                标准照-男
              </dd>
            </dl>
            <dl>
              <dt>
                <img :src="womanSamplen" alt="">
              </dt>
              <dd>
                标准照-女
              </dd>
            </dl>
          </div>
          <p>上传建议：</p>
          <div>
            1、深色西服正装，男士需扎领带<br>
            2、脸部正面朝前，身体朝左前方45度<br>
            3、灰色背景<br>
            4、面带微笑，可露齿<br>
            5、为了您的照片更加靓丽，建议拍摄前整理发型、女士可化生活妆或淡妆<br>
            6、为了能够展现您完美的一面，建议您携带我们的样片到当地专业摄影机构进行符合要求的肖像拍照
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Oss from '@/components/Oss'
import { mapState, mapActions } from 'vuex'
import manSamplen from '@/assets/usercenter/man-sample.jpg'
import womanSamplen from '@/assets/usercenter/woman-sample.jpg'
export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  middleware: 'auth',
  head() {
    return {
      title: '提交认证资料-律师认证-用户中心-京师在线',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    Oss
  },
  props: {

  },
  data() {
    return {
      manSamplen,
      womanSamplen,
      avatarOssOption: {
        fileCategory: 3,
        accept: 'image/jpg,image/jpeg,image/png,',
        fileList: [],
        tip: '本图片将作为您的头像进行展示，仅支持jpg/png格式。'
      },
      licencePathOssOption: {
        fileCategory: 4,
        accept: 'image/jpg,image/jpeg,image/png,',
        fileList: [],
        tip: '仅支持jpg/png格式。'
      },
      authForm: {
        realName: '',
        sex: true,
        regionId: null,
        lawfirmId: null,
        licenceNo: '',
        avatarPathId: null,
        avatar: '',
        birthday: '',
        licenceDate: '',
        licencePathId: null,
        licencePath: ''
      },
      authFormRules: {
        realName: [
          { required: true, message: '真实姓名不可为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不可为空', trigger: 'change' }
        ],
        regionId: [
          { required: true, message: '所在地区不可为空', trigger: 'change' }
        ],
        lawfirmId: [
          { required: true, message: '执业机构不可为空', trigger: 'change' }
        ],
        licenceNo: [
          { required: true, message: '执业证号不可为空', trigger: 'change' },
          { min: 17, max: 17, message: '执业证号格式不正确', trigger: 'change' }
        ],
        avatar: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        licenceDate: [
          { required: true, message: '请选择执业证领取时间', trigger: 'change' }
        ],
        licencePath: [
          { required: true, message: '请上传执业证照片', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      regionTreeData: state => state.region.regionTreeData,
      lawfirmData: state => state.lawfirm.lawfirmData,
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
    ...mapActions('account', ['GetLoginUserInfo']),
    ...mapActions('lawyer', ['LawyerCertify']),
    getLawyerInfo() {
      this.lawyerInfo.lawyerInfo !== undefined ? this.authForm = JSON.parse(JSON.stringify(this.lawyerInfo.lawyerInfo)) : ''
      this.lawyerInfo.lawyerInfo !== undefined ? this.avatarOssOption.fileList = [{ name: 'avatar', url: this.lawyerInfo.lawyerInfo.avatar, fileId: this.lawyerInfo.lawyerInfo.avatarPathId, uid: Math.random() * 200, status: 'success' }] : ''
      this.lawyerInfo.lawyerInfo !== undefined ? this.licencePathOssOption.fileList = [{ name: 'lawyerlicence', url: this.lawyerInfo.lawyerInfo.licencePath, fileId: this.lawyerInfo.lawyerInfo.licencePathId, uid: Math.random() * 200, status: 'success' }] : ''
    },
    regionChange(val) {
      this.authForm.regionId = val[val.length - 1]
    },
    avatarOssChange(fileList) {
      this.authForm.avatarPathId = fileList.length >= 1 ? fileList[0].fileId : ''
      this.authForm.avatar = fileList.length >= 1 ? fileList[0].url : ''
    },
    licencePathOssChange(fileList) {
      this.authForm.licencePathId = fileList.length >= 1 ? fileList[0].fileId : ''
      this.authForm.licencePath = fileList.length >= 1 ? fileList[0].url : ''
    },
    submit() {
      this.$refs.authForm.validate((valid) => {
        if (valid) {
          this.LawyerCertify(this.authForm).then(res => {
            this.$message.success(res)
            this.GetLoginUserInfo().then(res => {
              this.$router.push('/usercenter/auth')
            })
          })
        }
      })
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
  >h4{
    font-size: 16px;
    color: #333;
    margin-bottom: 0;
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
    margin-bottom: 40px;
  }
  .el-col-13{
    padding: 0 100px 0 80px ;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  .auth_form_button{
    .el-button{
      width: 100px;
      color: #fff;
      &:first-child{
        background: #E1E1E1FF;
      }
      &:last-child{
        background: #F68020FF;
        margin-left: 36px;
      }
    }
  }
  .el-col-11{
    padding:0 115px 0 55px;
    p{
      font-size: 14px;
      color: #666;
      margin-bottom: 26px !important;
    }
    div{
      padding-left: 30px;
      color: #999999;
      font-size: 12px;
      line-height: 20px;
    }
    dl{
      float: left;
      margin-bottom: 34px;
      &:first-child{
        margin-right: 20px;
      }
      dt{
        img{
          width: 160px;
          height: 160px;
        }
      }
      dd{
        font-size: 14px;
        text-align: center;
        color: #808080;
        padding-top: 15px;
      }
    }
  }
}
</style>
