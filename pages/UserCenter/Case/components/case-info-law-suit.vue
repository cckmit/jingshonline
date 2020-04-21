<template>
  <el-form ref="caseInfoForm" :model="caseInfo" :rules="caseInfoRules" label-position="left" label-width="150px">
    <el-form-item label="案例标题" prop="title">
      <el-input v-model="caseInfo.title" size="small" />
    </el-form-item>
    <el-form-item label="委托人" prop="client">
      <el-input v-model="caseInfo.client" size="small" />
    </el-form-item>
    <el-form-item label="利益相对方" prop="relative">
      <el-input v-model="caseInfo.relative" size="small" />
    </el-form-item>
    <el-form-item label="第三人" prop="thirdParty">
      <el-input v-model="caseInfo.thirdParty" size="small" />
    </el-form-item>
    <el-form-item label="所属领域" prop="practiceAreaId">
      <a-tree-select
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="lawsuitPracticeTreeData"
        v-model="caseInfo.practiceAreaId"
        style="width: 100%"
        placeholder="Please select"
      />
    </el-form-item>
    <el-form-item label="所属案由" prop="caseReasonId">
      <a-tree-select
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="casereasonTreeData"
        v-model="caseInfo.caseReasonId"
        style="width: 100%"
        placeholder="Please select"
      />
    </el-form-item>
    <el-form-item label="裁判机关" prop="courtId">
      <el-select v-model="caseInfo.courtId" size="small" clearable filterable style="width:100%">
        <el-option
          v-for="item in courtData"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="主管机关" prop="administrativeOrgan">
      <el-input v-model="caseInfo.administrativeOrgan" size="small" />
    </el-form-item>
    <el-form-item label="审级" prop="">
      <el-radio-group v-model="caseInfo.instanceGrade" size="small">
        <el-radio v-for="item in caseOfStage" :key="item.id" :label="item.id" style="margin:5px;">{{ item.displayName }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="搜索引擎关键字" prop="">
      <el-input v-model="caseInfo.keywords" size="small" />
    </el-form-item>
    <el-form-item label="搜索引擎描述" prop="">
      <el-input v-model="caseInfo.description" size="small" />
    </el-form-item>
    <el-form-item label="裁判文书号" prop="judgmentNumber">
      <el-input v-model="caseInfo.judgmentNumber" size="small" />
    </el-form-item>
    <el-form-item label="裁判时间" prop="endTime">
      <el-date-picker v-model="caseInfo.endTime" style="width:100%" size="small" />
    </el-form-item>
    <el-form-item label="经典案例" prop="isClassicCase">
      <el-checkbox v-model="caseInfo.isClassicCase" size="small">经典案例</el-checkbox>
    </el-form-item>
    <el-form-item label="委托人类型" prop="clientType">
      <el-radio-group v-model="caseInfo.clientType" size="small">
        <el-radio v-for="item in clientType" :key="item.id" :label="item.id">{{ item.displayName }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="群体性案件" prop="isGroupment">
      <el-checkbox v-model="caseInfo.isGroupment" size="small">群体案件</el-checkbox>
    </el-form-item>
    <el-form-item label="公共案源" prop="isPublic">
      <el-checkbox v-model="caseInfo.isPublic" size="small">公共案源</el-checkbox>
    </el-form-item>
    <el-form-item label="推荐案件" prop="isRecommend">
      <el-checkbox v-model="caseInfo.isRecommend" size="small">群体案件</el-checkbox>
    </el-form-item>
    <el-form-item label="优先显示" prop="isPreferenceShowIntro">
      <el-checkbox v-model="caseInfo.isPreferenceShowIntro" size="small">优先显示案情介绍</el-checkbox>
    </el-form-item>
    <el-form-item label="冻结" prop="isEnable">
      <el-switch
        v-model="caseInfo.isEnable"
        size="small"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="否"
        inactive-text="是"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
// import caseCourt from '../../components/case-court'
// import casePractice from '../../components/case-practice'
// import caseReason from '../../components/case-reason'
export default {
  name: 'CaseInfoLawSuit',
  components: {
    // caseCourt,
    // casePractice,
    // caseReason,
  },
  props: {
    sourceCaseInfo: {
      type: Object,
      default: function() {
        return {
          title: '', // 标题
          client: '', // 委托人
          relative: '', // 利益向对方
          thirdParty: '', // 第三人
          practiceAreaId: null, // 所属领域
          caseReasonId: null, // 所属案由
          courtId: null, // 裁判机关
          administrativeOrgan: '', // 主管机关
          judgmentNumber: '', // 裁判文书号
          endTime: '', // 裁判时间
          isClassicCase: false, // 经典案例
          clientType: 0, // 委托人类型
          isGroupment: false, // 群体案件
          isRecommend: false, // 推荐案件
          isPreferenceShowIntro: false, // 优先显示案情介绍
          isPublic: false, // 公共案源
          isEnable: true // 是否冻结 true 未冻结 false 冻结
        }
      }
    }
  },
  data() {
    return {
      caseInfo: {
        instanceGrade: null, // 审级
        title: '', // 标题
        client: '', // 委托人
        relative: '', // 利益向对方
        thirdParty: '', // 第三人
        practiceAreaId: null, // 所属领域
        caseReasonId: null, // 所属案由
        courtId: null, // 裁判机关
        administrativeOrgan: '', // 主管机关
        judgmentNumber: '', // 裁判文书号
        endTime: '', // 裁判时间
        isClassicCase: false, // 经典案例
        clientType: 0, // 委托人类型
        isGroupment: false, // 群体案件
        isRecommend: false, // 推荐案件
        isPreferenceShowIntro: false, // 优先显示案情介绍
        keywords: '', // 搜索引擎关键字
        description: '', // 搜索引擎描述
        isEnable: true // 是否冻结 true 未冻结 false 冻结
      },
      caseInfoRules: {
        title: [
          { required: true, message: '请输入案件标题', trigger: 'change' }
        ],
        client: [
          { required: true, message: '请输入委托人', trigger: 'change' }
        ],
        practiceAreaId: [
          { required: true, message: '请选则所属领域', trigger: 'change' }
        ],
        caseReasonId: [
          { required: true, message: '请选则所属案由', trigger: 'change' }
        ],
        courtId: [
          { required: true, message: '请选择所属律师', trigger: 'change' }
        ],
        judgmentNumber: [
          { required: true, message: '请输入裁判文书号', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请输入裁判时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      caseOfStage: state => state.caseOfStage.caseOfStage,
      clientType: state => state.case.clientType,
      lawsuitPracticeTreeData: state => state.practice.lawsuitTreeDataForAntd,
      casereasonTreeData: state => state.caseReason.casereasonTreeDataForAntd,
      courtData: state => state.court.courtData
    })
  },
  watch: {
    sourceCaseInfo(val) {
      this.caseInfo = val
    }
  },

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang='scss' scoped>

</style>
