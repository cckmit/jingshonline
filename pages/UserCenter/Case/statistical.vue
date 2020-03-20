<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="12" style="margin-bottom:20px;">
        <div style="height:340px;background:#fff;">
          案例统计
        </div>
      </el-col>
      <el-col :span="12" style="margin-bottom:20px;">
        <div style="height:340px;background:#fff;">
          案例统计分布图
        </div>
      </el-col>
      <el-col :span="12" style="margin-bottom:20px;">
        <div style="height:340px;background:#fff;">
          诉讼领域(分布图)
        </div>
      </el-col>
      <el-col :span="12" style="margin-bottom:20px;">
        <div style="height:340px;background:#fff;">
          非诉领域(分布图)
        </div>
      </el-col>
      <el-col :span="24">
        <div style="height:330px;background:#fff;">
          年案件月统计
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterCaseStatistical',
  // middleware: 'auth',
  head() {
    return {
      title: '用户中心-案件统计',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
  },
  data() {
    return {
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>
