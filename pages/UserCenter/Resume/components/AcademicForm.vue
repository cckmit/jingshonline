<template>
  <el-form ref="academicForm" :rules="rules" :model="academicForm" class="resume-list-class" label-position="right" label-width="90px">
    <el-form-item label="学术成果" prop="name">
      <el-input v-model="academicForm.name" size="small" clearable placeholder="请输入学术成果" />
    </el-form-item>
    <el-form-item label="认证机构" prop="issuingAuthority">
      <el-input v-model="academicForm.issuingAuthority" size="small" clearable placeholder="请输入认证机构" />
    </el-form-item>
    <el-form-item label="学术期刊" prop="learnedPeriodical">
      <el-input v-model="academicForm.learnedPeriodical" size="small" clearable placeholder="请输入学术期刊" />
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="academicForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
    <el-form-item label="附件">
      <AliYunOss :option="ossOption" @change="ossUploadChange" />
    </el-form-item>
  </el-form>
</template>

<script>
import AliYunOss from '@/components/Oss'
export default {
  name: 'AcademicForm',
  components: {
    AliYunOss
  },
  props: {
    academicFormData: {
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
      academicForm: {},
      files: [],
      ossOption: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 2 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '学术成果不可为空' }
        ]
      }
    }
  },
  watch: {
    academicFormData: {
      immediate: true,
      handler(val) {
        this.academicForm = val
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
      this.academicForm.path = val.length >= 1 ? val[0].url : ''
      this.academicForm.uploadFileId = val.length >= 1 ? val[0].fileId : ''
      this.academicForm.uploadFileName = val.length >= 1 ? val[0].name : ''
    }
  }
}
</script>
<style lang='scss'>

</style>

