<template>
  <div>
    <el-form ref="caseInfoForm" :model="caseInfo" :rules="caseInfoRules" label-width="150px">
      <el-form-item label="案例标题" prop="title">
        <el-input v-model="caseInfo.title" size="small" />
      </el-form-item>
      <el-form-item label="委托人" prop="client">
        <el-input v-model="caseInfo.client" size="small" />
      </el-form-item>
      <el-form-item label="所属行业" prop="industryId">
        <a-tree-select
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="industryData"
          v-model="caseInfo.industryId"
          show-search
          style="width: 100%"
          tree-node-filter-prop="title"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="所属领域" prop="practiceAreaId">
        <a-tree-select
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="nolawsuitTreeData"
          v-model="caseInfo.practiceAreaId"
          show-search
          style="width: 100%"
          tree-node-filter-prop="title"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="主管机关" prop="administrativeOrgan">
        <el-input v-model="caseInfo.adminstrativeOrgan" size="small"/>
      </el-form-item>
      <el-form-item label="搜索引擎关键字" prop="">
        <el-input v-model="caseInfo.keywords" size="small" />
      </el-form-item>
      <el-form-item label="搜索引擎描述" prop="">
        <el-input v-model="caseInfo.description" size="small" />
      </el-form-item>
      <el-form-item label="项目时间" prop="endTime">
        <el-date-picker v-model="time" type="daterange" style="width:100%" size="small" @change="selectTime"/>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CaseInfoLawSuit',
  components: {
  },
  props: {
    sourceCaseInfo: {
      type: Object,
      default: function() {
        return {
          title: '', // 标题
          client: '', // 委托人
          industryId: null, // 所属行业
          practiceAreaId: null, // 所属领域
          administrativeOrgan: '', // 主管机关
          endTime: '', // 项目时间
          isClassicCase: false, // 经典案例
          clientType: 0, // 委托人类型
          isGroupment: false, // 群体案件
          isRecommend: false, // 推荐案件
          isPreferenceShowIntro: false, // 优先显示案情介绍
          isPublic: false, // 是否为公共案源
          isEnable: true // 是否冻结 true 未冻结 false 冻结
        }
      }
    }
  },
  data() {
    return {
      time: '',
      caseInfo: {
        title: '', // 标题
        client: '', // 委托人
        industryId: null, // 所属行业
        practiceAreaId: null, // 所属领域
        administrativeOrgan: '', // 主管机关
        startTime: '', // 项目开始时间
        endTime: '', // 项目时间
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
        industryId: [
          { required: true, message: '请选则所属行业', trigger: 'blur' }
        ],
        practiceAreaId: [
          { required: true, message: '请选则所属领域', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择项目时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      clientType: state => state.case.clientType,
      nolawsuitTreeData: state => state.practice.nolawsuitTreeDataForAntd,
      industryData: state => state.industry.industryDataForAntd
    })
  },
  watch: {
    sourceCaseInfo(val) {
      this.caseInfo = val
      this.time = [val.startTime, val.endTime]
    }
  },

  mounted() {
  },

  methods: {
    practiceChange(val) {
      this.caseInfo.practiceAreaId = val
    },
    industryChange(val) {
      this.caseInfo.industryId = val
    },
    lawyerChange(val) {
      this.caseInfo.lawyerIds = val
    },
    selectTime(val) {
      this.caseInfo.startTime = val[0]
      this.caseInfo.endTime = val[1]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>

