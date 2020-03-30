<template>
  <div :source-data="sourceData" class="case-claim">
    <div @click="claimsVisible=true,claim=sourceData.lawyers">
      <el-form ref="form" label-width="0">
        <el-form-item v-for="(item,index) in sourceData.lawyers" :key="index" :name="index">
          <div class="case-aside-li" style="cursor: pointer;">
            <el-col :span="8" class="case-aside-imgBox">
              <div class="case-aside-img">
                <img src="@/assets/case/case-avatar.png" alt="">
                <div class="case-aside-claim">我要认领</div>
              </div>
            </el-col>
            <el-col :span="15" class="case-aside-p">
              <p>{{ item.realName }}</p>
              <p>{{ item.lawfirmName }}</p>
            </el-col>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <case-claim-dialog :source-data="claim" :source-visible="claimsVisible" @operate="claims" />
  </div>
</template>
<script>

import CaseClaimDialog from './CaseClaimDialog'
export default {
  name: 'CaseClaim',
  components: {
    CaseClaimDialog
  },
  props: {
    sourceData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      claim: [], // 认领案例
      claimsVisible: false // 弹框
    }
  },
  watch: {
  },
  methods: {
    claims() {
      this.claimsVisible = false
      // this.getcaseInfoData()
    }
  }
}
</script>
<style lang='scss' scoped>
.case-claim{
    .case-aside-imgBox{
.case-aside-claim{
  position: absolute;
    left: 0;
    bottom: 25px;
    width: 76px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #333333;
}

.case-aside-img
{
    position: relative;
    width: 76px;
    height: 76px;
    background-color: #dbdbdb;
    margin: 8px 15px;
    img{
      width: 100%;
      height: 100%;
    }
}
}
.case-aside-li
{
    opacity: 0.9;
    background-color: #e5e5e5;
    height: 102px;
    padding: 5px 0px 5px 10px;
    .case-aside-p p{
    color: #333333;
}

.case-aside-p p:nth-child(1)
{
    font-size: 16px;
    margin-top: 10px;
}

}
.el-form-item
{
    margin-bottom: 0;
    padding: 10px;
    border-bottom: solid 1px rgba(217, 217, 217, 0.3);
}
}
</style>

