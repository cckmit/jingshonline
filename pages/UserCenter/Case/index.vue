<template>
  <div>
    <el-row>
      <el-col :span="6" style="background:#fff;height:540px;">
        条件筛选
      </el-col>
      <el-col :span="18">
        <div style="background:#fff;height:70px;margin-bottom:20px;margin-left:24px;">
          排序
        </div>
        <div style="background:#fff;height:1200px;margin-left:24px;">
          案件列表
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'userCenter',
  name: 'UserCenterCase',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心-案件管理',
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
  computed: {
    ...mapState({
      casereasonTreeData: state => state.caseReason.casereasonTreeData
    })
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
