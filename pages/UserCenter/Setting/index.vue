<template>
  <div>
    UserCenter setting
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
