<template>
  <el-form ref="workForm" :model="workForm" label-position="left" label-width="80px">
    <el-form-item label="所在单位" prop="workName">
      <el-input v-model="workForm.workName" size="small" clearable placeholder="请输入所在单位" />
    </el-form-item>
    <el-form-item label="担任职务" prop="position">
      <el-input v-model="workForm.position" size="small" clearable placeholder="请输入担任职务" />
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="workForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'WorkForm',
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
      workForm: {}
    }
  },
  watch: {
    workFormData: {
      immediate: true,
      handler(val) {
        this.workForm = val
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
