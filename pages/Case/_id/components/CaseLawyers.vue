<template>
  <div class="case-aside-blls">
    <div class="case-aside-title">
      <span class="case-title"><i class="titleIcon"/>办理律师</span>
    </div>
    <div class="case-lawyers">
      <el-collapse v-model="activeNames" accordion class="case-lawyers-collapse">
        <el-collapse-item v-for="(item,index) in sourceData.lawyers" :key="index" :name="index">
          <template v-if="isShow" slot="title">
            <div class="case-lawyers-li">
              <el-col :span="9" class="case-lawyers-imgBox">
                <div class="case-lawyers-img">
                  <img v-if="item.avatar!=''" :src="item.avatar">
                  <img v-if="item.avatar===''" src="@/assets/case/case-avatar.png">
                  <div class="case-lawyers-name">{{ item.realName }}</div>
                </div>
              </el-col>
              <el-col :span="15" class="case-lawyers-p">
                <p style="font-size:16px">{{ item.realName }}</p>
                <p style="font-size:14px">{{ item.lawfirmName }}</p>
              </el-col>
            </div>
          </template>
          <div class="case-lawyers-photo">
            <div class="case-lawyers-img"><img :src="item.avatar" onerror="@/assets/case/case-avatar.png" alt=""></div>
            <div>{{ item.realName }} 律师</div>
          </div>
          <div class="case-lawyers-info">
            <p>毕业院校：<span>{{ item.licenceNo?item.licenceNo:'暂无数据' }}</span></p>
            <p>最高学历：<span>{{ item.highestDegree?item.highestDegree:'暂无数据' }}</span></p>
            <p>执业地点：<span>{{ item.regionName?item.regionName:'暂无数据' }}</span></p>
            <p>所属律所：<span>{{ item.lawfirmName }}</span></p>
            <p v-if="item.practiceareas.length!==0">擅长领域：<span v-for="practice in item.practiceareas" :key="practice.knowledgeId" style="margin-right:10px">{{ practice.name }}</span></p>
            <p v-if="item.practiceareas.length===0">擅长领域：<span>暂无数据</span></p>
            <p v-if="item.industries.length===0">业务专长：<span>暂无数据</span></p>
            <p v-if="item.industries.length!==0">业务专长：<span v-for="industry in item.industries" :key="industry.knowledgeId" style="margin-right:10px">{{ industry.name }}</span></p>
            <p>案例总数：<span>{{ item.caseCount }}</span></p>
            <p>更新时间：<span>{{ item.updateTime }}</span></p>
            <p>浏览次数：<span class="case-font-hover">{{ item.clickCount ?item.clickCount:'0' }}</span></p>
            <p>关注人数：<span class="case-font-hover">{{ item.followerCount }}</span></p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CaseLawyersComponents',
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
      activeNames: 0,
      isShow: true
    }
  },
  watch: {
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
  .case-aside-blls{
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
    .case-lawyers{
      img{
        width:100%
      }
      .case-lawyers-li {
        width: 100%;
        height: 102px;
        .case-lawyers-p {

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        margin-top: 10px;
        p{
        color: #333333;
        }
      }
      .case-lawyers-imgBox {
        .case-lawyers-name{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 76px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          background-color: #000000;
          opacity: 0.6;
          font-size: 12px;
          color: #ffffff;
        }

        .case-lawyers-img {
            position: relative;
            width: 76px;
            height: 76px;
            overflow: hidden;
            background-color: #dbdbdb;
            margin: 8px 15px;
        }
      }
    }

      .case-lawyers-info {
        margin-bottom: 20px;
        margin-left: 30px;
        margin-right: 30px;
        p {
        color: #999999;
        line-height: 30px;
        span{
          color: #333333;
        }
      }
      }

      .case-lawyers-photo {
        margin: auto;
        text-align: center;
        margin-bottom: 20px;
        margin: 30px 70px;
        .case-lawyers-img{
          margin-bottom: 20px;
          width: 202px;
          height: 202px;
          overflow: hidden;
          background-color: #e9e9e9;
        }
      }
    }
  }

</style>
<style lang='scss'>
//办理律师隐藏头部
.case-lawyers{
  .el-collapse{
    padding: 0 !important;
  }
  .case-lawyers-collapse{
    .el-collapse-item.is-active{
      >div:first-child{
        display: none;
      }
    }
    .el-collapse-item__header{
      height: 114px !important;
      line-height:35px !important;
    }
  }
}
</style>

