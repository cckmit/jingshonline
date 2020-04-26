<template>
  <div>
    <el-col class="case-content case-border">
      <!-- 概要信息 -->
      <div class="case-content-title">
        <span id="client" class="case-title"><i class="titleIcon"/> 概要信息</span>
        <p style="float:right">更新时间：<span class="case-hover"> {{ caseInfoData.updateTime }}</span></p>
      </div>
      <!-- 案件信息 -->
      <div class="case-content-desc">
        <el-row>
          <el-form ref="form" label-width="100px">
            <el-col :span="11">
              <el-form-item label="主办律师:"><p> {{ caseInfoData.lawyers[0].realName }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="判决时间:"><p>{{ caseInfoData.endTime }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item v-if="caseInfoData.caseType===1" label="所属法院:"><p> {{ caseInfoData.courtName }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item v-if="caseInfoData.caseType===1" label="涉案案由:"><p>{{ caseInfoData.caseReasonName }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item v-if="caseInfoData.caseType===1" label="文书号码:"><p> {{ caseInfoData.judgmentNumber }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所属领域:"><p>{{ caseInfoData.practiceAreaName }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="浏览次数:"><p class="case-hover"> {{ caseInfoData.clickCount }}</p></el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item v-if="caseInfoData.caseType===2" label="所属行业:"><p>{{ caseInfoData.industryName }}</p></el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <!-- 其他信息 -->
      <div id="detail" class="case-content-main">
        <div class="case-judgment" v-html="caseInfoData.judgmentDocument">{{ caseInfoData.judgmentDocument }}</div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'CaseInfoComponents',
  head() {
    return {
      title: '案件详情',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线-案件详情' }
      ]
    }
  },
  components: {
  },
  props: {
    caseInfoData: {
      type: Object,
      default: () => {}
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
<style lang='scss' scoped>
.case-content {
  width: 1004px;
  background:white;
    // 概要信息
  .el-form-item{
    margin-bottom: 0;
    line-height: 30px;
  }

  .el-form-item__label {
    font-size: 14px;
    color: #999999;
  }
  // 概要信息标题
  .case-content-title {
    display: block;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px rgba(217, 217, 217, 0.3);
    padding: 0 20px;
  }
  // 概要信息内容
  .case-content-desc {
    padding: 20px;
    line-height: 30px;
    color: #999999;
    .el-row{
    padding-bottom: 20px;
    border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
    }
  }
  // 其他信息
  .case-content-main {
    padding: 0 20px 20px 20px;
   .case-judgment{
    line-height: 36px;
    color: #333333;
   }
  }
}
</style>
