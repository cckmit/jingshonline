<template>
  <div style="width:1380px;min-width:1380px;margin:auto;min-height:1000px;margin-bottom:75px">
    <el-row class="case caseClass">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item >查找案例</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col class="case-aside">
        <!-- 综合筛选 -->
        <div class="case-aside case-border">
          <div class="case-aside-title case-title">综合筛选</div>
          <div class="case-aside-main case-main case_search">
            <el-select
              v-model="searchText"
              :remote-method="search"
              :loading="loading"
              filterable
              allow-create
              clearable
              remote
              reserve-keyword
              placeholder="请输入案由、关键词、法院、当事人、律师"
              @change="searchChange"
              @keydown.13.native="search()"
            >
              <el-option-group
                v-for="(group, index) in options"
                :key="index"
                :label="group.describe">
                <el-option
                  v-for="(item,indexs) in group.conditions"
                  :key="indexs"
                  :label="item.name"
                  :value="JSON.stringify(item)"
                />
              </el-option-group>
            </el-select>
            <div v-loading="searchLoading" class="searchIcon" @click="searchChange(searchText)" >
              <img :src="icon"> <span>搜索</span>
            </div>
          </div>
        </div>
        <!-- 具体案由 -->
        <div class="case-aside case-border">
          <div class="case-aside-title case-title">具体案由</div>
          <div class="case-aside-main case-main">
            <el-tree
              :data="CasereasonTreeData"
              :props="defaultProps"
              node-key="id"
              @node-click="handleCasereasonClick"/>
          </div>
        </div>
        <!-- 法院等级 -->
        <div class="case-aside case-border">
          <div class="case-aside-title case-title">法院等级</div>
          <div class="case-aside-main case-main">
            <el-tree
              :data="courtLevelTreeData"
              :props="defaultProps"
              node-key="id"
              @node-click="handleCourtLevelClick"/>
          </div>
        </div>
        <!-- 管辖法院 -->
        <div class="case-aside case-border">
          <div class="case-aside-title case-title">管辖法院</div>
          <div class="case-aside-main case-main">
            <el-tree
              :data="regionTreeData"
              :props="defaultProps"
              :expand-on-click-node="false"
              :load="loadNode"
              node-key="index"
              lazy
              @node-click="handleregionClick"/>
          </div>
        </div>
      </el-col>
      <el-col class="case-content">
        <div class="case-content-title case-border">
          <el-row class="case-title case-content-titleTop">
            <el-col :span="21">
              <p style="float:left"> 筛选条件:</p>
              <el-tag v-show="selectForm.courtLevelInfo" closable effect="plain" size="small" type="info" @close="handleCourtLevelClose">{{ selectForm.courtLevelInfo }}</el-tag>
              <el-tag v-show="selectForm.caseReasonInfo" closable effect="plain" size="small" type="info" @close="handleCaseReasonClose">{{ selectForm.caseReasonInfo }}</el-tag>
              <el-tag v-show="selectForm.courtInfo" closable effect="plain" size="small" type="info" @close="handleCourtClose">{{ selectForm.courtInfo }}</el-tag>
            </el-col>
            <el-col :span="3">
              <p class="cursorPointer" style="float:right;text-decoration:underline" @click="emptyScreen()" > <i class="el-icon-delete"/>清空筛选条件</p>
            </el-col>
          </el-row>
          <el-row class="case-content-titleBot">
            <el-col :span="18">
              <ul v-bind="sortData">
                <li v-for="item in sortData" :key="item.id"><span :class="{ hover:item.id==current}" class="cursorPointer" @click="getSortCaseData(item.displayName,item.id)"> {{ item.name }}<i class="el-icon-sort"/></span></li>
              </ul>
            </el-col>
            <el-col :span="6">
              <p style="float:right">当前条件共找到 <i class="case-font-hover">{{ totalCount }}</i>个结果</p>
            </el-col>
          </el-row>
        </div>
        <div class="case-content-main">
          <ul v-bind="caseData">
            <li v-for="(item, index) in caseData" :key="item.id" class="case-border case-content-hover" style="position:relative">
              <nuxt-link :to="`/case/${item.id}/info`">
                <div class="case-content-top">
                  <p> {{ item.title }}</p>
                  <div class="caseCol">
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
          </ul>
        </div>
        <div style="text-align:center;margin-top:20px">
          <Pagination v-show="totalCount>0" :total="totalCount" :page="caseSearch.pageIndex" :limit="caseSearch.pageCount" @pagination="handlePageChange" />
        </div>
      </el-col>
    </el-row>
    <ExtraWrap :plugins="'error,qrcode,totop,share'" :top="400" :left="100"/>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapState, mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
import ExtraWrap from '@/components/ExtraWrap'
import icon from '@/assets/case/case_search.png'
export default {
  layout: 'case',
  head() {
    return {
      title: '案例列表',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线案例列表；jingshonline' }
      ]
    }
  },
  components: {
    Pagination,
    ExtraWrap
  },
  data() {
    return {
      icon: icon,
      searchLoading: false,
      options: [],
      searchText: '',
      current: 0,
      loading: '',
      totalCount: 0,
      isStarHover: false, // 是否点击收藏变色
      CasereasonTreeData: [], // 案由树
      regionTreeData: [], // 管辖法院树木
      regionChildTreeData: [],
      caseData: [], // 案例
      sortData: [
        {
          name: '默认排序',
          label: '0',
          displayName: 'casestatus',
          id: 1
        },
        {
          name: '裁判日期',
          label: '0',
          displayName: 'endtime',
          id: 2
        },
        {
          name: '更新时间',
          label: '0',
          displayName: 'updatetime',
          id: 3
        },
        {
          name: '访问人数',
          label: '0',
          displayName: 'clickcount',
          id: 4
        },
        {
          name: '收藏数量',
          label: '0',
          displayName: 'followercount',
          id: 5
        },
        {
          name: '裁判日期',
          label: '0',
          displayName: 'endtime',
          id: 6
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectForm: { // 筛选展示
        courtLevelInfo: '', // 法院等级
        caseReasonInfo: '', // 具体案由
        courtInfo: '' // 管辖法院
      },
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
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
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
  computed: {
    ...mapState({
      courtLevelTreeData: state => state.court.courtLevel
    })
  },
  mounted() {
    this.getRegionTree(null)
  },
  methods: {
    ...mapActions('case', ['getCaseListData', 'caseFollowClick', 'caseUnfollowClick', 'CaseSearch']),
    ...mapActions('caseReason', ['getCasereasonTreeData']),
    ...mapActions('region', ['getCourtRegionsData', 'getCourtRegionsChildData']),

    search(query) { // 综合下拉框
      this.loading = true
      this.CaseSearch(query).then(res => {
        this.options = res
        this.loading = false
      })
    },
    searchChange(key) { // 综合搜索传值
      this.caseSearch.caseReasonId = ''
      this.caseSearch.courtId = ''
      this.caseSearch.industryId = ''
      this.caseSearch.lawfirmId = ''
      this.caseSearch.practiceAreaId = ''
      key = key.indexOf('{') !== -1 && key.indexOf('}') !== -1 ? key : JSON.stringify(key)
      const data = JSON.parse(key)
      if (data !== '') {
        const conditionKey = data.conditionKey
        switch (conditionKey) {
          case 1:
            this.caseSearch.caseReasonId = data.id // 案由
            break
          case 2:
            this.caseSearch.courtId = data.id // 法院
            break
          case 3:
            this.caseSearch.industryId = data.id // 行业
            break
          case 4:
            this.caseSearch.lawfirmId = data.id // 律所
            break
          case 5:
            this.caseSearch.practiceAreaId = data.id // 领域
            break
          default:
            this.caseSearch.searchKey = data
            break
        }
      }
      this.getCaseList()
    },
    // 获取案件
    getCaseList(delayTime = 150) {
      this.loading = true
      setTimeout(this.request, delayTime)
    },
    request() {
      this.getCaseListData({ ...this.caseSearch }).then(res => {
        this.caseData = res.items
        this.totalCount = res.totalCount
        this.loading = false
      })
    },
    // 获取具体案由
    getCasereasonTree() {
      this.getCasereasonTreeData().then(res => {
        this.CasereasonTreeData = res
      })
    },
    // 获取管辖法院
    getRegionTree(courtLevel) {
      this.getCourtRegionsData(courtLevel).then(res => {
        this.regionTreeData = res
      })
    },
    // 管辖法院二级懒加载
    loadNode(node, resolve) {
      if (node.data.id) {
        node.data && !node.data.leaf ? this.getCourtRegionsChildData(node.data.id).then(res => {
          this.regionChildTreeData = res
          return resolve(res)
        }) : resolve([])
      } else {
        return
      }
    },
    // 管辖法院树点击筛选
    handleregionClick(data) {
      this.selectForm.courtInfo = data.name
      data.nodeType === 0 ? this.caseSearch.courtReginId = data.id : this.caseSearch.courtId = data.id // 根据nodeType判断传参
      data.nodeType === 0 ? this.caseSearch.courtId = '' : this.caseSearch.practiceAreaId = '' // 根据nodeType判断滞空参数
      this.getCaseList()
    },
    // 管辖法院关闭
    handleCourtClose() {
      this.selectForm.courtInfo = ''
      this.caseSearch.courtId = ''
      this.caseSearch.courtReginId = ''
      this.getCaseList()
    },
    // 具体案由树点击筛选
    handleCasereasonClick(data) {
      this.selectForm.caseReasonInfo = data.name
      this.caseSearch.caseReasonId = data.id
      this.getCaseList()
    },
    // 具体案由关闭
    handleCaseReasonClose() {
      this.selectForm.caseReasonInfo = ''
      this.caseSearch.caseReasonId = ''
      this.getCaseList()
    },

    // 管辖法院点击
    handleCourtLevelClick(data) {
      this.selectForm.courtLevelInfo = data.name
      this.caseSearch.courtLevel = data.id
      this.getRegionTree(this.caseSearch.courtLevel)
      this.getCaseList()
    },

    // 法院等级关闭
    handleCourtLevelClose() {
      this.selectForm.courtLevelInfo = ''
      this.caseSearch.courtLevel = ''
      this.getRegionTree(this.caseSearch.courtLevel)
      this.getCaseList()
    },
    // 清空筛选条件点击事件
    emptyScreen() {
      this.selectForm.courtInfo = ''
      this.caseSearch.courtId = ''
      this.caseSearch.courtReginId = ''
      this.selectForm.caseReasonInfo = ''
      this.caseSearch.caseReasonId = ''
      this.selectForm.courtLevelInfo = ''
      this.caseSearch.courtLevel = ''
      this.getCaseList()
    },
    // 排序点击事件
    getSortCaseData(sorting, index) {
      this.current = index
      this.caseSearch.sorting = sorting
      this.caseSearch.sortType = this.caseSearch.sortType === 0 ? 1 : 0
      this.getCaseList()
    },
    // 收藏点击事件
    collectionCase(id, index) {
      const coll = !this.caseData[index].isFollow
      this.$set(this.caseData[index], 'isFollow', coll)
      if (coll) { // 收藏
        this.caseFollowClick(id).then(res => {
          this.$notify({
            message: res,
            type: 'success'
          })
        })
      } else {
        // 取消收藏
        this.caseUnfollowClick(id).then(res => {
          this.$notify({
            message: res,
            type: 'success'
          })
        })
      }
    },
    // 分页切换点击事件
    handlePageChange(val) {
      this.caseSearch.pageIndex = val.page
      this.caseSearch.pageCount = val.limit
      this.getCaseList()
    }
  }
}
</script>

<style lang='scss' scoped>
//*******************************本页面公共样式*******************************
.caseClass {
	font-family: MicrosoftYaHei;
	i{
  font-style: normal
}
// 左边标题
.case-title {
	line-height: 65px;
	border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
	font-size: 16px;
	color: #333333;
}
  //变小手
.cursorPointer {
	cursor: pointer;
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
   //边框
.case-border {
	border: solid 1px rgba(229, 229, 229, 0.3);
}
  //  已选择文字颜色
.case-font-hover,.hover {
	color: #f68020;
}
//  已选择下方边框变色
.case-content-hover {
	border-bottom: 4px solid #f68020
}
//橘色字体图标
.el-icon-circle-plus,.el-icon-remove,.el-icon-delete {
	color: #f68020;
	margin-right: 5px;
}
//左边距字体图标
.el-icon-error,.el-icon-sort {
	margin-left: 5px;
}
//右边距字体图标
.el-icon-star-off,.el-icon-time,.el-icon-menu {
	margin-right: 5px;
}

//******************************* ***************************************************************/
 .case_search{
    .el-select{
      width: 280px !important;
      height: 42px;
      // border: solid 1px #000000;
      font-size: 14px;
      color: #666;
    }
    .searchIcon{
      margin-top: 15px;
      color: white;
      font-size: 14px;
      text-align: center;
      width: 280px;
      height: 36px;
      line-height: 36px;
      background: #f68020;
      overflow: hidden;
      cursor: pointer;
      img{
        width: 32px;
        height: 32px;
        vertical-align:middle
      }
    }
  }
// 左侧树
.case-aside {
	width: 320px;
	.el-tree-node__label{
  font-size: 14px;
  color:#666666;
}
.el-tree-node__content {
	height: 30px;
}
.el-tree-node__children {
	.el-tree-node__label{
  font-size: 14px;
}
.el-tree-node__children {
	.el-tree-node__content{
  .el-tree-node__label{
  font-size: 14px;
}
}
}
}
.case-aside {
	background-color: #fff;
	padding: 0 20px 20px 20px;
  margin-bottom: 20px;
	.case-aside-title{
    padding-left: 10px;
}
.case-aside-main {
	padding: 5px 0;
}
  }
}
//右侧
.case-content {
	margin-left: 16px;
	width: 1043px;
	.case-content-title{
  background-color: #fff;
	padding: 0 20px;
	.case-content-titleTop{
    color: #999999;
    letter-spacing: 1px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    span {
      color: #666666;
      letter-spacing: 1px;
      margin-left: 10px;
      font-size: 14px;
    }
      .el-tag--plain{
        border:none  !important;
      }
  }

  .case-content-titleBot {
    color: #666666;
    line-height: 50px;
    font-size: 14px;
    ul li{
        display: inline-block;
        margin-right: 20px;
    }
    span{
      padding-right: 20px;
      border-right: 1px solid #ccc;
    }
  }
  }

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
      letter-spacing: 1px;
      font-size: 18px;
    }

    .caseCol {
      color: #999999;
      font-size: 14px;
      height: 40px;
    }
    .case-judgment{
      color: #333333;
      font-size: 14px;
      line-height: 28px;
      margin-top: 20px;
    }
      }
    }
    /*鼠标移入样式改变*/
    li:hover {
      border-bottom: 4px solid #f68020
    }
  }

  .case-content-bottom {
    height: 29px;
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
}

}
</style>
