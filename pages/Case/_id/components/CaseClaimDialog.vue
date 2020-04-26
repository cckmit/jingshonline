<template>
  <div class="caseClaim-dialog">
    <el-dialog :visible.sync="visible" title="认领案例" @close="close">
      <div ref="userForm" :source-data="sourceData" class="case-claim">
        <el-steps :active="isStep" align-center style="margin-bottom:20px">
          <el-step title="选取信息"/>
          <el-step title="提供证据"/>
          <el-step title="提交认领"/>
        </el-steps>
        <!-- 选择律师 -->
        <el-form ref="lawyerSelectForm" :rules="lawyerSelectRules" :model="lawyerSelectForm" label-position="left" label-width="100px" style="padding:0 140px">
          <el-form-item v-show="isStep===0" class="caseClaim-lawyerSelect" prop="lawyerSelect">
            <div v-for="(item,index) in sourceData" :key="index" :name="index" class="caseClaim-select">
              <div class="caseClaim-dialog-li" style="cursor: pointer;">
                <el-col :span="2" class="caseClaim-dialog-checkbox">
                  <el-checkbox v-model="item.checked" @change="checkChanged(item.lawyerId,index)"/>
                </el-col>
                <el-col :span="8" class="caseClaim-dialog-imgBox">
                  <div class="caseClaim-dialog-img">
                    <img src="@/assets/case/case-avatar.png" alt="">
                  </div>
                </el-col>
                <el-col :span="14" class="caseClaim-dialog-p">
                  <p>{{ item.realName }}</p>
                  <p>{{ item.lawfirmName }}</p>
                </el-col>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <!-- 上传头像 -->
        <el-form ref="uploadAvatarForm" :rules="uploadAvatarRules" :model="uploadAvatarForm" label-position="left" label-width="100px" style="padding:0 140px">
          <el-form-item v-show="isStep===1" prop="avatar" class="claim-avatar">
            <AliYunOss :option="ossOptionForAvatar" @change="ossUploadChangeForAvatar" />
            <p style="color: #d84714;">温馨提示:请上传个人真实头像.</p>
          </el-form-item>
        </el-form>
        <!-- 展示头像，律师 -->
        <el-form v-show="isStep===2" ref="caseClaimForm" :model="caseClaimForm" style="padding:0 140px">
          <el-form-item class="caseClaim-lawyerSelect" prop="lawyerSelect">
            <div v-for="(item,index) in sourceData" v-show="item.checked" :key="index" :name="index" class="caseClaim-select" >
              <div class="caseClaim-dialog-li" style="cursor: pointer;">
                <el-col :span="2" class="caseClaim-dialog-checkbox">
                  <el-checkbox v-model="item.checked" disabled/>
                </el-col>
                <el-col :span="8" class="caseClaim-dialog-imgBox">
                  <div class="caseClaim-dialog-img">
                    <img src="@/assets/case/case-avatar.png" alt="">
                  </div>
                </el-col>
                <el-col :span="14" class="caseClaim-dialog-p">
                  <p>{{ item.realName }}</p>
                  <p>{{ item.lawfirmName }}</p>
                </el-col>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-show="isStep===2" class="claim-avatar">
            <el-row>
              <el-col :span="6" style="text-align:center"><img :src="caseClaimForm.avatar" alt="" style="width:150px;height:150px"><p>150*150</p></el-col>
              <el-col :span="6" :offset="5" style="text-align:center"><img :src="caseClaimForm.avatar" alt="" style="width:78px;height:78px;margin-top:70px"><p>78*78</p></el-col>
              <el-col :span="3" :offset="3" style="text-align:center"><img :src="caseClaimForm.avatar" alt="" style="width:48px;height:48px;margin-top:90px"><p>48*48</p></el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <!-- 公用联系方式 -->
        <el-form ref="phoneSelectForm" :rules="phoneSelectRules" :model="phoneSelectForm" label-position="left" label-width="100px" style="padding:0 140px">
          <el-form-item v-show="isStep!==1" label="联系方式" prop="phone" style="margin-left:10px">
            <el-input v-model="phoneSelectForm.phone" :disabled="isStep===2" maxlength="11" size="small" clearable placeholder="请输入您的联系方式" />
          </el-form-item>
        </el-form>
        <!-- 公用证件 -->
        <el-form ref="uploadLicenceForm" :rules="uploadLicenceRules" :model="uploadLicenceForm" label-position="left" label-width="100px" style="padding:0 140px">
          <el-form-item v-show="isStep!==0" label="上传证件" prop="licenseName" class="claim-license" style="margin-left:10px">
            <el-row>
              <el-col :span="20"> <el-input v-model="uploadLicenceForm.licenseName" :disabled="isStep===2" :style="{width:(isStep===2?'120%':'100%')}" size="small" placeholder="律师执业证件照仅支持jpg，png格式" />
              </el-col>
              <el-col :span="2" :offset="1"><el-button v-show="isStep===1" size="small" type="primary" @click="isLicense=true">点击上传</el-button>
              </el-col>
            </el-row>
            <AliYunOss v-if="isLicense" :option="ossOptionForLicence" @change="ossUploadChangeForLicence" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="isStep===1" @click="backClick">上一步</el-button>
          <el-button v-if="isStep!==2" type="primary" @click="nextClick">下一步</el-button>
          <el-button v-if="isStep===2" @click="reviseClick">修改信息</el-button>
          <el-button v-if="isStep===2" type="primary" @click="submit">提交认领</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AliYunOss from '@/components/Oss'
export default {
  name: 'CaseClaimDialog',
  components: {
    AliYunOss
  },
  props: {
    sourceVisible: {
      type: Boolean,
      default: false
    },
    sourceData: {
      type: Array,
      default: function() {
        return [{}]
      }
    }
  },
  data() {
    const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
    const checkTel = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      phoneSelectRules: {
        phone: [
          { required: true, trigger: 'blur', message: '联系电话不可为空' },
          { validator: checkTel, trigger: 'blur' }
        ]
      },
      uploadLicenceRules: {
        licenseName: [
          { required: true, message: '律师执业证件照不可为空' }
        ]
      },
      lawyerSelectRules: {
        lawyerSelect: [
          { required: true, trigger: 'blur', message: '此选项不可为空' }
        ]
      },
      uploadAvatarRules: {
        avatar: [
          { required: true, trigger: 'blur', message: '头像不可为空' }
        ]
      },
      lawyerSelectForm: { // 律师
        lawyerSelect: ''
      },
      uploadAvatarForm: { // 头像
        avatar: '',
        avatarPathId: ''
      },
      phoneSelectForm: { // 手机
        phone: ''
      },
      uploadLicenceForm: { // 律师执业证件照
        licenseName: '',
        licenceId: '',
        licence: ''
      },
      caseClaimForm: { // 总字段
        avatar: '',
        avatarPathId: '',
        lawyerSelect: '',
        phone: '',
        licenseName: '',
        licenceId: '',
        licence: ''
      },
      visible: false,
      isStep: 0,
      isLicense: false,
      ossOptionForAvatar: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 3 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      },
      ossOptionForLicence: {
        type: 'primary', // 文件上传样式类型（非el-upload所需）
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 4 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      }
    }
  },
  watch: {
    sourceVisible: function(val) {
      this.visible = val
    }
  },
  methods: {
    nextClick() { // 下一步
      if (this.isStep === 0) {
        this.$refs.lawyerSelectForm.validate(valid => {
          if (valid) {
            this.$refs.phoneSelectForm.validate(valid => {
              if (valid) {
                this.isStep = 1
                this.caseClaimForm.phone = this.phoneSelectForm.phone
                this.caseClaimForm.lawyerSelect = this.lawyerSelectForm.lawyerSelect
              }
            })
          }
        })
      } else if (this.isStep === 1) {
        this.$refs.uploadAvatarForm.validate(valid => {
          if (valid) {
            this.$refs.uploadLicenceForm.validate(valid => {
              if (valid) {
                this.isStep = 2
                this.isLicense = false
                this.caseClaimForm.avatar = this.uploadAvatarForm.avatar
                this.caseClaimForm.avatarPathId = this.uploadAvatarForm.avatarPathId
                this.caseClaimForm.licenseName = this.uploadLicenceForm.licenseName
                this.caseClaimForm.licenceId = this.uploadLicenceForm.licenceId
                this.caseClaimForm.licence = this.uploadLicenceForm.licence
              }
            })
          }
        })
      }
    },
    backClick() { // 上一步
      this.isStep = 0
    },
    reviseClick() { // 修改
      this.isStep = 0
    },
    submit() { // 提交
      console.log(this.caseClaimForm)
      this.visible = false
    },
    checkChanged(lawyerId, index) { // checkBox点击事件
      if (this.sourceData.length > 1) {
        this.sourceData.forEach(item => {
          if (item.lawyerId !== lawyerId) {
            item.checked = false
            this.lawyerSelectForm.lawyerSelect = lawyerId
          }
        })
      } else if (this.sourceData.length === 1) {
        this.lawyerSelectForm.lawyerSelect = lawyerId
      }
    },
    close() { // 关闭
      this.visible = false
      this.$emit('operate', this.visible)
    },
    ossUploadChangeForAvatar(val) {
      this.uploadAvatarForm.avatar = val.length >= 1 ? val[0].url : ''
      this.caseClaimForm.avatar = val.length >= 1 ? val[0].url : ''
      this.uploadAvatarForm.avatarPathId = val.length >= 1 ? val[0].fileId : ''
      this.caseClaimForm.avatarPathId = val.length >= 1 ? val[0].fileId : ''
    },
    ossUploadChangeForLicence(val) {
      this.isLicense = false
      this.uploadLicenceForm.licenseName = val.length >= 1 ? val[0].name : ''
      this.uploadLicenceForm.licence = val.length >= 1 ? val[0].url : ''
      this.caseClaimForm.licence = val.length >= 1 ? val[0].url : ''
      this.caseClaimForm.licenseName = val.length >= 1 ? val[0].name : ''
      this.uploadLicenceForm.licenceId = val.length >= 1 ? val[0].fileId : ''
      this.caseClaimForm.licenceId = val.length >= 1 ? val[0].fileId : ''
      this.caseClaimForm.licenseName = val.length >= 1 ? val[0].fileId : ''
    }
  }
}
</script>
<style lang='scss'>
.caseClaim-dialog{
 .el-dialog{
 width: 670px;
  }
// 案件认领
.caseClaim-lawyerSelect{
  .el-form--label-left{
    margin-left: 0 !important;
  }
  .el-form-item__content{
    margin-left: 0 !important;
  }
}

.el-dialog__header {
    text-align: center;
}
.el-dialog__body{
   padding: 20px;
  .is-process{
    color: #f68020 !important;
    border-color:#f68020 !important;
  }
}
.case-claim{
    .el-form--label-left{
    padding: 0px 110px !important;
    }
  }
}
</style>
<style lang='scss' scoped>
.caseClaim-dialog{

  img{
    width: 100%
  }
.el-dialog{
	background-color: #ffffff;
	border-radius: 3px;
.dialog-footer{
  text-align: center;
  margin-bottom:30px;
}

// 案件认领
.caseClaim-lawyerSelect{
  .el-form--label-left{
    margin-left: 0 !important;
  }
  .el-form-item__content{
    margin-left: 0 !important;
  }
    .caseClaim-dialog-imgBox{
      .caseClaim-dialog-claim{
        position: absolute;
          left: 0;
          bottom: 25px;
          width: 76px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          font-size: 12px;
          color: #333333;
      }

    .caseClaim-dialog-img
    {
        position: relative;
        width: 76px;
        height: 76px;
        background-color: #dbdbdb;
        margin: 8px 15px;
    }

  }
  .caseClaim-dialog-checkbox{
    line-height: 80px !important;
    padding-left: 10px !important;
  }
  .caseClaim-dialog-li
  {
      opacity: 0.9;
      padding: 10px;
      .caseClaim-dialog-p p{
      color: #333333;
  }

  .caseClaim-dialog-p p:nth-child(1)
  {
      font-size: 16px;
      margin-top: 10px  !important;
  }

}

  .caseClaim-select
  {
      margin-bottom: 0;
      border: solid 1px rgba(217, 217, 217, 0.3);
      margin:10px 0;
      height: 116px;
      width: 420px;
  }
}
}
}
</style>
