<template>
  <div style="width:1380px;min-width:1380px;margin:auto;min-height:1000px;margin-bottom:120px">
    <el-row class="case-id caseInfoClass">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/case'}" >查找案例</el-breadcrumb-item>
        <el-breadcrumb-item >案例详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 左边 -->
      <el-col v-bind="caseInfoData" class="case-content case-border">
        <!-- 概要信息 -->
        <div class="case-content-title">
          <span id="client" class="case-title"><i class="titleIcon"/> 概要信息</span>
          <p style="float:right">更新时间：<span class="case-font-hover"> {{ caseInfoData.updateTime }}</span></p>
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
                <el-form-item label="浏览次数:"><p class="case-font-hover"> {{ caseInfoData.clickCount }}</p></el-form-item>
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
          <!-- <el-form ref="form" label-width="0">
            <el-form-item>
              <p id="First" class="case-title"><i class="titleIcon"/> 当事人信息</p>
              <p></p>
            </el-form-item>
            <el-form-item>
              <p id="Second" class="case-title"><i class="titleIcon"/>审理经过</p>
              <p></p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/>原告诉称</p>
              <p></p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 被告辩称 </p>
              <p></p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 本院查明</p>
              <p></p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 本院认为 </p>
              <p></p>
            </el-form-item>
            <el-form-item>
              <p id="Finally" class="case-title"><i class="titleIcon"/> 裁判结果</p>
              <p>
              </p>
            </el-form-item>
          </el-form> -->
        </div>
      </el-col>
      <!-- /*右边 -->
      <el-col class="case-aside">
        <!-- 办理律师 -->
        <div class="case-aside-main case-aside-blls case-border">
          <div class="case-aside-title case-title">
            <span class="case-title"><i class="titleIcon"/>办理律师</span>
          </div>
          <div>
            <case-Lawyers :source-data="caseInfoData" />
          </div>
        </div>
        <!-- /* 案件认领-->
        <div class="case-aside-main case-aside-ajrl case-border">
          <div class="case-aside-title case-title">
            <span class="case-title"><i class="titleIcon"/>案件认领</span>
          </div>
          <div>
            <case-claim :source-data="caseInfoData" />
          </div>
        </div>
        <!-- /*相关案例 -->
        <div class="case-aside-main case-aside-xgal case-border">
          <div class="case-aside-title case-title">
            <span class="case-title"><i class="titleIcon"/>相关案例</span>
          </div>
          <div class="case-aside-desc">
            <case-related :source-data="caseInfoData" />
          </div>
        </div>
      </el-col>
    </el-row>
    <ExtraWrap :plugins="'catalog,collection,catalogdownload,error,qrcode,totop,share'" :top="200" :left="100" :catalog-data="activities" :in-colection="isFollow" @download="download" @collection="collectionCase"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
import ExtraWrap from '@/components/ExtraWrap'
import errorImg from '@/assets/case/case-avatar.png'
import CaseClaim from './components/CaseClaim'
import CaseLawyers from './components/CaseLawyers'
import CaseRelated from './components/CaseRelated'
export default {
  layout: 'case',
  head() {
    return {
      title: '案例详情',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线案例详情；jingshonline' }
      ]
    }
  },
  components: {
    ExtraWrap,
    CaseClaim,
    CaseLawyers,
    CaseRelated
  },

  data() {
    return {
      errorImg: errorImg,
      loading: false,
      caseId: 0,
      isFollow: false,
      caseInfoData: [],
      // activities: [{
      //   id: 'client',
      //   title: '概要信息'
      // }, {
      //   id: 'First',
      //   title: '当事人信息'
      // }, {
      //   id: 'Second',
      //   title: '审理经过'
      // }, {
      //   id: 'After',
      //   title: '原告辩称'
      // }, {
      //   id: 'Third',
      //   title: '被告辩称'
      // }, {
      //   id: 'Fourth',
      //   title: '本院查明'
      // }, {
      //   id: 'Fifth',
      //   title: '本院认为'
      // }, {
      //   id: 'Finally',
      //   title: '裁判结果'
      // }],
      activities: [{
        id: 'client',
        title: '概要信息'
      }, {
        id: 'detail',
        title: '详情'
      }]
    }
  },
  async asyncData({ params }) {
    const [caseInfoData] = await Promise.all([
      axios.get(`${process.env.baseUrl}/${setting.apiPrefix}/customer/case/get/${params.id}`, { 'Content-Type': 'application/json' })
    ])
    return {
      caseInfoData: caseInfoData.data.data,
      isFollow: caseInfoData.data.data ? caseInfoData.data.data.isFollow : false
    }
  },
  beforeRouteEnter(to, from, next) { // 增加浏览量
    if (from.path !== '/') {
      next(vm => {
        const caseId = vm.$route.params.id
        vm.caseClickCount(caseId).then(res => {
          if (res === 'ok') {
            console.log('+1')
          }
        })
      })
    } else {
      next()
    }
  },
  created() {
    this.caseId = this.$route.params.id
  },
  mounted() {
  },
  methods: {
    ...mapActions('case', ['getCaseInfoData', 'caseFollowClick', 'caseUnfollowClick', 'caseClickCount']),
    // 获取案件
    getcaseInfoData(delayTime = 150) {
      this.loading = true
      setTimeout(this.request, delayTime)
    },
    request() {
      this.getCaseInfoData(this.caseId).then(res => {
        this.caseInfoData = res
        this.isFollow = res.isFollow
        this.loading = false
      })
    },
    // 收藏点击事件
    collectionCase() {
      const coll = !this.isFollow
      const id = this.caseInfoData.id
      if (coll) { // 收藏
        this.caseFollowClick(id).then(res => {
          this.$notify({
            message: res,
            type: 'success'
          })
          this.isFollow = true
        })
      } else {
        // 取消收藏
        this.caseUnfollowClick(id).then(res => {
          this.$notify({
            message: res,
            type: 'success'
          })
          this.isFollow = false
        })
      }
    },
    // 下载事件
    download() {
      console.log('下载')
    }
  }
}
</script>

<style lang='scss' scoped>
//本页面公共样式
.caseInfoClass{
  font-family: MicrosoftYaHei;
  font-size: 14px;

// 左边标题
.case-title {
    font-size: 16px;
    color: #333333;
}

img {
    width: 100%;
}
   //边框
.case-border {
    border: solid 1px rgba(229, 229, 229, 0.3);
}
  //  已选择
.case-font-hover {
    color: #f68020 !important;
}

.case-content-hover {
    border-bottom: 4px solid #f68020
}
ul li {
    display: block;
    list-style-type: none;
    width: auto;
    margin: 0 auto;
}
// 标题图标
.titleIcon {
    display: inline-block;
    width: 4px;
    height: 12px;
    background-color: #f68020;
    border-radius: 2px;
    margin-right: 5px;
}
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

.case-content-title {
    display: block;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px rgba(217, 217, 217, 0.3);
    padding: 0 20px;
}

.case-content-desc {
    padding: 20px;
    line-height: 30px;
    color: #999999;
    .el-row{
    padding-bottom: 20px;
    border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
}

  }

.case-content-main {
    padding: 0 20px 20px 20px;
.case-judgment{
   line-height: 36px;
    color: #333333;
}
  }
}
// 右边
.case-aside{
  width:360px;
  margin-left: 16px;
  .case-aside-main{
    margin-bottom: 20px;
  }
  .case-aside-title{
	height: 49px;
  line-height: 49px;
  padding-left: 20px;
  border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
}
.case-aside-desc{
  margin:10px 0;
  p{
    padding:5px 15px;
	letter-spacing: 0px;
	color: #666666;
  }
  p:hover{ color:#f68020;}
}

// 相关案例
.case-aside-xgal {
   background:white;
    .el-form-item{
    margin-bottom: 5px;
}

.el-form-item__content {
    line-height: 30px;
}
}
// 办理律师
.case-aside-blls {
  background:white;
}

// 案件认领
.case-aside-ajrl
{
   background:white;
}
}
 }

</style>

