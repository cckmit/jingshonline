<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="5">
        <div style="height:350px;background:#fff;margin-bottom:25px;">
          个人信息
        </div>
      </el-col>
      <el-col :span="19">
        <el-row>
          <el-col :span="24" style="height:140px;background:#fff;margin-bottom:20px;">个人简介</el-col>
          <el-col :span="24" style="height:310px;background:#fff;margin-bottom:20px;">工作经历</el-col>
          <el-col :span="24" style="height:310px;background:#fff;margin-bottom:20px;">教育经历</el-col>
          <el-col :span="24" style="height:180px;background:#fff;margin-bottom:20px;">学术成果</el-col>
          <el-col :span="24" style="height:180px;background:#fff;margin-bottom:20px;">行业资质</el-col>
          <el-col :span="24" style="height:270px;background:#fff;margin-bottom:20px;">社会职务</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  // middleware: 'auth',
  head() {
    return {
      title: '用户中心-律师简介',
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
