<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
        <el-breadcrumb-item>我的关注</el-breadcrumb-item>
        <el-breadcrumb-item>律师列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="6">
      <div class="bgf tree_left">
        <b><img src="../../../assets/usercenter/screen.png" alt="" >条件筛选</b>
        <p>所在城市</p>
        <el-input
          v-model="filterText"
          clearable
          placeholder="输入关键字进行过滤"/>
        <p>所在律所</p>
        <el-input
          v-model="lawyerfilterText"
          clearable
          placeholder="输入关键字进行过滤"/>
        <p>擅长行业</p>
        <el-input
          v-model="filterText"
          clearable
          placeholder="输入关键字进行过滤"/>
        <p>专业领域</p>
        <el-input
          v-model="lawyerfilterText"
          clearable
          placeholder="输入关键字进行过滤"/>
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
      <ul class="lawyerlist">
        <li v-for="(items,index) in lawyerData" :key="index">
          <nuxt-link :to="'/lawyer/'+items.id+'/info'">
            <div :style="items.isRecommend ? `background:url(${authIcon}) top right no-repeat` : ''" class="lawyer">
              <div class="avatar">
                <div>
                  <div>
                    <img :src="items.avatar" alt="" >
                    <span v-show="items.isDirector">部门主任</span>
                  </div>
                </div>
              </div>
              <div class="info">
                <div class="name">
                  {{ items.name }}<small>律师</small>
                </div>
                <el-row>
                  <el-col :span="8" class="base">
                    <div><i class="iconfont icontriangle-arrow-r"/>基础信息&nbsp;<i class="iconfont icondian1" />&nbsp;<span>INFORMATION</span></div>
                    <el-form label-width="80px" label-position="right">
                      <el-form-item label="执业年限">{{ items.practiceYears }}年</el-form-item>
                      <el-form-item label="案例总数">{{ items.caseCount }}例</el-form-item>
                      <el-form-item label="所在律所">{{ items.lawfirmName }}</el-form-item>
                      <el-form-item label="所在地址">{{ items.regionName }}</el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="8" class="practice">
                    <div><i class="iconfont icontriangle-arrow-r"/>专业领域&nbsp;<i class="iconfont icondian1" />&nbsp;<span>EXPERTISE</span></div>
                    <el-form>
                      <el-form-item v-for="item in items.skilfulPracticeAreas" :key="item.id">
                        {{ item.name }}
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="8" class="other">
                    <el-form label-position="top" class="time">
                      <el-form-item label="更新时间:">{{ items.updateTime }}</el-form-item>
                    </el-form>
                    <el-form>
                      <el-form-item :label="`浏览：${items.clickCount}`"/>
                      <el-form-item :label="`关注：${items.followerCount}`"/>
                    </el-form>
                    <div :style="items.isFollow ? 'background:#f68020;color:#fff;' : ''" @click="collection(items)">
                      <img v-if="!items.isFollow" :src="collectionIcon" alt="">
                      {{ !items.isFollow ? '收藏' : '已收藏' }}
                    </div>
                    <div @click="share(items.id)">
                      <img :src="shareIcon" alt=""> 分享
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <Pagination
        v-show="totalCount > 0"
        :total="totalCount"
        :page="lawyerSearch.pageIndex"
        :limit="lawyerSearch.pageCount"
        @pagination="handlePageChange"
      />
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
    const [lawyerData, suitsData, NosuitsData, industryData, regionData, lawfirmData] = await Promise.all([
      axios.post(
        `${process.env.baseUrl}/${setting.apiPrefix}/customer/lawyer/query`,
        { query: { pageCount: 10, pageIndex: 1, lawyerName: '', lawfirmId: '', practiceAreaId: '', industryId: '', sorting: 'points', sortType: 0, regionId: '', littlePracticeYears: 0, largePracticeYears: 0 }},
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/practicearea/tree/1`,
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/practicearea/tree/2`,
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/industry/tree`,
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/region/tree`,
        { 'Content-Type': 'application/json' }
      ),
      axios.post(
        `${process.env.baseUrl}/${setting.apiPrefix}/lawfirm/list`,
        { query: {}},
        { 'Content-Type': 'application/json' }
      )
    ])
    return {
      lawyerData: lawyerData.data.data.items,
      suitsData: suitsData.data.data[0].children, // .data[0].children,
      NosuitsData: NosuitsData.data.data[0].children, // .data[0].children,
      industryData: industryData.data.data,
      regionData: regionData.data.data,
      lawfirmData: lawfirmData.data.data,
      lawfirmDatabackups: lawfirmData.data.data, // 律所备份数据
      totalCount: lawyerData.data.data.totalCount
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
      authIcon,
      shareIcon,
      collectionIcon,
      loading: false,
      activeName: 'first',
      tabsearchData: [],
      lawyerSearch: {
        pageCount: 10,
        pageIndex: 1,
        lawyerName: '', // 律师姓名
        lawfirmId: '', // 所属律所
        practiceAreaId: '', // 擅长领域
        industryId: '', // 擅长行业
        sorting: 'points', // 排序
        sortType: 0,
        regionId: '', // 律师所属地区
        littlePracticeYears: '', // 执业年限小值
        largePracticeYears: '' // 执业年限大值
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
        ...this.lawyerSearch
      }).then(res => {
        this.lawyerData = res.items
        this.totalCount = res.totalCount
        this.loading = false
      })
    },
    // 分页切换
    handlePageChange(val) {
      this.lawyerSearch.pageIndex = val.page
      this.lawyerSearch.pageCount = val.limit
      this.loading = true
      this.getLawyer(150)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    industry(id, name) {
      this.lawyerSearch.industryId = id
      this.multiple('industry', { id: id, name: '擅长行业：' + name })
    },
    practice(id, name) {
      this.lawyerSearch.practiceAreaId = id
      this.multiple('practice', { id: id, name: '专业领域：' + name })
    },
    region(data) {
      this.lawyerSearch.regionId = data.id
      this.multiple('region', { id: data.id, name: '所在城市：' + data.fullName })
    },
    lawfirm(data) {
      this.lawyerSearch.lawfirmId = data.id
      this.multiple('lawfirm', { id: data.id, name: '所属律所：' + data.name })
    },
    selectname() {
      this.multiple('lawyerName', {
        id: 0,
        name: '姓名：' + this.lawyerSearch.lawyerName
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
        this.lawyerSearch.industryId = ''
      }
      if (type === 'practice') {
        this.lawyerSearch.practiceAreaId = ''
      }
      if (type === 'region') {
        this.lawyerSearch.regionId = ''
      }
      if (type === 'lawfirm') {
        this.lawyerSearch.lawfirmId = ''
      }
      if (type === 'lawyerName') {
        this.lawyerSearch.lawyerName = ''
      }
    },
    selectempty() {
      // 清空筛选条件
      this.selectData = []
      this.lawyerSearch.practiceAreaId = ''
      this.lawyerSearch.lawfirmId = ''
      this.lawyerSearch.regionId = ''
      this.lawyerSearch.industryId = ''
      this.lawyerSearch.littlePracticeYears = 0
      this.lawyerSearch.largePracticeYears = 0
      this.lawyerSearch.lawyerName = ''
      // 重新请求数据
      this.getLawyer()
    },
    sortselect() {
      // 默认排序
      this.pointsnum += 1
      if (this.pointsnum % 2 === 0) {
        this.sortactive = 'active'
        this.caseactive = ''
        this.lawyerSearch.sorting = 'points'
        this.lawyerSearch.sortType = 1
      } else {
        this.sortactive = 'active'
        this.caseactive = ''
        this.lawyerSearch.sorting = 'points'
        this.lawyerSearch.sortType = 0
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
        this.lawyerSearch.sorting = 'conditioncasecount'
        this.lawyerSearch.sortType = 1
      } else {
        this.sortactive = ''
        this.caseactive = 'active'
        this.lawyerSearch.sorting = 'conditioncasecount'
        this.lawyerSearch.sortType = 0
      }
      // 重新请求数据
      this.getLawyer()
    },
    selectlittleyears() {
      this.searchtimelittle = new Date().getTime()
      this.timelittle()
    },
    selectlargeyears() {
      this.searchtimelarge = new Date().getTime()
      this.timelarge()
    },
    timelittle() {
      const _this = this
      this.littlesettime = setTimeout(function() {
        var x = new Date().getTime() - this.searchtimelittle
        if (x < 490) {
          clearInterval(this.littlesettime)
        } else {
          _this.getLawyer()
        }
      }, 500)
    },
    timelarge() {
      const _this = this
      this.largesettime = setTimeout(function() {
        var x = new Date().getTime() - this.searchtimelarge
        if (x < 490) {
          clearInterval(this.largesettime)
        } else {
          _this.getLawyer()
        }
      }, 500)
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
    },
    share(id) {
      // 分享
      event.preventDefault()
      this.sharevisible = true
      this.shareUrl = `${location.origin}/lawyer/${id}/info`
    },
    shareClose() {
      // 分享弹窗关闭事件
      this.sharevisible = false
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
.lawyerlist {
  margin: 20px 0px;
  li {
    margin-bottom: 20px;
    background: #fff;
    a {
      display: block;
      overflow: hidden;
      text-decoration: none;
      position: relative;
    }
  }
  .lawyer{
    padding: 3px;
    position: relative;
    height: auto;
    .avatar{
      width: 240px;
      position: absolute;
      height: calc(100% - 6px);
      display: table;
      >div{
        display: table-cell;
        vertical-align: middle;
        div{
          position: relative;
          span{
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 5px 15px;
            color: #fff;
            background: rgba(0,0,0,.7);
          }
        }
      }
      img{
        width: 240px;
        height: 240px;
        display: block;
      }
    }
    .info{
      margin-left: 270px;
      .name{
        height: 24px;
        line-height: 24px;
        font-size: 24px;
        margin: 25px 0 15px 0;
        color: #333;
        small{
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .el-col-8{
        padding: 10px  25px 0 30px;
        border-right: 1px dashed rgba(0,0,0,0.1);
        min-height: 166px;
        margin-bottom: 10px;
        display: table-cell;
        &:first-child{
          padding-left: 0;
        }
        &:last-child{
          padding-right: 0;
          border-right: none;
        }
        >div{
          color: #f68020;
          margin-bottom: 15px;
          span{
            color: #999;
          }
        }
      }
      .el-form{
        .el-form-item{
          margin-bottom: 10px;
        }
      }
      .practice{
        .el-form-item{
          display: inline-block;
          margin-right: 20px;
        }
      }
      .other{
        >div{
          padding: 3px 9px;
          float: left;
          margin-right: 10px;
          color: #666;
          border: 1px solid #ddd;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-popover{
  max-width:400px;
}
.lawyerlist{
  .el-form{
    .el-form-item__label,.el-form-item__content{
      line-height: 20px;
    }
    .el-form-item__label{
      color: #999;
    }
    .el-form-item__content{
      color: #333;
    }
  }
  .time{
    .el-form-item__content{
      color: #f68020;
    }
  }
}
.pagination-container {
  text-align: center;
  margin: 40px 0px;
}
</style>
