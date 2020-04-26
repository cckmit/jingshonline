<template>
  <div>
    <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
      <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/case'}" >查找案例</el-breadcrumb-item>
      <el-breadcrumb-item >案例详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="case-info clear">
      <customer-case-info :case-info-data="caseInfoData" />
      <!-- /*右边 -->
      <div class="case-aside">
        <!-- 办理律师 -->
        <customer-case-Lawyers :source-data="caseInfoData" />
        <!-- /* 案件认领-->
        <customer-case-claim :source-data="caseInfoData" />
        <!-- /*相关案例 -->
        <customer-case-related :source-data="caseInfoData" />
      </div>
      <ExtraWrap :share-url="shareUrl" :top="'200px'" :left="'100px'" :catalog-data="activities" :in-colection="isFollow" @download="download" @collection="collectionCase" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
import ExtraWrap from '@/components/ExtraWrap'
import errorImg from '@/assets/case/case-avatar.png'
import CustomerCaseClaim from './components/CaseClaim'
import CustomerCaseLawyers from './components/CaseLawyers'
import CustomerCaseRelated from './components/CaseRelated'
import CustomerCaseInfo from './components/CaseInfo'
export default {
  layout: 'web',
  name: 'CaseInfo',
  head() {
    return {
      title: '案例详情',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线案例详情；jingshonline' }
      ]
    }
  },
  components: {
    CustomerCaseInfo,
    ExtraWrap,
    CustomerCaseClaim,
    CustomerCaseLawyers,
    CustomerCaseRelated
  },

  data() {
    return {
      shareUrl: '',
      errorImg: errorImg,
      loading: false,
      caseId: 0,
      isFollow: false,
      caseInfoData: [],
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
    this.shareUrl = `${window.location.origin}/case/${this.$route.params.id}/info`
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
.case-info{
  font-size: 14px;
  margin-bottom: 30px;
  // 右边
  .case-aside{
    width:360px;
    margin-left: 16px;
    float: right;
  }
}

</style>

