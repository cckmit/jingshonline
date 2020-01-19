<template>
  <div style="width:1380px;min-width:1380px;margin:auto;min-height:1000px;margin-bottom:30px">
    <el-row class="case caseClass">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item >查找案例</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col class="case-aside">
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
              node-key="id"
              @node-click="handleregionClick"/>
          </div>
        </div>
      </el-col>
      <el-col class="case-content">
        <div class="case-content-title case-border">
          <el-row class="case-title case-content-titleTop">
            <el-col :span="21">
              <p style="float:left"> 筛选条件:</p>
              <el-tag v-if="selectForm.courtLevelInfo" closable effect="plain" size="small" type="info" @close="handleCourtLevelClose(tag)">{{ selectForm.courtLevelInfo }}</el-tag>
              <el-tag v-if="selectForm.caseReasonInfo" closable effect="plain" size="small" type="info" @close="handleCaseReasonClose(tag)">{{ selectForm.caseReasonInfo }}</el-tag>
              <el-tag v-if="selectForm.courtInfo" closable effect="plain" size="small" type="info" @close="handleCourtClose(tag)">{{ selectForm.courtInfo }}</el-tag>
            </el-col>
            <el-col :span="3">
              <p class="cursorPointer" style="float:right;text-decoration:underline" @click="emptyScreen()" > <i class="el-icon-delete"/>清空筛选条件</p>
            </el-col>
          </el-row>
          <div class="case-content-titleBot">
            <span :class="{hover : isSortHover }" class="cursorPointer" @click="getSortCaseData(1)"> 默认排序<i class="el-icon-sort"/></span><span style="display: inline-block;width: 1px;height: 12px;background-color: #cccccc;"/><span :class="{hover : !isSortHover }" class="cursorPointer" @click="getSortCaseData(2)">裁判日期<i class="el-icon-sort"/></span>
            <p style="float:right">当前条件共找到 <i class="case-font-hover">{{ totalCount }}</i>个结果</p>
          </div>
        </div>
        <div class="case-content-main">
          <ul v-bind="caseData">
            <!-- <li v-for="item in caseData" :key="item.id" class="case-border case-content-hover" style="position:relative"> -->
            <li class="case-border case-content-hover" style="position:relative">
              <nuxt-link :to="`/case/1/info`">
                <div class="case-content-top">
                  <p>邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行</p>
                  <p>
                    <el-col :span="12" class="case-font-hover"><i class="el-icon-caret-right"/>管辖法院：重庆市第二中级人民法院</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属案由：行政征收</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属行业：无所属行业</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属领域：政府</el-col>
                  </p>
                  <p><span>【法院观点】</span> 本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                  <p><span>【结果命中】</span>本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                </div>
              </nuxt-link>
              <div class="case-content-bottom">
                <span class="cursorPointer" @click="collectionCase()"><i :class="{ hover:isStarHover}" class="el-icon-star-off"/>收藏</span>
                <span><i class="el-icon-time"/>2016-8-9</span>
                <span>（2015）渝二中法行终字第00085号</span>
              </div>
              <img src="@/assets/case/case-classic.png" style="border:none;width:100%;max-width:fit-content;position:absolute;top:0;right:0;">
            </li>
          </ul>
        </div>
        <div style="text-align:center;margin-top:20px">
          <Pagination v-show="totalCount>0" :total="totalCount" :page="caseSearch.pageIndex" :limit="caseSearch.pageCount" @pagination="handlePageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapState, mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
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
    Pagination
  },
  data() {
    return {
      loading: '',
      totalCount: 100,
      isStarHover: false, // 是否点击收藏变色
      isSortHover: true, // 拍讯点击变色
      CasereasonTreeData: [], // 案由树
      regionTreeData: [], // 管辖法院树木
      caseData: [], // 案例
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectForm: {
        courtLevelInfo: '', // 法院等级
        caseReasonInfo: '', // 具体案由
        courtInfo: '' // 管辖法院
      },
      caseSearch: {//
        practiceAreaId: 0, // 诉讼领域
        nonePracticeAreaId: 0, // 非诉讼领域
        searchKey: 'string', // 搜索关键字: 支持(当事人、律师、专业领域、案由、法院、律所、裁判文书关键字)
        courtLevel: 0, // 法院等级
        courtReginId: 0, // 法院所属区域
        courtId: 0, // 法院Id
        caseReasonId: 0, // 案由Id
        lawyerId: 0, // 律师Id
        sorting: 'string', // 排序
        sortType: 0, // 排序[ 0, 1 ]
        pageCount: 10, // 诉讼领域
        pageIndex: 1// 诉讼领域
      }
    }
  },
  async asyncData({ params }) {
    const [CasereasonTreeData, regionTreeData] = await Promise.all([
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/casereason/tree`, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/region/tree`, { 'Content-Type': 'application/json' })
    ])
    return {
      CasereasonTreeData: CasereasonTreeData.data.entity,
      regionTreeData: regionTreeData.data.entity
    }
  },
  computed: {
    ...mapState({
      courtLevelTreeData: state => state.court.courtLevel
    })
  },
  mounted() {
    this.getCasereasonTree()
    this.getRegionTree()
    // this.getCaseList()
  },
  methods: {
    ...mapActions('case', ['getCaseListData']),
    ...mapActions('caseReason', ['getCasereasonTreeData']),
    ...mapActions('region', ['getRegionTreeData']),

    // 获取案件
    getCaseList(delayTime = 150) {
      this.loading = true
      setTimeout(this.request, delayTime)
    },
    request() {
      this.getCaseListData({ ...this.caseSearch }).then(res => {
        this.caseData = res.data.items
        this.totalCount = res.data.totalCount
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
    getRegionTree(courtLevel = 0) {
      this.getRegionTreeData(courtLevel).then(res => {
        this.regionTreeData = res
      })
    },

    // 管辖法院树点击筛选
    handleregionClick(data) {
      this.selectForm.courtInfo = data.fullName
      this.caseSearch.courtId = data.id

      // this.getCaseList()
    },
    // 管辖法院关闭
    handleCourtClose(tag) {
      this.selectForm.courtInfo = ''
      this.caseSearch.courtId = ''
      // this.getCaseList()
    },
    // 具体案由树点击筛选
    handleCasereasonClick(data) {
      this.selectForm.caseReasonInfo = data.name
      this.caseSearch.caseReasonId = data.id
      // this.getCaseList()
    },
    // 具体案由关闭
    handleCaseReasonClose(tag) {
      this.selectForm.caseReasonInfo = ''
      this.caseSearch.caseReasonId = ''
      // this.getCaseList()
    },

    // 法院等级树点击筛选下侧管辖法院
    handleCourtLevelClick(data) {
      this.selectForm.courtLevelInfo = data.name
      this.caseSearch.courtLevel = data.id
      // this.getRegionTree(this.courtLevel)
      // this.getCaseList()
    },

    // 法院等级关闭
    handleCourtLevelClose(tag) {
      this.selectForm.courtLevelInfo = ''
      this.caseSearch.courtLevel = ''
      // this.getRegionTree(this.courtLevel)
      // this.getCaseList()
    },
    // 清空筛选条件点击事件
    emptyScreen() {
      this.selectForm.courtInfo = ''
      this.caseSearch.courtId = ''
      this.selectForm.caseReasonInfo = ''
      this.caseSearch.caseReasonId = ''
      this.selectForm.courtLevelInfo = ''
      this.caseSearch.courtLevel = ''
      // this.getCaseList()
    },
    // 排序点击事件
    getSortCaseData(sortType) {
      this.sortType = sortType
      if (sortType === 1) {
        this.isSortHover = true
      } else {
        this.isSortHover = false
      }
      // this.getCaseList()
    },
    // 收藏点击事件
    collectionCase() {
      this.isStarHover = true
      // 收藏接口
    },
    // 分页切换点击事件
    handlePageChange(val) {
      this.caseSearch.pageIndex = val.page
      this.caseSearch.pageCount = val.limit
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
    }

.case-content-titleBot {
	color: #666666;
	line-height: 50px;
	font-size: 14px;
	span{
    margin-right: 45px;
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

p {
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

p:nth-child(2) {
	color: #999999;
	font-size: 14px;
	padding: 0 20px;
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
//分页
.pagination-container[data-v-7df3ee10] {
	background: #f2f2f2;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background: #f68020;
}
 }

</style>
