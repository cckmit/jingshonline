<template>
  <el-form ref="workForm" :model="workForm" :rules="rules" class="resume-list-class" label-position="right" label-width="90px">
    <el-form-item label="所在单位" prop="organization">
      <el-input v-model="workForm.organization" size="small" clearable placeholder="请输入所在单位" />
    </el-form-item>
    <el-form-item label="担任职务" prop="position">
      <el-input v-model="workForm.position" size="small" clearable placeholder="请输入担任职务" />
    </el-form-item>
    <el-form-item label="在职时间" prop="endDate">
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectTime"/>
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="workForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
    <el-form-item label="附件">
      <AliYunOss :option="ossOption" @change="ossUploadChange" />
    </el-form-item>
  </el-form>
</template>

<script>
import AliYunOss from '@/components/Oss'
export default {
  name: 'WorkForm',
  components: {
    AliYunOss
  },
  props: {
    workFormData: {
      type: Object,
      default: function() {
        return {
        }
      }
    },
    sourceDisabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      disabled: false,
      psdDisabled: false,
      workForm: {},
      time: [],
      files: [],
      ossOption: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 2 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      },
      rules: {
        organization: [
          { required: true, trigger: 'blur', message: '单位名称不可为空' }
        ],
        endDate: [
          { required: true, trigger: 'change', message: '时间不可为空' }
        ],
        position: [
          { required: true, trigger: 'blur', message: '职务不可为空' }
        ]
      }
    }
  },
  watch: {
    workFormData: {
      immediate: true,
      handler(val) {
        val = JSON.stringify(val)
        val = JSON.parse(val)
        this.workForm = val
        this.time = [val.startDate, val.endDate]
        this.ossOption.fileList = val.uploadFileId > 0 ? [{ name: val.uploadFileName, url: val.path, fileId: val.uploadFileId, uid: Math.random() * 200, status: 'success' }] : []
      }
    },
    sourceDisabled: {
      immediate: true,
      handler(val) {
        this.disabled = val
      }
    },
    sourcePsdDisabled: {
      immediate: true,
      handler(val) {
        this.psdDisabled = val
      }
    }
  },
  methods: {
    ossUploadChange(val) {
      this.workForm.path = val.length >= 1 ? val[0].url : ''
      this.workForm.uploadFileId = val.length >= 1 ? val[0].fileId : ''
      this.workForm.uploadFileName = val.length >= 1 ? val[0].name : ''
    },
    selectTime(val) {
      this.workForm.startDate = val[0]
      this.workForm.endDate = val[1]
    }
  }
}
</script>
<style lang='scss'>
.resume-list-class{
.el-date-editor--daterange{
  width:360px !important;
}}
</style>

