<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter/case'}">我的案例</el-breadcrumb-item>
      <el-breadcrumb-item>编辑案例</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="clear case">
      <el-steps :active="steps" finish-status="success">
        <el-step title="" />
        <el-step title="" @click.native="steps=2" />
        <el-step title="" @click.native="steps=3" />
        <el-step title="" @click.native="steps=4" />
        <el-step title="" @click.native="steps=5" />
      </el-steps>
      <div v-if="steps===2" class="two">
        <StepTwo/>
      </div>
      <div v-if="steps===3" class="three">
        <StepThree/>
      </div>
      <div v-if="steps===4" class="four">
        <StepFour/>
      </div>
      <div v-if="steps===5" class="five">
        <StepFive/>
      </div>
    </div>
  </div>
</template>
<script>
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import StepFour from '../components/StepFour'
import StepFive from '../components/StepFive'
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
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  },
  data() {
    return {
      steps: 5
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
.case{
  min-height: 200px;
  background: #fff;
  padding: 68px 180px 100px 180px;
  margin-bottom: 120px;
  .el-steps{
    margin-bottom: 60px;
    .el-step{
      cursor: pointer;
    }
  }

}
</style>
