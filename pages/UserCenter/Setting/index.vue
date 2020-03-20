<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="5">
        <div style="height:350px;background:#fff;margin-bottom:25px;">
          个人信息
        </div>
        <div style="height:200px;background:#fff;margin-bottom:25px;">
          个人中心
        </div>
        <div style="height:200px;background:#fff;margin-bottom:25px;">
          添加案件
        </div>
      </el-col>
      <el-col :span="19">
        <el-row>
          <el-col :span="24" style="height:480px;background:#fff;margin-bottom:40px;">修改密码</el-col>
          <el-col :span="24" style="height:440px;background:#fff;margin-bottom:40px;">修改绑定手机</el-col>
          <el-col :span="24" style="height:380px;background:#fff;margin-bottom:40px;">修改绑定邮箱</el-col>

        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterSetting',
  // middleware: 'auth',
  head() {
    return {
      title: '用户中心-个人设置',
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
