<template>
  <el-form ref="educationForm" :rules="rules" :model="educationForm" class="resume-list-class" label-position="right" label-width="90px">
    <el-form-item label="院校" prop="school">
      <el-input v-model="educationForm.school" size="small" clearable placeholder="请输入院校" />
    </el-form-item>
    <el-form-item label="学历" prop="educationBackground">
      <el-select v-model="educationForm.educationBackground" size="small" clearable placeholder="请选择" class="sort-select">
        <el-option
          v-for="item in education"
          :key="item.id"
          :label="item.displayName"
          :value="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="学位" prop="degree">
      <el-input v-model="educationForm.degree" size="small" clearable placeholder="请输入学位" />
    </el-form-item>
    <el-form-item label="在校时间" prop="endDate">
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="入学时间"
        end-placeholder="毕业时间"
        @change="selectTime"/>
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="educationForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
    <el-form-item label="附件" >
      <AliYunOss :option="ossOption" @change="ossUploadChange" />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
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
      time: [],
      files: [],
      ossOption: {
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 2 // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
      },
      rules: {
        school: [
          { required: true, trigger: 'blur', message: '学校名称不可为空' }
        ],
        endDate: [
          { required: true, trigger: 'change', message: '时间不可为空' }
        ],
        educationBackground: [
          { required: true, trigger: 'blur', message: '学历不可为空' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      education: state => state.education.education
    })
  },
  watch: {
    educationFormData: {
      immediate: true,
      handler(val) {
        val = JSON.stringify(val)
        val = JSON.parse(val)
        this.educationForm = val
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
      this.educationForm.path = val.length >= 1 ? val[0].url : ''
      this.educationForm.uploadFileId = val.length >= 1 ? val[0].fileId : ''
      this.educationForm.uploadFileName = val.length >= 1 ? val[0].name : ''
    },

    selectTime(val) {
      this.educationForm.startDate = val[0]
      this.educationForm.endDate = val[1]
    }
  }
}
</script>
<style lang='scss'>
.resume-list-class{
  .el-input--small .el-input__inner{
  width:360px !important;
}
.el-date-editor--daterange{
  width:360px !important;
}}

</style>

