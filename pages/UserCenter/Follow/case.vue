<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
        <el-breadcrumb-item>我的关注</el-breadcrumb-item>
        <el-breadcrumb-item>案例列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="6">
      <div class="bgf tree_left">
        <b><img src="../../../assets/usercenter/screen.png" alt="" >条件筛选</b>
        <p>所属行业</p>
        <el-input
          v-model="filterText"
          clearable
          placeholder="所属行业"/>
        <p>所属案由</p>
        <el-input
          v-model="lawyerfilterText"
          clearable
          placeholder="输入关键字进行过滤"/>
        <p>专业领域</p>
        <el-input
          v-model="filterText"
          clearable
          placeholder="输入关键字进行过滤"/>
        <p>管辖法院</p>
        <el-input
          v-model="lawyerfilterText"
          clearable
          placeholder="管辖法院"/>
        <p>法院等级</p>
        <el-input
          v-model="lawyerfilterText"
          clearable
          placeholder="法院等级"/>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="bgf selectend">
        <div class="selecttab">
          <p><img src="../../../assets/usercenter/sort.png" alt="" >排序</p>
          <el-select v-model="valueselect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-input
            v-model="lawyerfilterText"
            clearable
            placeholder="请输入想要查询的律师名称"/>
        </div>
      </div>
      <div class="case-content-main">
        <ul>
          <li v-for="(item, index) in caseData" :key="item.id" style="position:relative">
            <nuxt-link :to="`/case/${item.id}/info`">
              <div class="case-content-top">
                <p> {{ item.title }}</p>
                <div class="case-content-col">
                  <el-col v-if="item.caseType===1" :span="12"><i class="el-icon-caret-right"/>管辖法院：{{ item.courtName }}</el-col>
                  <el-col v-if="item.caseType===1" :span="12"><i class="el-icon-caret-right"/>所属案由：{{ item.caseReasonName }}</el-col>
                  <el-col v-if="item.caseType===2" :span="12"><i class="el-icon-caret-right"/>所属行业：{{ item.industryName }}</el-col>
                  <el-col :span="12"><i class="el-icon-caret-right"/>所属领域：{{ item.practiceAreaName }}</el-col>
                </div>
                <div class="case-judgment" v-html="item.highlight.judgmentDocument?item.highlight.judgmentDocument[0]:''"/>
              </div>
            </nuxt-link>
            <div class="case-content-bottom">
              <span class="cursorPointer" @click="collectionCase(item.id,index)"><i :class="{ hover:item.isFollow}" class="el-icon-star-off"/>收藏</span>
              <span><i class="el-icon-time"/>{{ item.endTime }}</span>
              <span v-if="item.caseType===1">{{ item.judgmentNumber }}</span>
            </div>
            <img v-if="item.isClassicCase" src="@/assets/case/case-classic.png" style="border:none;width:100%;max-width:fit-content;position:absolute;top:0;right:0;">
          </li>
          <li v-if="caseData.length===0" style="height:200px;line-height:200px;text-align:center">暂无相关数据！</li>
        </ul>
      </div>
      <Pagination v-show="totalCount>0" :total="totalCount" :page="caseSearch.pageIndex" :limit="caseSearch.pageCount" @pagination="handlePageChange" />
    </el-col>
    <ExtraWrap :plugins="'error,totop'" :share-url="shareUrl" :top="'350px'" :right="'40px'" :share-visible="sharevisible" @share="shareClose" />
  </el-row>
</template>

<script>
import authIcon from '@/assets/lawyer/lawyer_auth.png'
import shareIcon from '@/assets/lawyer/share.png'
import collectionIcon from '@/assets/lawyer/collection.png'
import Pagination from '../../../components/Pagination/index'
import { mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
import ExtraWrap from '@/components/ExtraWrap'
export default {
  layout: 'userCenter',
  name: 'Lawyer',
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  components: {
    Pagination,
    ExtraWrap
  },
  async asyncData({ params }) {
    const [CasereasonTreeData, caseData] = await Promise.all([
      axios.get(`${process.env.baseUrl}/${setting.apiPrefix}/casereason/tree`, { 'Content-Type': 'application/json' }),
      axios.post(`${process.env.baseUrl}/${setting.apiPrefix}/customer/case/query`, { query: { practiceAreaId: '', searchKey: '', courtLevel: '', courtId: '', industryId: '', caseReasonId: '', lawyerId: '', courtReginId: '', sorting: 'casestatus', sortType: 1, pageCount: 10, pageIndex: 1 }}, { 'Content-Type': 'application/json' })
    ])
    return {
      CasereasonTreeData: CasereasonTreeData.data.data,
      caseData: caseData.data.data.items,
      totalCount: caseData.data.data.totalCount
    }
  },
  props: {
    copySuccessMessage: {
      type: String,
      default: '连接地址复制成功'
    },
    copyErrorMessage: {
      type: String,
      default: '复制失败'
    }
  },
  data() {
    return {
      options: [
        {
          value: '0',
          label: '按收藏时间排序'
        },
        {
          value: '1',
          label: '按案例总数排序'
        },
        {
          value: '2',
          label: '按关注度排序'
        }
      ],
      valueselect: '0',
      caseData: [], // 案例
      authIcon,
      shareIcon,
      collectionIcon,
      loading: false,
      activeName: 'first',
      tabsearchData: [],
      caseSearch: { // 搜索条件
        practiceAreaId: '', // 诉讼领域
        searchKey: '', // 搜索关键字: 支持(裁判文书正文,裁判文书标题)
        courtLevel: '', // 法院等级 0-6
        courtId: '', // 法院Id
        industryId: '', // 行业ID
        caseReasonId: '', // 案由Id
        lawyerId: '', // 律师Id
        courtReginId: '', // 法院所属区域
        sorting: 'casestatus', // 排序 默认排序casestatus、裁判日期endtime、更新时间updatetime、访问人数（关注）clickcount、收藏数量followercount
        sortType: 1, // 排序[ 0, 1 ]
        pageCount: 10, //
        pageIndex: 1 //
      },
      yearstart: '', // 年限开始时间
      yearend: '', // 年限结束时间
      sortactive: 'active', // 默认排序class
      caseactive: '', // 案例总数排序class
      selectData: {
        industry: [],
        practice: [],
        region: [],
        lawfirm: [],
        lawyerName: []
      }, // 筛选条件数据
      suitsData: [], // 诉讼领域数据
      NosuitsData: [], // 非诉领域数据
      industryData: [], // 行业数据
      lawfirmData: [], // 律所数据
      lawfirmDatabackups: [], // 律所数据备份
      regionData: [], // 地区数据
      lawyerData: [],
      totalCount: 1,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      lawfirmsearch: {
        // name: '',
        // regionId: 0,
        // creditCode: '',
        // lawfirmType: 0
      },
      searchtimelittle: '', // 输入框时间
      searchtimelarge: '',
      littlesettime: '', // 定时器
      largesettime: '',
      sharevisible: false, // 分享弹框
      shareUrl: '', // 分享链接
      pointsnum: 1, // 排序计次
      conditioncasecountnum: 0,
      filterText: '', // 城市数据过滤
      lawyerfilterText: ''// 律所数据过滤
    }
  },
  computed: {},

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    },
    lawyerfilterText(val) {
      if (val === '') {
        this.lawfirmData = this.lawfirmDatabackups
      } else {
        const arr = []
        for (var i = 0; i < this.lawfirmData.length; i++) {
          if (this.lawfirmData[i].name.indexOf(val) !== -1) {
            arr.push(this.lawfirmData[i])
          }
        }
        this.lawfirmData = arr
      }
    }
  },
  mounted() {
    // this.getLawyer()
    // this.getLawfirmData()
  },

  methods: {
    ...mapActions('lawyer', ['GetLawyerList', 'LawyerCollecte', 'LawyerUnCollecte']),
    ...mapActions('practice', [
      'getPracticeTreeData',
      'getPracticeTreeDataOfType'
    ]),
    ...mapActions('industry', ['getIndustryTreeData']),
    ...mapActions('lawfirm', ['getLawfirm']),
    ...mapActions('region', ['getRegionTreeData']),
    getPractice() {
      // 获取领域
      // this.getPracticeTreeData().then(res => {
      //   this.suitsData = res[0].children
      //   this.NosuitsData = res[1].children
      // })
      this.getPracticeTreeDataOfType(1).then(res => {
        this.suitsData = res[0].children
      })
      this.getPracticeTreeDataOfType(2).then(res => {
        this.NosuitsData = res[0].children
      })
    },
    getIndustry() {
      // 获取行业
      this.getIndustryTreeData().then(res => {
        this.industryData = res
      })
    },
    getLawfirmData() {
      // 获取律所
      this.getLawfirm({
        ...this.lawfirmsearch
      }).then(res => {
        this.lawfirmData = res
        this.lawfirmDatabackups = res// 备份数据
      })
    },
    getRegion() {
      // 获取地区
      this.getRegionTreeData().then(res => {
        this.regionData = res
        this.loading = false
      })
    },
    // 获取数据
    getLawyer() {
      this.loading = true
      setTimeout(this.request)
    },
    request() {
      this.GetLawyerList({
        ...this.caseSearch
      }).then(res => {
        this.lawyerData = res.items
        this.totalCount = res.totalCount
        this.loading = false
      })
    },
    // 分页切换
    handlePageChange(val) {
      this.caseSearch.pageIndex = val.page
      this.caseSearch.pageCount = val.limit
      this.loading = true
      this.getLawyer(150)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    industry(id, name) {
      this.caseSearch.industryId = id
      this.multiple('industry', { id: id, name: '擅长行业：' + name })
    },
    practice(id, name) {
      this.caseSearch.practiceAreaId = id
      this.multiple('practice', { id: id, name: '专业领域：' + name })
    },
    region(data) {
      this.caseSearch.regionId = data.id
      this.multiple('region', { id: data.id, name: '所在城市：' + data.fullName })
    },
    lawfirm(data) {
      this.caseSearch.lawfirmId = data.id
      this.multiple('lawfirm', { id: data.id, name: '所属律所：' + data.name })
    },
    selectname() {
      this.multiple('lawyerName', {
        id: 0,
        name: '姓名：' + this.caseSearch.lawyerName
      })
    },
    multiple(type, data) {
      // 添加筛选方法
      // 多选
      // const hasthis = this.selectData[type].indexOf(data.id) > -1 && this.selectData.indexOf(data.name) > -1
      // hasthis ? '' : this.selectData[type].push(data)
      // 单选
      this.selectData[type] = [data]
      // 更新数据
      this.getLawyer()
    },
    selectdelete(type, data) {
      // 删除筛选方法
      // 多选
      // for (var i = 0; i < this.selectData[type].length; i++) {
      //   if (this.selectData[type][i].id === data.id && this.selectData[type][i].name === data.name) {
      //     this.selectData[type].splice([i], 1)
      //   }
      // }
      // 单选
      this.selectData[type] = []
      // 删除请求中筛选值
      this.deleteData(type)
      // 更新数据
      this.getLawyer()
    },
    deleteData(type) {
      if (type === 'industry') {
        this.caseSearch.industryId = ''
      }
      if (type === 'practice') {
        this.caseSearch.practiceAreaId = ''
      }
      if (type === 'region') {
        this.caseSearch.regionId = ''
      }
      if (type === 'lawfirm') {
        this.caseSearch.lawfirmId = ''
      }
      if (type === 'lawyerName') {
        this.caseSearch.lawyerName = ''
      }
    },
    sortselect() {
      // 默认排序
      this.pointsnum += 1
      if (this.pointsnum % 2 === 0) {
        this.sortactive = 'active'
        this.caseactive = ''
        this.caseSearch.sorting = 'points'
        this.caseSearch.sortType = 1
      } else {
        this.sortactive = 'active'
        this.caseactive = ''
        this.caseSearch.sorting = 'points'
        this.caseSearch.sortType = 0
      }
      // 重新请求数据
      this.getLawyer()
    },
    caseselect() {
      // 按照案例数排序
      this.conditioncasecountnum += 1
      if (this.conditioncasecountnum % 2 === 0) {
        this.sortactive = ''
        this.caseactive = 'active'
        this.caseSearch.sorting = 'conditioncasecount'
        this.caseSearch.sortType = 1
      } else {
        this.sortactive = ''
        this.caseactive = 'active'
        this.caseSearch.sorting = 'conditioncasecount'
        this.caseSearch.sortType = 0
      }
      // 重新请求数据
      this.getLawyer()
    },
    collection(data) { // 收藏
      // 判断是否登录
      event.preventDefault()
      if (!data.isFollow) {
        this.LawyerCollecte(data.id).then(res => {
          this.$notify({
            message: `收藏律师 : ` + data.name,
            duration: 2000
          })
        })
      } else {
        this.LawyerUnCollecte(data.id).then(res => {
          this.$notify({
            message: `取消收藏 : ` + data.name,
            duration: 2000
          })
        })
      }
      this.getLawyer()
    }
  }
}
</script>

<style lang="scss" scoped>

.title {
  height: 60px;
  font-size: 14px;
  padding: 35px;
  color: #999;
  b {
    color: #666;
  }
}
ul {
  padding: 0px;
  li {
    list-style: none;
  }
}
.bgf {
  background: #fff;
}
.tree_left {
  padding: 30px;
  b {
    display: block;
    border-bottom: 1px dotted #ddd;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    padding-bottom: 10px;
    img{
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  p{
    font-size: 12px;
    margin: 0px;
  }
  .el-input{
    margin: 10px 0px;
  }
}
.selectend {
  padding: 0px 25px;
  .selecttab {
    padding: 20px;
    overflow: hidden;
    p{
      float: left;
      font-size: 14px;
      margin-right: 35px;
      margin-bottom: 0px;
      padding-top: 10px;
    }
    .el-select{
      float: left;
    }
    .el-input{
      float: right;
      width:390px;
    }

  }
}
.selectsort {
  padding: 20px 0px 15px 0px;
  overflow: hidden;
  > p {
    float: right;
    b {
      color: #de2121;
    }
  }
}
// 案例列表
.case-content-main {
	margin-top: 16px;
	ul {
    li{
      display: block;
      list-style-type: none;
      width: auto;
      margin: 0 auto;
      margin-top: 16px;
      border-bottom: 4px solid rgba(217, 217, 217, 0.3);
      background-color: #fff;
      .case-content-top{
        padding: 30px;
      }

    p{
      color: #333333;
      font-size: 14px;
      line-height: 28px;
      margin-bottom: 20px;
      span{
        display: block
      }
    }

    p:nth-child(1) {
      font-size: 18px;
    }

    .case-content-col {
      color: #999999;
      font-size: 14px;
      height: 40px;
    }
    .case-judgment{
      color: #333333;
      font-size: 14px;
      line-height: 28px;
      margin: 20px 0;
    }
      }
    }
  }

  .case-content-bottom {
    position:absolute;
    bottom:0;
    left:0;
    height: 29px;
    width: 100%;
    line-height: 29px;
    background-color: #fbfbfb;
    box-shadow: 0px -1px 0px 0px
      rgba(0, 0, 0, 0.05);
    font-size: 12px;
    color: #666666;
    span{
    float: right;
      margin-right: 20px;
    }
  }
</style>
<style lang="scss">
.el-popover{
  max-width:400px;
}

.pagination-container {
  text-align: center;
  margin: 40px 0px;
}
</style>
