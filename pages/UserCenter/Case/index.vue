<template>
  <div class="userCenter-case">
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
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{path:'/'}" >京师在线</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/userCenter'}" >工作台</el-breadcrumb-item>
        <el-breadcrumb-item >我的案例</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="5">
        <div class="case-screen">
          <div class="case-screen-title">
            <i class="case-icon  iconfont iconicon-test"/>条件筛选
          </div>
          <div class="case-screen-content">
            <p>所属行业</p>
            <el-select
              v-model="userCaseSearch.industryId"
              style="width:100%"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="userCaseSearch.industryId=null"
              @change="getUserCaseList">
              <template slot="prefix">
                <img class="case-icon" src="../../../assets/usercenter/industry.png">
              </template>
              <el-option v-for="item in industryData" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <p>管辖法院</p>
            <el-select
              v-model="userCaseSearch.courtId"
              style="width:100%"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="userCaseSearch.courtId=''"
              @change="getUserCaseList"
            >
              <template slot="prefix">
                <img class="case-icon" src="../../../assets/usercenter/court.png">
              </template>
              <el-option
                v-for="item in courtData"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
            <p>所属案由</p>
            <div class="casereason_treedata">
              <img class="case-icon" src="../../../assets/usercenter/casereason.png">
              <a-tree-select
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="casereasonTreeData"
                v-model="userCaseSearch.casereasonId"
                show-search
                allow-clear
                style="width: 100%"
                tree-node-filter-prop="title"
                placeholder="请选择"
              />
            </div>
            <p>专业领域</p>
            <div class="practice_treedata">
              <img class="case-icon" src="../../../assets/usercenter/practice.png">
              <a-tree-select
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="PracticeTreeDataForAntd"
                v-model="userCaseSearch.practiceId"
                show-search
                allow-clear
                style="width: 100%"
                tree-node-filter-prop="title"
                placeholder="请选择"
              />
            </div>
            <p>审核状态</p>
            <el-radio-group v-model="userCaseSearch.checkExamine">
              <el-radio v-for="item in examineStatus" :label="item.name" :key="item.displayName" @change="getUserCaseList">{{ item.displayName }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 添加案例 -->
        <div class="case-addCase">
          <nuxt-link :to="{name: 'UserCenter-Case-create'}"><el-button type="primary" icon="el-icon-circle-plus-outline">添加案例</el-button></nuxt-link>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="case-sort">
          <img class="case-icon" src="../../../assets/usercenter/sort.png">排序
          <el-select v-model="userCaseSearch.sortId" size="small" clearable placeholder="请选择" class="sort-select" @change="getUserCaseList">
            <el-option
              v-for="item in sortData"
              :key="item.id"
              :label="item.name"
              :value="item.displayName"/>
          </el-select>
          <el-input
            v-model="searchKey"
            clearable
            class="search-input"
            placeholder="搜索案例"
            size="small"
            prefix-icon="el-icon-search"
            @clear="searchKey=''"
            @input="changeSearch"
            @keyup.enter.native="getUserCaseList"/>
          <nuxt-link :to="{name: 'UserCenter-Case-create'}"><el-button type="primary" size="small" icon="el-icon-circle-plus-outline">添加案例</el-button></nuxt-link>
        </div>
        <div class="case-list">
          <ul>
            <li v-for="(item, index) in userCaseData" :key="index">
              <el-row>
                <el-col :span="6">
                  <div class="case-introduce">
                    <p v-if="item.caseType===1">裁判文书号：</p>
                    <p v-if="item.caseType===1">{{ item.judgmentNumber }}</p>
                    <div class="case-introduce-list">
                      <p v-if="item.caseType===2" ><i class="iconfont icontriangle-arrow-r"/>所属行业：{{ item.industryName }}</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属领域：{{ item.practiceAreaName }}</p>
                      <p v-if="item.caseType===1"><i class="iconfont icontriangle-arrow-r"/>所属案由：{{ item.caseReasonName }}</p>
                      <p v-if="item.caseType===1"><i class="iconfont icontriangle-arrow-r"/>管辖法院：{{ item.courtName }}</p>
                    </div>
                    <div class="case-introduce-button">
                      <el-button v-if="item.isClassicCase" type="primary" size="mini" icon="el-icon-coordinate">经典案例</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="danger">已驳回</el-button> -->
                      <!-- <el-button size="mini" style="margin-left:18px" type="info">草稿案件</el-button> -->
                      <el-button size="mini" style="margin-left:18px" type="warning">审核中</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="primary">审核通过</el-button> -->
                    </div>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="case-article">
                    <p class="case-article-title" @click="toCaseInfo(item.id)">
                      {{ item.title }}
                    </p>
                    <div class="case-article-desc">
                      <span>【法院观点】</span>
                      <div class="case-judgment" v-html="item.highlight.judgmentDocument?item.highlight.judgmentDocument[0]:''"/>
                    </div>
                    <el-row class="case-article-bottom">
                      <el-col :span="16" class="case-article-time">{{ item.endTime }}</el-col>
                      <el-col :span="8" class="case-article-button">
                        <el-button size="mini" icon="el-icon-delete" @click="deteleCase(item.id)">删除</el-button>
                        <nuxt-link :to="{path: `/usercenter/case/${item.id}/update` }"> <el-button type="primary" size="mini" icon="el-icon-edit" style="background:rgba(246,128,32,1);border-color:rgba(246,128,32,1);">编辑</el-button></nuxt-link>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </li>
            <li v-if="userCaseData.length===0" style="height:200px;line-height:200px;text-align:center">暂无相关数据！</li>
          </ul>
        </div>
        <div style="text-align:center;margin:20px 0">
          <Pagination v-show="totalCount>0" :total="totalCount" :page="userCaseSearch.pageIndex" :limit="userCaseSearch.pageCount" @pagination="handlePageChange" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index'
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'userCenter',
  name: 'UserCenterCase',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心-案件管理',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      loading: '',
      totalCount: 0,
      userCaseData: [], // 案例
      searchKey: '', // 搜索关键字
      timer: '',
      userCaseSearch: {
        industryId: '', // 行业id
        caseReasonId: '', // 案由Id number
        practiceAreaId: '', // 领域Id number 【诉讼领域,非诉讼领域】
        courtLevel: '', // 法院等级 number
        courtReginId: '', // 法院所属区域 nmuber || arr
        courtId: '', // 法院Id number
        checkExamine: '', // 审核
        sortId: '', // 排序
        pageCount: 5, // 页目条数 number
        pageIndex: 1// 页码 number
      }
    }
  },
  computed: {
    ...mapState({
      PracticeTreeDataForAntd: state => state.practice.PracticeTreeDataForAntd,
      casereasonTreeData: state => state.caseReason.casereasonTreeDataForAntd,
      courtData: state => state.court.courtData,
      industryData: state => state.industry.industryData,
      sortData: state => state.case.sortData,
      examineStatus: state => state.lawyer.examineStatus
    })
  },
  watch: {
  },
  mounted() {
    this.getUserCaseList()
  },
  methods: {
    FixLocation(triggerNode) {
      console.log(triggerNode)
      debugger
      triggerNode => document // .getDocument().getElementById('casereasontreeselect')
      // return document.getDocument() // .getElementById('casereasontreeselect')
    },
    ...mapActions('case', ['userCenterCaseQuery']),
    // 获取案件
    getUserCaseList(delayTime = 150) {
      this.loading = true
      setTimeout(this.request, delayTime)
    },
    request() {
      this.userCenterCaseQuery({ ...this.userCaseSearch, ...this.searchKey }).then(res => {
        this.userCaseData = res.items
        this.totalCount = res.totalCount
        this.loading = false
      })
    },
    toCaseInfo(caseId) {
      this.$router.push(`/usercenter/case/${caseId}/info`)
    },
    // 搜索关键字防抖节流
    changeSearch: function(data) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getUserCaseList()
      }, 1000)
    },
    // 删除
    deteleCase() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 分页切换点击事件
    handlePageChange(val) {
      this.userCaseSearch.pageIndex = val.page
      this.userCaseSearch.pageCount = val.limit
      this.getUserCaseList()
    }
  }
}
</script>
<style lang='scss' scoped>
.userCenter-case{
  letter-spacing:1px;
  .case-icon{
    height:20px;width: 20px;margin-right:6px;
    }
    // 左侧搜索
  .case-screen{
    height:560px;margin-right:7px;background:#fff;color:rgba(0,0,0,1);
    .case-screen-title{ //搜索标题
      height:48px;line-height:48px;padding-left:31px;font-size: 14px;border-bottom: 1px solid rgba(238,238,238,1);
      margin-bottom: 20px;
    }
    .case-screen-content{
      padding: 0 32px;
      p{
        margin-top: 18px !important;
        margin-bottom: 12px !important;
        &:first-child{
          margin-top: 0 !important;
        }
      }
      .casereason_treedata,.practice_treedata{
        img{
          position: absolute;
          z-index: 9;
          margin: 6px;
        }
      }
      .el-radio-group{
        padding-left: 26px;
        .el-radio{
          display: block;
          margin-bottom: 14px;
          font-size: 12px;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
    }

    // .case-screen-content{//搜索下拉框
    //   padding:2px 31px 21px 31px;
    //   .case-screen-item{
    //     margin-top:17px;
    //     position:relative;
    //     p{margin-bottom: 11px!important;font-size:12px;}
    //      .el-input__inner{height: 28px !important;}
    //      //审核状态
    //      .el-checkbox-group{.el-checkbox{display: block;margin-bottom: 18px;margin-left: 30px}}
    //    }
    //    //搜索图标
    //    .case-screen-industryId,.case-screen-court,.case-screen-casereason,.case-screen-practice{
    //      position: relative;
    //     .case-icon{position:absolute;top:32px;left:5px;z-index:10;}
    //   }
    //   .el-radio-group{margin-left:30px;.el-radio{display: block;margin-bottom:18px;}}
    // }

  }
  // 左边添加案例
  .case-addCase{margin-top:21px;.el-button--primary{width: 278px;height: 46px;background:#F68020;border-color: #F68020;font-size: 16px;margin-bottom: 120px}}
  //右边排序
  .case-sort{background:#fff;height:70px;line-height:70px;margin-left:15px;margin-bottom:20px;padding: 0 40px 0 27px;font-size: 14px;
     .case-icon{vertical-align:text-top}
     .search-input{width: 452px;margin-left: 100px}
     .sort-select{width: 124px;margin-left:25px}
     .el-input__suffix{left:5px !important}
     .el-button{background:#F68020;border-color: #F68020;width: 119px;margin-left: 116px}
     }
  //  右边案例列表
  .case-list{ margin-left:15px;  position:relative;
  ul{li{background:#fff;min-height:310px;margin-bottom: 22px;padding: 21px;
  // 右边左边
  .case-introduce{min-height:268px;width:260px;padding-left: 17px;font-size: 12px;color:#666666;
  p:nth-child(2){ margin:13px 0 26px 0 !important;}
  .case-introduce-list{p{margin-bottom: 17px !important;color:#999999}}
  .case-introduce-button{position: absolute;bottom: 0;left: 17px;}
  }
  // 右边右边
  .case-article{padding:0 18px 0 40px;border-left:1px solid rgba(0,0,0,0.05);margin-left: 30px;
  min-height:268px;
  .case-article-title{font-size:18px;color:rgba(51,51,51,1);line-height:28px;cursor: pointer;}
  .case-article-desc{margin-top: 24px;margin-bottom:57px;
  span{font-size:14px;color:rgba(51,51,51,1);}
  .case-judgment,p{font-size:14px;color:rgba(153,153,153,1);margin-top:13px}}
  .case-article-bottom{position: absolute;bottom: 0;right: 30px;width: 670px;
  .case-article-button{.el-button{margin-left:18px;float:right}}
  .case-article-time{font-size:12px;color:rgba(102,102,102,1);}}
  }
  }}}
}
#casereason{
  position: relative;
}
</style>
<style lang='scss'>
.userCenter-case{
  .case-screen{
    .case-screen-content{
      .case-screen-item{
         .el-input__inner{
        line-height:28px !important;
        width:216px;
        padding-left:30px !important;
        font-size:12px;
        color:rgba(102,102,102,1) !important;
      }
      }
      .case-screen-casereason ,.case-screen-practice{
        .ant-select{font-size:12px;
           .ant-select-selection--single{height:28px;padding-left:19px;
           .ant-select-selection__rendered{line-height:28px !important;}}
      }}
    }
  }
 .el-radio{
      .el-radio__label{font-size: 12px !important;}}
}

.el-input__prefix{
  img{
    margin: 4px;
  }
}
.casereason_treedata,.practice_treedata{
  .ant-select-selection--single{
    text-indent: 20px;
  }
}
</style>
