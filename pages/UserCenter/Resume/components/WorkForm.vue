<template>
  <el-form ref="workForm" :model="workForm" label-position="right" label-width="80px">
    <el-form-item label="所在单位" prop="organization">
      <el-input v-model="workForm.organization" size="small" clearable placeholder="请输入所在单位" />
    </el-form-item>
    <el-form-item label="担任职务" prop="position">
      <el-input v-model="workForm.position" size="small" clearable placeholder="请输入担任职务" />
    </el-form-item>

    <el-form-item label="在职时间" prop="time">
      <el-date-picker
        v-model="workTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
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
      workForm: {},
      workTime: []
    }
  },
  watch: {
    workFormData: {
      immediate: true,
      handler(val) {
        val = JSON.stringify(val)
        val = JSON.parse(val)
        this.workForm = val
        this.workTime = [val.startDate, val.endDate]
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

