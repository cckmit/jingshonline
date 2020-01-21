<template>
  <el-row :gutter="20" style="background:#eee;">
    <el-col :span="24">
      <!-- <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item >反馈留言板</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-row class="bgf helpform">
        <el-col :span="24">
          <p class="p">反馈留言板</p>
          <el-Form ref="Form" :rules="rules" :model="Form" label-position="right" label-width="100px" >
            <el-form-item label="反馈类型" prop="radio">
              <el-radio v-model="Form.radio" label="1">案例信息</el-radio>
              <el-radio v-model="Form.radio" label="2">律师资料</el-radio>
            </el-form-item>
            <el-form-item label="反馈内容" prop="remark">
              <el-input :rows="15" v-model="Form.remark" type="textarea" placeholder="反馈内容"/>
            </el-form-item>
            <el-form-item label="附件" prop="name">
              <AliYunOss :option="ossOptionForAvatar" @change="ossUploadChange" />
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
              <el-input v-model="Form.tel" size="small" clearable placeholder="联系方式" />
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="Form.email" size="small" clearable placeholder="电子邮箱" />
            </el-form-item>
            <el-form-item label="验证码" prop="number">
              <el-input v-model="Form.number" size="small" clearable placeholder="验证码" />
              <img src="" alt="">
            </el-form-item>
            <el-form-item>
              <el-button class="submit" @click="submit">提交反馈</el-button>
            </el-form-item>
          </el-Form>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>

import AliYunOss from '../../components/Oss/index'
export default {
  layout: 'lawyer',
  name: 'Help',
  components: {
    AliYunOss
  },

  data() {
    return {
      Form: {
        name: '',
        radio: '1',
        remark: '',
        tel: '',
        email: '',
        number: ''
      },
      rules: {},
      ossOptionForAvatar: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 0 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      }
    }
  },

  watch: {
  },

  mounted() {

  },

  methods: {
    submit() {},
    ossUploadChange(val) {
      val.length >= 1 ? this.form.avatar = val[0].url : ''
      val.length >= 1 ? this.form.avatarPathId = val[0].fileId : ''
      this.$refs.form.validate()
    }
  }
}
</script>

<style lang='scss'>
  .p{
    margin: 30px;
    padding-bottom: 20px;
    border-bottom: 1px dotted #ddd;
    font-size: 18px;
    color:#f68020;
  }
  .helpform{
    .el-input--small .el-input__inner{
      width:200px;
    }
    .el-textarea__inner{
      width:80%;
    }
  }

  .submit{
    width:140px;
    height:40px;
    border-radius: 5px;
    background: #f68020;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
</style>
