<template>
  <div>
    <div class="lawyer-info-container">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/LawyerInfo'}">查找律师</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="lawyer-info-card">
        <div v-if="lawyerInformation.status === 2" class="lawyer-isAuthentication"/>
        <div class="lawyer-info-top">
          <a class="lawyer-info-picture" href=":javascript">
            <img :src="lawyerInformation.avatar" alt="律师头像">
          </a>
          <div class="lawyer-info-detail">
            <p class="lawyer-name">{{ lawyerInformation.realName }}</p>
            <p class="lawyer-year"><span>{{ lawyerInformation.experienceYear }}年</span><span>{{ lawyerInformation.caseCount }}例</span></p>
            <p class="lawyer-id"><span>ID: {{ lawyerInformation.id }} 最后更新时间: </span></p>
            <p class="lawyer-time">{{ lawyerInformation.lastModificationTime }} </p>
          </div>
        </div>
        <div class="lawyer-information">
          <h4>基本信息</h4>
          <ul>
            <li><span>所在律所</span>{{ lawyerInformation.lawfirmName }}</li>
            <li><span>所在地</span>{{ lawyerInformation.regionName }}</li>
            <li><span>最高学历</span>{{ lawyerInformation.highestDegree }} </li>
            <li><span>执业证号</span>{{ lawyerInformation.licenceNo }}</li>
          </ul>
          <h4>联系方式</h4>
          <ul>
            <li><span>联系电话</span>{{ lawyerInformation.phone }}</li>
            <li><span>律师邮箱</span>{{ lawyerInformation.email }}</li>
          </ul>
          <h4>业务专长</h4>
          <!-- <ul v-for="(item,index) in lawyerBusiness" :key="index" class="lawyer-business">
            <li><a href=":javascript">{{ item }}</a></li> -->
          <ul class="lawyer-business">
            <li><a href=":javascript">合同纠纷</a></li>
            <li><a href=":javascript">土地房产</a></li>
            <li><a href=":javascript">房产领域纠纷</a></li>
            <li><a href=":javascript">侵权纠纷与赔偿纠纷</a> </li>
            <li><a href=":javascript">土地房产</a></li>
            <li><a href=":javascript">房产领域纠纷</a></li>
            <li><a href=":javascript">侵权纠纷与赔偿纠纷</a> </li>
          </ul>
        </div>
      </div>
      <lawyer-detail :resume-data="resumeData" :lawyer-remark="lawyerInformation.remark" :court-data="courtData" :chart-data="chartData"/>
    </div>
  </div>
</template>

<script>
import LawyerDetail from './LawyerDetail'
import axios from 'axios'
import setting from '@/plugins/setting'
export default {
  layout: 'lawyer',
  components: {
    LawyerDetail
  },
  head() {
    return {
      title: '律师详情',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线律师详情；jingshonline-lawyerinfo' }
      ]
    }
  },
  async asyncData({ params }) {
    const [LawyerResumeData, LawyerInformation, CourtData, ChartData] = await Promise.all([
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/lawyer/resume/get`, { params: { lawyerId: params.id }}, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/lawyer/get/${params.id}`, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/case/frequent/region/court/${params.id}`, {}, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/case/frequent/chart/practicearea/${params.id}`, {}, { 'Content-Type': 'application/json' })
    ])
    // 律师业务专长
    const lawyerBusiness = LawyerInformation.data.data.practiceareas.map(item => {
      return item.name
    }).concat(LawyerInformation.data.data.industries.map(item => {
      return item.name
    }))
    const resume = LawyerResumeData.data.data
    console.log(LawyerInformation.data.data)
    return {
      // 律师基本信息
      lawyerInformation: LawyerInformation.data.data,
      // 律师简历数据
      resumeData: {
        workExperiences: resume.workExperiences,
        socialPositions: resume.socialPositions,
        educations: resume.educations,
        certificates: resume.certificates,
        academics: resume.academics
      },
      // 律师常去法院数据
      courtData: CourtData.data.data,
      // 律师业务专长
      lawyerBusiness: lawyerBusiness,
      // 图表数据
      chartData: ChartData.data.data
    }
  },
  data() {
    return {
      // 律师履历信息
      resumeData: {
        workExperiences: [],
        socialPositions: [],
        educations: [],
        certificates: [],
        academics: []
      },
      // 律师基本信息 缺少手机号 以及律师备注信息（律师简介）
      lawyerInformation: {
        id: 0, // 律师Id
        realName: '', // 真实姓名
        email: '', // 邮箱
        phone: '', // 律师电话 缺少返回信息
        lawfirmName: '', // 律所
        avatarPathId: null, // 头像路径Id
        avatar: '', // 头像路径
        sex: 0, // 性别 0女 1 男
        licenceNo: '', // 执业证号
        licenceDate: '', // 颁发执业证日期 2019-12-30 09:34:20
        isShowExperience: false, // 是否显示工作年限
        experienceYear: '', // 从业年限
        isRecommend: true, // 是否为推荐律师
        isDirector: true, // 是否为主任律师
        regionName: '', // 地区 天津-和平区
        highestDegree: '', // 最高学位
        status: 0, // 律师目前状态 0-未审核  1 审核通过 2 审核未通过   3 已冻结
        followerCount: 0, // 关注人数（关注度）
        clickCount: 0, // 律师浏览量
        caseCount: 0, // 案例总数
        lastModificationTime: '', // 最后更新时间 2019-12-30 09:34:20
        practiceareas: [], // 律师擅长领域 [{knowledgeId:领域/行业Id,name:领域/行业名称,caseCount:案例数}]
        industries: [] // 律师擅长行业 [{knowledgeId:领域/行业Id,name:领域/行业名称,caseCount:案例数}]
      },
      courtData: [],
      regionData: [],
      lawyerBusiness: [],
      chartData: []
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/case/frequent/chart/practicearea/${this.$route.params.id}`, {}, { 'Content-Type': 'application/json' }).then(res => {
      console.log(res)
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.lawyer-info-container {
  min-width: 1376px;
  max-width: 1376px;
  margin: 0 auto;
  background: #f2f2f2;
  overflow: hidden;
  .lawyer-info-card {
    background: #fff;
    float: left;
    position: relative;
    width: 314px;
    border: 2px solid #f1f1f1;
    padding: 18px 0 18px 18px;
    height: auto;
    box-sizing: border-box;
    margin-right: 16px;
    .lawyer-isAuthentication {
      position: absolute;
      width: 54px;
      height: 54px;
      background-image: url("../../../assets/lawyerinfo/isAuthentication.png");
      background-size: 100% 100%;
      top: 0;
      right: 0;
    }
    .lawyer-info-top{
      padding-bottom: 16px;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      .lawyer-info-picture {
        display: block;
        width: 128px;
        height: 162px;
        box-sizing: border-box;
        padding: 2px;
        border: 1px solid #d7d7d7;
        margin-right: 20px;
      img {
        display: block;
        width: 122px;
        height: 156px;
      }
      }
    .lawyer-info-detail {
        font-size: 12px;
        box-sizing: border-box;
      .lawyer-name {
        font-size: 24px;
        margin: 30px 0 20px 0;
      }
      .lawyer-year {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 7px;
        span {
          margin-right: 11px;
          padding: 3px 9px;
          color: #fff;
          background: #f68020;
        }
      }
      .lawyer-id,.lawyer-time {
        color: #666666;
        line-height: 24px;
      }
    }
    }
    .lawyer-information {
      h4 {
        margin-top: 13px;
        font-size: 16px;
        color: #333;
        padding-bottom: 9px;
        border-bottom: 1px dashed #ececec;
        margin-bottom: 17px;
      }
      ul li {
        list-style: none;
        font-size: 14px;
        line-height: 14px;
        color: #333;
        margin-bottom: 27px;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        span {
          width: 58px;
          display: inline-block;
          color: #dbdbdb;
          margin-right: 19px;
        }
      }
      .lawyer-business {
        display: flex;
        flex-wrap: wrap;
        li {
          border: 1px solid #ddd;
          border-radius: 5%;
          margin: 0 20px 14px 0;
          padding: 4px 14px;
          a {
            text-decoration: none;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
