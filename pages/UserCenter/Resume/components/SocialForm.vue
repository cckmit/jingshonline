<template>
  <el-form ref="socialForm" :model="socialForm" class="resume-list-class" label-position="right" label-width="80px">
    <el-form-item label="社会职务" prop="name">
      <el-input v-model="socialForm.name" size="small" clearable placeholder="请输入社会职务" />
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="socialForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SocialForm',
  props: {
    socialFormData: {
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
      socialForm: {}
    }
  },
  watch: {
    socialFormData: {
      immediate: true,
      handler(val) {
        this.socialForm = val
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
.resume-list-class{
.el-date-editor--daterange{
  width:360px !important;
}}
</style>

