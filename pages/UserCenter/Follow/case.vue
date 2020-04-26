<template>
  <div>
    <!-- ↓↓↓↓↓↓↓↓↓↓↓ 勿删！勿删！勿删！勿删！勿删！  没有任何作用且页面不显示。防止  antdv tree-select option 定位跑偏    勿删！勿删！勿删！勿删！勿删！ ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <a-tree-select
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      show-search
      allow-clear
      style="width: 100%;display:none;"
      tree-node-filter-prop="title"
      placeholder="请选择"
    />
    <!-- ↑↑↑↑↑↑↑↑↑↑↑ 勿删！勿删！勿删！勿删！勿删！  没有任何作用且页面不显示。防止  antdv tree-select option 定位跑偏    勿删！勿删！勿删！勿删！勿删！ ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
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
          <div class="case-item">
            <p>擅长行业</p>
            <img class="case-icon" src="../../../assets/usercenter/industry.png">
            <el-select
              v-model="CaseSearch.industryId"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="CaseSearch.industryId=null"
              @change="getUserCaseList">
              <el-option v-for="item in industryData" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </div>
          <div class="case-item">
            <p>所属案由</p>
            <img class="case-icon" src="../../../assets/usercenter/casereason.png">
            <a-tree-select
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="casereasonTreeData"
              v-model="CaseSearch.caseReasonId"
              show-search
              style="width: 100%"
              tree-node-filter-prop="title"
              placeholder="请选择"
            />
          </div>
          <div class="case-item">
            <p>专业领域</p>
            <img class="case-icon" src="../../../assets/usercenter/practice.png">
            <a-tree-select
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="lawsuitPracticeTreeData"
              v-model="CaseSearch.practiceId"
              show-search
              style="width: 100%"
              tree-node-filter-prop="title"
              placeholder="请选择"
            />
          </div>
          <div class="case-item">
            <p>管辖法院</p>
            <img class="case-icon" src="../../../assets/usercenter/court.png">
            <el-select
              v-model="CaseSearch.courtId"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="CaseSearch.courtId=''"
              @change="getUserCaseList"
            >
              <el-option
                v-for="item in courtData"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </div>
          <div class="case-item">
            <p>法院等级</p>
            <img class="case-icon" src="../../../assets/usercenter/courtlevel.png">
            <el-select
              v-model="CaseSearch.courtLevel"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="CaseSearch.courtLevel=null"
              @change="getUserCaseList">
              <el-option v-for="item in courtLevelData" :key="item.id" :label="item.description" :value="item.id"/>
            </el-select>
          </div>
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
              v-model="CaseSearch.searchKey"
              clearable
              placeholder="请输入关键字查询"/>
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
                <span><i class="el-icon-time"/>{{ item.endTime.split(" ")[0] }}</span>
                <span v-if="item.caseType===1">{{ item.judgmentNumber }}</span>
              </div>
              <img v-if="item.isClassicCase" src="@/assets/case/case-classic2.png" style="border:none;width:100%;max-width:fit-content;position:absolute;top:0;right:0;">
            </li>
            <li v-if="caseData.length===0" style="height:200px;line-height:200px;text-align:center">暂无相关数据！</li>
          </ul>
        </div>
        <Pagination v-show="totalCount>0" :total="totalCount" :page="CaseSearch.pageIndex" :limit="CaseSearch.pageCount" @pagination="handlePageChange" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import authIcon from '@/assets/lawyer/lawyer_auth.png'
import shareIcon from '@/assets/lawyer/share.png'
import collectionIcon from '@/assets/lawyer/collection.png'
import Pagination from '../../../components/Pagination/index'
import { mapState, mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
export default {
  layout: 'userCenter',
  name: 'Lawyer',
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  components: {
    Pagination
  },
  async asyncData({ params }) {
    const [caseData] = await Promise.all([
      axios.post(`${process.env.baseUrl}/${setting.apiPrefix}/customer/case/query`, { query: { practiceId: '', searchKey: '', courtLevel: '', courtId: '', industryId: '', caseReasonId: '', lawyerId: '', courtReginId: '', sorting: 'casestatus', sortType: 1, pageCount: 10, pageIndex: 1 }}, { 'Content-Type': 'application/json' })
    ])
    return {
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
      CaseSearch: { // 搜索条件
        practiceId: '', // 诉讼领域
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
      totalCount: 1,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      pointsnum: 1, // 排序计次
      conditioncasecountnum: 0
    }
  },
  computed: {
    ...mapState({
      lawsuitPracticeTreeData: state => state.practice.PracticeTreeDataForAntd,
      casereasonTreeData: state => state.caseReason.casereasonTreeDataForAntd,
      industryData: state => state.industry.industryData,
      courtData: state => state.court.courtData,
      courtLevelData: state => state.court.courtLevel
    })
  },

  watch: {
  },
  mounted() {},

  methods: {
    ...mapActions('case', ['getCaseListData']),
    // 获取数据
    getUserCaseList() {
      this.loading = true
      setTimeout(this.request)
    },
    request() {
      this.getCaseListData({
        ...this.caseSearch
      }).then(res => {
        this.caseData = res.items
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

<style lang="scss">

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
  margin-bottom: 150px;
  .case-item{
    p{
      font-size: 12px;
      margin-top: 18px !important;
      margin-bottom: 12px !important;
    }
    img{
      position: absolute;
      z-index: 10;
      margin: 6px;
    }
    .case-icon{
      height: 20px;
      width: 20px;
      margin-right: 6px;
    }
    .el-select{
      width: 100%;
      .el-input__inner{
        padding-left: 30px!important;
      }
    }
    .ant-select{
      width: 100%;
      .ant-select-selection-selected-value{
        padding-left: 20px;
      }
    }
  }
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
}
.selectend {
  padding: 0px 25px;
  margin-bottom: 20px;
  .selecttab {
    padding: 20px;
    overflow: hidden;
    p{
      float: left;
      font-size: 14px;
      margin-right: 35px!important;
      margin-bottom: 0px;
    }
    .el-select{
      float: left;
      .el-input__inner{
        height:30px;
        line-height: 30px;
      }
    }
    >.el-input{
      float: right;
      width:390px;
      .el-input__inner{
        height:30px;
        line-height: 30px;
      }
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
        p{
          margin-bottom: 20px!important;
          color: #333333;
          font-size: 14px;
          line-height: 28px;
        }
      }
        p:nth-child(1) {
          font-size: 18px;
        }

        .case-content-col {
          color: #999999;
          font-size: 14px;
          height: 40px;
          >div{
            line-height: 22px;
          }
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
