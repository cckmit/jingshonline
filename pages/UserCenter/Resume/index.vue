<template>
  <div>
    UserCenter Resume
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
