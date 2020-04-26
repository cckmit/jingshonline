<template>
  <div class="case-aside-main case-aside-xgal case-border">
    <div class="case-aside-title">
      <span class="case-title"><i class="titleIcon"/>相关案例</span>
    </div>
    <div class="case-aside-desc">
      <ul>
        <li v-for="(item, index) in sourceData.lawyers" :key="index">
          <!-- <nuxt-link :to="`/case/${item.lawyerId}/info`"> -->
          <p> {{ index+1 }}.{{ item.lawfirmName }}</p>
          <!-- </nuxt-link> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CaseRelated',
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
    }
  },
  watch: {
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
.case-aside-xgal{
  margin-bottom: 20px;
  background:white;
  border: solid 1px rgba(229, 229, 229, 0.3);
  .case-aside-title{
    height: 49px;
    line-height: 49px;
    padding-left: 20px;
    border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
    // 标题
    .case-title {
      font-size: 16px;
      color: #333333;
        // 标题图标
      .titleIcon {
        display: inline-block;
        width: 4px;
        height: 12px;
        background-color: #f68020;
        border-radius: 2px;
        margin-right: 5px;
      }
    }
  }
  .case-aside-desc{
    margin:10px 0;
    p{
      padding:5px 15px;
      letter-spacing: 0px;
      color: #666666;
      cursor: pointer;
    }
    p:hover{ color:#f68020;}
  }
}
</style>

