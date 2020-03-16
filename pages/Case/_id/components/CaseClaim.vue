<template>
  <el-dialog :visible.sync="visible" title="认领案例" @close="close">
    <div ref="userForm" :source-data="sourceData" class="case-claim">
      <el-steps :active="isStep" align-center>
        <el-step title="选取信息"/>
        <el-step title="提供证据"/>
        <el-step title="提交认领"/>
      </el-steps>
      <el-form v-show="isStep===0" ref="form" label-width="0" class="lawyerSelect">
        <el-form-item v-for="(item,index) in sourceData" :key="index" :name="index">
          <div class="case-aside-li" style="cursor: pointer;">
            <el-col :span="2" class="case-aside-checkbox">
              <el-checkbox v-model="item.checked" @change="checkChanged(item.lawyerId,index)"/>
            </el-col>
            <el-col :span="8" class="case-aside-imgBox">
              <div class="case-aside-img">
                <img src="@/assets/case/case-avatar.png" alt="">
              </div>
            </el-col>
            <el-col :span="14" class="case-aside-p">
              <p>{{ item.realName }}</p>
              <p>{{ item.lawfirmName }}</p>
            </el-col>
          </div>
        </el-form-item>
      </el-form>
      <el-form v-show="isStep===1" ref="userForm" :model="selectForm" label-position="left" label-width="100px" style=" margin:20px 40px 0 40px;">
        <el-form-item label="头像" prop="avatar">
          <AliYunOss :option="ossOptionForAvatar" @change="ossUploadChangeForAvatar" />
        </el-form-item>
      </el-form>
      <el-form ref="selectPhoneForm" :rules="rules" :model="selectForm" label-position="left" label-width="100px">
        <el-form-item v-show="isStep!==1" label="联系方式" prop="phone">
          <el-input v-model="selectForm.phone" maxlength="11" size="small" clearable placeholder="请输入您的联系方式" />
        </el-form-item>
      </el-form>
      <el-form ref="selectLicenseForm" :rules="rules" :model="selectForm" label-position="left" label-width="100px">
        <el-form-item v-show="isStep!==0" label="上传证件" prop="license">
          <el-input v-model="selectForm.license" size="small" clearable placeholder="律师执业证件照仅支持jpg，png格式" />
          <!-- <AliYunOss :option="ossOptionForAvatar" @change="ossUploadChangeForAvatar" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="isStep===1" @click="backClick">上一步</el-button>
        <el-button v-show="isStep!==2" type="primary" @click="nextClick">下一步</el-button>
        <el-button v-show="isStep===2" @click="reviseClick">修改信息</el-button>
        <el-button v-show="isStep===2" type="primary" @click="submit">提交认领</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
// import AliYunOss from '@/components/Oss'
export default {
  name: 'CaseClaim',
  props: {
    sourceVisible: {
      type: Boolean,
      default: false
    },
    sourceData: {
      type: Array,
      default: function() {
        return []
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
      rules: {
        phone: [
          { required: true, trigger: 'blur', message: '联系电话不可为空' },
          { validator: checkTel, trigger: 'blur' }
        ],
        license: [
          { required: true, trigger: 'blur', message: '律师执业证件照不可为空' }
        ]
      },
      selectForm: {
        phone: '',
        checked: ''
      },
      visible: false,
      isStep: 0,
      ossOptionForAvatar: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 3 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      }
    }
  },
  watch: {
    sourceVisible: function(val) {
      this.visible = val
    }
  },
  methods: {
    nextClick() {
      if (this.isStep === 0) {
        this.$refs.selectPhoneForm.validate(valid => {
          if (valid) {
            if (this.selectForm.checked === '') {
              this.$notify({
                message: '请选择律师',
                type: 'error'
              })
            } else {
              this.isStep = 1
            }
          }
        })
      } else if (this.isStep === 1) {
        this.isStep = 2
      }
    },
    backClick() {
      this.isStep = 0
    },
    reviseClick() {
      this.isStep = 0
    },
    submit() {
    },
    checkChanged(lawyerId, index) {
      this.sourceData.forEach(item => {
        if (item.lawyerId !== lawyerId) {
          item.checked = false
          this.selectForm.checked = lawyerId
        }
      })
    },
    close() {
      this.visible = false
      this.$emit('operate', this.visible)
    },
    ossUploadChangeForAvatar(val) {
      // this.userForm.avatar = val.length >= 1 ?  val[0].url : ''
      // this.userForm.avatarPathId = val.length >= 1 ?  val[0].fileId : ''
    }
  }
}
</script>
<style lang='scss'>
img{
  width: 100%
}
.el-dialog{
	width: 670px;
	height: 718px;
  padding: 0 125px;
	background-color: #ffffff;
	border-radius: 3px;
.el-dialog__header {
    text-align: center;
}
.el-dialog__body{
   padding: 0;
  .is-process{
    color: #f68020 !important;
    border-color:#f68020 !important;
  }

}
.dialog-footer{
  text-align: center
}
}
// 案件认领
.lawyerSelect{
  margin:30px 0;
  width: 100%;
    .case-aside-imgBox{
.case-aside-claim{
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

.case-aside-img
{
    position: relative;
    width: 76px;
    height: 76px;
    background-color: #dbdbdb;
    margin: 8px 15px;
}

}
.case-aside-checkbox{
  line-height: 80px !important;
  padding-left: 10px !important;
}
.case-aside-li
{
    opacity: 0.9;
    height: 102px;
    padding: 10px;
    .case-aside-p p{
    color: #333333;
}

.case-aside-p p:nth-child(1)
{
    font-size: 16px;
    margin-top: 10px;
}

}

.el-form-item
{
    margin-bottom: 0;
    border: solid 1px rgba(217, 217, 217, 0.3);
    margin:10px 0;
    width: 420px;
    height: 116px;
}
}

</style>
