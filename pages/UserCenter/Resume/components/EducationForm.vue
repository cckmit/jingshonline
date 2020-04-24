<template>
  <el-form ref="educationForm" :model="educationForm" label-position="left" label-width="80px">
    <el-form-item label="院校" prop="name">
      <el-input v-model="educationForm.name" size="small" clearable placeholder="请输入所在单位" />
    </el-form-item>
    <el-form-item label="学历" prop="position">
      <el-input v-model="educationForm.position" size="small" clearable placeholder="请输入担任职务" />
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
      <el-input v-model="educationForm.enclosure" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EducationForm',
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
      educationForm: {}
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
  }
}
</script>
<style lang='scss'>
.el-date-editor--daterange{
  width:364px !important;
}
</style>

