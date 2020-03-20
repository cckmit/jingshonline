<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="5">
        <div style="height:350px;background:#fff;margin-bottom:25px;">
          个人信息
        </div>
        <div style="height:200px;background:#fff;margin-bottom:25px;">
          擅长领域
        </div>
        <div style="height:200px;background:#fff;margin-bottom:25px;">
          添加案件
        </div>
        <div style="height:200px;background:#fff;margin-bottom:25px;">
          统计图表
        </div>
      </el-col>
      <el-col :span="19">
        <el-row>

          <el-col :span="10">
            <div style="height:320px;background:#fff;margin-bottom:40px;margin-right:15px;">
              案件审核状态
            </div>
          </el-col>
          <el-col :span="14">
            <div style="height:320px;background:#fff;margin-bottom:40px;margin-left:15px;">
              消息提示
            </div>
          </el-col>
          <el-col :span="24" style="height:600px;background:#fff;margin-bottom:25px;">案件列表</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心',
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
