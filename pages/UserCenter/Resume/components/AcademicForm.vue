<template>
  <el-form ref="academicForm" :model="academicForm" class="resume-list-class" label-position="right" label-width="80px">
    <el-form-item label="学术成果" prop="name">
      <el-input v-model="academicForm.name" size="small" clearable placeholder="请输入学术成果" />
    </el-form-item>
    <el-form-item label="说明" prop="explain">
      <el-input v-model="academicForm.explain" size="small" type="textarea" clearable placeholder="请输入说明" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AcademicForm',
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
      academicForm: {}
    }
  },
  watch: {
    academicFormData: {
      immediate: true,
      handler(val) {
        this.academicForm = val
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
  .el-input--small .el-input__inner{
  width:360px !important;
}
}

</style>

