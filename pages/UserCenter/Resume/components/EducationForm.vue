<template>
  <el-form ref="educationForm" :model="educationForm" label-position="right" label-width="80px">
    <el-form-item label="院校" prop="name">
      <el-input v-model="educationForm.name" size="small" clearable placeholder="请输入院校" />
    </el-form-item>
    <el-form-item label="学历" prop="position">
      <el-input v-model="educationForm.position" size="small" clearable placeholder="请输入学历" />
    </el-form-item>
    <el-form-item label="在校时间" prop="time">
      <el-date-picker
        v-model="educationForm.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="educationForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
    <el-form-item label="附件" prop="enclosure">
      <AliYunOss :option="ossOption" @change="ossUploadChange" />
    </el-form-item>
  </el-form>
</template>

<script>
import AliYunOss from '@/components/Oss'
export default {
  name: 'EducationForm',
  components: {
    AliYunOss
  },
  props: {
    educationFormData: {
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
      educationForm: {},
      files: [],
      ossOption: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 2 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      }
    }
  },
  watch: {
    educationFormData: {
      immediate: true,
      handler(val) {
        this.educationForm = val
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
      this.files.push({ name: val[val.length - 1].name, path: val[val.length - 1].url, uploadFileId: val[val.length - 1].fileId, fileCategory: val[val.length - 1].fileCategory, isVisible: val[val.length - 1].isVisible })
    }
  }
}
</script>
<style lang='scss'>
.el-date-editor--daterange{
  width:364px !important;
}
</style>

