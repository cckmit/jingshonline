<template>
  <el-dialog :visible.sync="visible" :title="Object.keys(sourceData).length===0?'添加工作经历':'编辑工作经历'" width="23%" @close="close">
    <WorkForm ref="workForm" :work-form-data="sourceData" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import WorkForm from './WorkForm'
export default {
  name: 'WorkCreatOrUpdate',
  components: {
    WorkForm
  },
  props: {
    sourceVisible: {
      type: Boolean,
      default: false
    },
    createData: {
      type: String,
      default: ''
    },
    sourceData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: false,
      ifCreateUpdate: ''
    }
  },
  watch: {
    sourceVisible: function(val) {
      this.visible = val
    },
    createData: function(val) {
      this.ifCreateUpdate = val
    }
  },
  methods: {
    ...mapActions('workexperience', ['createWorkexperience', 'updateWorkexperience']),
    submit() {
      this.$refs.workForm.$refs.workForm.validate(valid => {
        if (valid) {
          if (this.ifCreateUpdate === '1') {
            this.createWorkexperience({ ...this.$refs.workForm.workForm }).then(res => {
              this.$message.success(res)
              this.visible = false
            })
          } else if (this.ifCreateUpdate === '2') {
            this.updateWorkexperience({ ...this.$refs.workForm.workForm }).then(res => {
              this.$message.success(res)
              this.visible = false
            })
          }
        }
      })
    },
    close() {
      this.visible = false
      this.$emit('operate', this.visible)
      this.$refs.workForm.$refs.workForm.resetFields()
    }
  }
}
</script>
<style lang='scss'>
.el-dialog{
  .el-dialog__header{
    height: 51px;
    padding-left: 30px !important;
    border-bottom: 1px solid #D0D0D0;
    .el-dialog__title{
      font-size: 16px !important;
      color: #333333;}
  }
  .el-dialog__body{
    padding: 36px 71px 24px 71px;
  }
  .el-dialog__footer{
     padding: 0 71px 24px 71px;
     .el-button{background: #F68020;width: 108px;border-color:#F68020}
  }
}
</style>
