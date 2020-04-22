<template>
  <div class="five_content">
    <h2>{{ isUpdate?'您已完成案件的编辑':` 您已完成 ${caseType===1?'诉讼':'非诉'} 案例的添加` }}</h2>
    <p>您所{{ isUpdate?'编辑':'添加' }}的案例正在 <span>审核中...</span> 您可以点击下方按钮按照步骤继续添加案例。</p>
    <router-link v-if="isUpdate" :to="{path:'/userCenter/case/create?type=1'}">添加诉讼案件 ></router-link>
    <span v-else @click="add(1)">添加诉讼案件 ></span>
    <router-link v-if="isUpdate" :to="{path:'/userCenter/case/create?type=2'}">添加非诉案件 ></router-link>
    <span v-else @click="add(2)">添加非诉案件 ></span>
    <router-link :to="{path:'/usercenter'}">返回首页</router-link>

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
  props: {
    caseType: {
      type: Number,
      default: () => { return 1 }
    }
  },
  data() {
    return {
      isUpdate: this.$route.fullPath.indexOf('update') >= 0
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    add(type) {
      this.$emit('five', type)
    }
  }
}
</script>
<style lang='scss' scoped>
.five_content{
  text-align: center;
  padding: 170px;
  background: #fff;
  margin-bottom: 90px;
  h2{
    margin-bottom: 30px;
    font-size: 24px;
  }
  p{
    margin-bottom: 96px;
    font-size: 16px;
    span{
      color: #FF7200;
      font-weight: bold;
    }
  }
  >span,a{
    display: block;
    width: 300px;
    height: 46px;
    line-height: 46px;
    color: #fff;
    border-radius: 5px;
    background: #F68020;
    font-size: 18px;
    margin:0 auto 30px auto;
    cursor: pointer;
    &:last-child{
      background: #D3D3D3;
      margin-bottom: 74px;
    }
  }
}
</style>
