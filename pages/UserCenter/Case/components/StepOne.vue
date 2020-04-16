<template>
  <div>
    <h2>您已成功通过了律师身份认证。</h2>
    <p>您可以点击下方按钮按照步骤进行对应案件的添加。</p>
    <div>
      <span>添加诉讼案件 <i class="el-icon-arrow-right"/></span>
      <span>添加非讼案件 <i class="el-icon-arrow-right"/></span>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterCaseStatistical',
  middleware: 'auth',
  head() {
    return {
      title: '添加案例-我的案例-用户中心-京师在线',
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
h2,p{
  text-align: center;
  margin-bottom: 30px;
}
p{
  margin-bottom: 120px;
}

div{
  text-align: center;
  margin-bottom: 187px;
  span{
    display: inline-block;
    width: 340px;
    height: 124px;
    line-height: 124px;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
    background: #F68020;
    color: #fff;
    font-size: 22px;
    &:first-child{
      margin-right: 86px;
    }
  }
}
</style>
