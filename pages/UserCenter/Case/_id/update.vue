<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter/case'}">我的案例</el-breadcrumb-item>
      <el-breadcrumb-item>编辑案例</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="steps!==5" class="clear case">
      <el-steps :active="steps" finish-status="success">
        <el-step title="" />
        <el-step title="" />
        <el-step title="" />
        <el-step title="" />
      </el-steps>
      <div v-if="steps===1" class="one">
        <StepOne ref="one" @one="one"/>
      </div>
      <div v-if="steps===2" class="two">
        <StepTwo ref="two" :type="caseType"/>
        <el-button v-show="false" size="small" @click="changeSteps(1)">上一步</el-button>
        <el-button size="small" @click="nextToThree">下一步</el-button>
      </div>
      <div v-if="steps===3" class="three">
        <StepThree ref="three" :type="caseType"/>
        <el-button size="small" @click="changeSteps(2)">上一步</el-button>
        <el-button size="small" @click="nextToFour">下一步</el-button>
      </div>
      <div v-if="steps===4" class="four">
        <StepFour ref="four" :type="caseType"/>
        <el-button size="small" @click="changeSteps(3)">上一步</el-button>
        <el-button size="small" @click="submit">完成</el-button>
      </div>
    </div>
    <div v-if="steps===5" class="five">
      <StepFive ref="five" @five="five"/>
    </div>
  </div>
</template>
<script>
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import StepFour from '../components/StepFour'
import StepFive from '../components/StepFive'
import { mapActions } from 'vuex'
export default {
  layout: 'userCenter',
  name: 'UserCenterCaseUpdate',
  middleware: 'auth',
  head() {
    return {
      title: '编辑案例-我的案例-用户中心-京师在线',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  },
  data() {
    return {
      steps: 2,
      caseType: null,
      route: this.$route,
      case: {}
    }
  },
  watch: {

  },
  mounted() {
    this.getCaseInfo()
  },
  methods: {
    ...mapActions('lawyer', ['lawyerCaseUpdate', 'lawyerGetCaseInfo']),
    getCaseInfo() {
      this.lawyerGetCaseInfo(this.$route.params.id).then(res => {
        this.case = res
        this.caseType = res.caseType
      })
    },
    one(type) {
      this.changeSteps(2, type)
    },
    five(type) {
      this.changeSteps(2, type)
    },
    changeSteps(steps, caseType = this.caseType) {
      this.steps = steps
      this.caseType = caseType
    },
    /**
     * 下一步按钮事件，前往第三步
     */
    nextToThree() {
      this.$refs.two.$refs.caseInfo.$refs.caseInfoForm.validate(valid => {
        if (valid) {
          this.case = { ...this.$refs.two.$refs.caseInfo.caseInfo }
          this.changeSteps(3)
        }
      })
    },
    nextToFour() {
      this.case = { ...this.case, judgmentDocument: this.$refs.three.judgmentDocument, files: this.$refs.three.files }
      this.changeSteps(4)
    },
    submit() {
      this.case = { ...this.case, analyses: this.$refs.four.analyses }
      this.lawyerCaseUpdate(this.case).then(res => {
        this.steps = 5
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.case{
  min-height: 200px;
  background: #fff;
  padding: 80px 280px 100px 280px;
  margin-bottom: 120px;
  .el-steps{
    margin-bottom: 90px;
    // .el-step{
    //   cursor: pointer;
    // }
  }
  .one,.two,.three,.four,.five{
    text-align: center;
    .el-button{
      width: 100px;
      margin-top: 100px;
      background: #E5E5E5;
      color: #fff;
      font-size: 14px;
    }
    .el-button+.el-button{
      background: #F68020;
    }
  }
}
</style>
