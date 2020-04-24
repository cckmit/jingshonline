<template>
  <el-form ref="industryForm" :model="industryForm" label-position="right" label-width="80px">
    <el-form-item label="行业资质" prop="name">
      <el-input v-model="industryForm.name" size="small" clearable placeholder="请输入行业资质" />
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="industryForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
    <el-form-item label="附件" prop="enclosure">
      <el-input v-model="industryForm.enclosure" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'IndustryForm',
  props: {
    industryFormData: {
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
      industryForm: {}
    }
  },
  watch: {
    industryFormData: {
      immediate: true,
      handler(val) {
        this.industryForm = val
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

