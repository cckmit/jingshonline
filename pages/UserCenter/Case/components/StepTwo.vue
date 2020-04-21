<template>
  <div class="two_content">
    <CaseInfoLawSuit v-if="type===1" ref="caseInfo"/>
    <CaseInfoLawNotSuit v-if="type===2" ref="caseInfo"/>
  </div>
</template>
<script>
import CaseInfoLawSuit from './case-info-law-suit'
import CaseInfoLawNotSuit from './case-info-law-notSuit'
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
    CaseInfoLawSuit,
    CaseInfoLawNotSuit
  },
  props: {
    type: {
      type: Number,
      default: null
    }
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
<style lang='scss'>
.two_content{
  text-align: left;
}
</style>
