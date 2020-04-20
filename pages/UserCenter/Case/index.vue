<template>
  <div class="userCenter-case">
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
            <div class="case-screen-industryId case-screen-item">
              <p>所属行业</p>
              <img class="case-icon" src="../../../assets/usercenter/industry.png">
              <el-select v-model="userCaseSearch.industryId" size="mini" placeholder="请选择" filterable clearable @change="selectIndustryChanged">
                <el-option v-for="item in industryData" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </div>
            <div class="case-screen-court case-screen-item">
              <p>管辖法院</p>
              <img class="case-icon" src="../../../assets/usercenter/court.png">
              <el-select
                v-model="userCaseSearch.courtId"
                size="mini"
                placeholder="请选择"
                filterable
                clearable
                @change="selectCourtChanged">
                <el-option
                  v-for="item in courtData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="case-screen-casereason case-screen-item">
              <p>所属案由</p>
              <img class="case-icon" src="../../../assets/usercenter/casereason.png">
              <el-select v-model="userCaseSearch.practiceId" multiple placeholder="请选择" size="mini">
                <el-option v-for="item in casereasonTreeData" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </div>
            <div class="case-screen-practice case-screen-item">
              <p>专业领域</p>
              <img class="case-icon" src="../../../assets/usercenter/practice.png">
              <el-select v-model="userCaseSearch.practiceId" multiple placeholder="请选择" size="mini">
                <el-option v-for="item in PracticeTreeData" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </div>
            <div class="case-screen-practice case-screen-item">
              <p>审核状态</p>
              <el-checkbox-group v-model="userCaseSearch.checkExamineList" :min="1" :max="1" @change="handleExamineChange">
                <el-checkbox label="审核中"/>
                <el-checkbox label="审核通过"/>
                <el-checkbox label="已驳回"/>
                <el-checkbox label="草稿案件"/>
              </el-checkbox-group>
            </div>
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
          <el-select v-model="userCaseSearch.sortId" size="small" clearable placeholder="请选择" class="sort-select" @change="selectSortChanged">
            <el-option
              v-for="item in sortData"
              :key="item.id"
              :label="item.name"
              :value="item.displayName"/>
          </el-select>
          <el-input
            v-model="userCaseSearch.searchKey"
            class="search-input"
            placeholder="搜索案例"
            size="small"
            suffix-icon="el-icon-search"
            @keyup.enter.native="enterSearchKey"/>
          <nuxt-link :to="{name: 'UserCenter-Case-create'}"><el-button type="primary" size="small" icon="el-icon-circle-plus-outline">添加案例</el-button></nuxt-link>
        </div>
        <div class="case-list">
          <ul>
            <li>
              <el-row>
                <el-col :span="6">
                  <div class="case-introduce">
                    <p>裁判文书号：</p>
                    <p style="margin:13px 0 26px 0">（2015）渝二中法行终字第00085号</p>
                    <div class="case-introduce-list">
                      <p><i class="iconfont icontriangle-arrow-r"/>所属行业：无所属行业</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属领域：政府</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属案由：行政征收</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>管辖法院：重庆市第二中级人民法院</p>
                    </div>
                    <div class="case-introduce-button">
                      <el-button type="primary" size="mini" icon="el-icon-coordinate">经典案例</el-button>
                      <el-button size="mini" style="margin-left:18px" type="danger">已驳回</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="info">草稿案件</el-button>
                      <el-button size="mini" style="margin-left:18px" type="warning">审核中</el-button>
                      <el-button size="mini" style="margin-left:18px" type="primary">审核通过</el-button> -->
                    </div>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="case-article">
                    <p class="case-article-title">
                      邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行
                    </p>
                    <div class="case-article-desc">
                      <span>【法院观点】</span>
                      <p>
                        民政府（简称朱衣镇政府）在未办理农用地转用和土和土地征收土地征收民用其房屋强占土目建设需占用其房屋和耕地，奉节县占土地行为违法奉节县占土地
                      </p>
                    </div>
                    <el-row class="case-article-bottom">
                      <el-col :span="16" class="case-article-time">录入时间：2020-04-07</el-col>
                      <el-col :span="8" class="case-article-button">
                        <el-button size="mini" icon="el-icon-delete" @click="deteleCase">删除</el-button>
                        <nuxt-link :to="{name: 'UserCenter-Case-update?caseType=' + 1}"> <el-button type="primary" size="mini" icon="el-icon-edit" style="background:rgba(246,128,32,1);border-color:rgba(246,128,32,1);">编辑</el-button></nuxt-link>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="6">
                  <div class="case-introduce">
                    <p>裁判文书号：</p>
                    <p style="margin:13px 0 26px 0">（2015）渝二中法行终字第00085号</p>
                    <div class="case-introduce-list">
                      <p><i class="iconfont icontriangle-arrow-r"/>所属行业：无所属行业</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属领域：政府</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属案由：行政征收</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>管辖法院：重庆市第二中级人民法院</p>
                    </div>
                    <div class="case-introduce-button">
                      <el-button type="primary" size="mini" icon="el-icon-coordinate">经典案例</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="danger">已驳回</el-button> -->
                      <!-- <el-button size="mini" style="margin-left:18px" type="info">草稿案件</el-button> -->
                      <el-button size="mini" style="margin-left:18px" type="warning">审核中</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="primary">审核通过</el-button> -->
                    </div>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="case-article">
                    <p class="case-article-title">
                      邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行
                    </p>
                    <div class="case-article-desc">
                      <span>【法院观点】</span>
                      <p>
                        民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收土地征收民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋强占土目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋强占土地行为违法.......民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋强占土目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋强占土地行为违法.......民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋强占土目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋强占土地行为违法.......
                      </p>
                    </div>
                    <el-row class="case-article-bottom">
                      <el-col :span="16" class="case-article-time">录入时间：2020-04-07</el-col>
                      <el-col :span="8" class="case-article-button">
<el-button size="mini" icon="el-icon-delete" >删除</el-button></el-col></el-row></div></el-col></el-row></li></ul></div></el-col></el-row></div></ul></li></el-row></el-col></div></el-row></el-col></el-button></template>
                        <el-button type="primary" size="mini" icon="el-icon-edit" style="background:rgba(246,128,32,1);border-color:rgba(246,128,32,1);">编辑</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="6">
                  <div class="case-introduce">
                    <p>裁判文书号：</p>
                    <p style="margin:13px 0 26px 0">（2015）渝二中法行终字第00085号</p>
                    <div class="case-introduce-list">
                      <p><i class="iconfont icontriangle-arrow-r"/>所属行业：无所属行业</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属领域：政府</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>所属案由：行政征收</p>
                      <p><i class="iconfont icontriangle-arrow-r"/>管辖法院：重庆市第二中级人民法院</p>
                    </div>
                    <div class="case-introduce-button">
                      <el-button type="primary" size="mini" icon="el-icon-coordinate">经典案例</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="danger">已驳回</el-button> -->
                      <el-button size="mini" style="margin-left:18px" type="info">草稿案件</el-button>
                      <!-- <el-button size="mini" style="margin-left:18px" type="warning">审核中</el-button> -->
                      <!-- <el-button size="mini" style="margin-left:18px" type="primary">审核通过</el-button> -->
                    </div>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="case-article">
                    <p class="case-article-title">
                      邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行
                    </p>
                    <div class="case-article-desc">
                      <span>【法院观点】</span>
                      <p>
                        民政府（简称朱衣镇政府）在未办理农用地转用和土和土地征收土地征收民用其房屋强占土目建设需占用其房屋和耕地，奉节县占土地行为违法奉节县占土地
                      </p>
                    </div>
                    <el-row class="case-article-bottom">
                      <el-col :span="16" class="case-article-time">录入时间：2020-04-07</el-col>
                      <el-col :span="8" class="case-article-button">
                        <el-button size="mini" icon="el-icon-delete" >删除</template>
                        <el-button type="primary" size="mini" icon="el-icon-edit" style="background:rgba(246,128,32,1);border-color:rgba(246,128,32,1);">编辑</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </li>
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

import { mapState } from 'vuex'
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
      totalCount: 10,
      userCaseSearch: {
        searchKey: '', // 搜索关键字
        industryId: null, // 行业id
        caseReasonId: undefined, // 案由Id number
        practiceAreaId: undefined, // 领域Id number 【诉讼领域,非诉讼领域】
        courtLevel: undefined, // 法院等级 number
        courtReginId: undefined, // 法院所属区域 nmuber || arr
        courtId: undefined, // 法院Id number
        checkExamineList: [], // 审核
        sortId: '', // 排序
        pageCount: 5, // 页目条数 number
        pageIndex: 1// 页码 number
      }
    }
  },
  computed: {
    ...mapState({
      casereasonTreeData: state => state.caseReason.casereasonTreeData,
      PracticeTreeData: state => state.practice.PracticeTreeData,
      courtData: state => state.court.courtData,
      industryData: state => state.industry.industryData,
      sortData: state => state.case.sortData
    })
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    // 审核状态点击事件
    handleExamineChange() {
      console.log(this.userCaseSearch)
      // 掉接口
      // this.userCaseSearch.checkExamineList = []
    },
    // 所属行业点击事件
    selectIndustryChanged() {
      console.log(this.userCaseSearch)
      // 掉接口
      // this.userCaseSearch.industryId = ''
    },
    // 管辖法院点击事件
    selectCourtChanged() {
      console.log(this.userCaseSearch)
      // 掉接口
      // this.userCaseSearch.courtId = ''
    },
    // 排序筛选点击事件
    selectSortChanged() {
      console.log(this.userCaseSearch)
      // 掉接口
      // this.userCaseSearch.sortId = '1'
    },
    // 排序筛选点击事件
    enterSearchKey() {
      console.log(this.userCaseSearch)
      // 掉接口
      // this.userCaseSearch.searchKey = ''
    },
    // 删除
    deteleCase() {
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$notify({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    // 分页切换点击事件
    handlePageChange(val) {
      this.userCaseSearch.pageIndex = val.page
      this.userCaseSearch.pageCount = val.limit
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
    height:540px;margin-right:7px;background:#fff;color:rgba(0,0,0,1);
    .case-screen-title{ //搜索标题
      height:48px;line-height:48px;padding-left:31px;font-size: 14px;border-bottom: 1px solid rgba(238,238,238,1);
    }
    .case-screen-content{//搜索下拉框
      padding:2px 31px 31px 31px;
      .case-screen-item{
        margin-top:17px;
        position:relative;
        p{margin-bottom: 11px;font-size:12px;}
         .el-input__inner{height: 28px !important;}
         //审核状态
         .el-checkbox-group{.el-checkbox{display: block;margin-bottom: 18px;margin-left: 30px}}
       }
       //搜索图标
       .case-screen-industryId,.case-screen-court,.case-screen-casereason,.case-screen-practice{
        .case-icon{position:absolute;top:30px;left:5px;z-index:10;}
      }
    }

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
  .case-introduce-list{p{margin-bottom: 17px;color:#999999}}
  .case-introduce-button{position: absolute;bottom: 0;left: 17px;}
  }
  // 右边右边
  .case-article{padding:0 18px 0 40px;border-left:1px solid rgba(0,0,0,0.05);margin-left: 30px;
  min-height:268px;
  .case-article-title{font-size:18px;color:rgba(51,51,51,1);line-height:28px;}
  .case-article-desc{margin-top: 24px;margin-bottom:57px;
  span{font-size:14px;color:rgba(51,51,51,1);}
  p{font-size:14px;color:rgba(153,153,153,1);margin-top:13px}}
  .case-article-bottom{position: absolute;bottom: 0;right: 30px;width: 670px;
  .case-article-button{.el-button{margin-left:18px;float:right}}
  .case-article-time{font-size:12px;color:rgba(102,102,102,1);}}
  }
  }}}
}

</style>
<style lang='scss'>
.userCenter-case{
  .case-screen{
    .case-screen-content{
      .case-screen-item{
         .el-input__inner{
        line-height:28px !important;
        padding-left:30px !important;
        font-size:12px;
        color:rgba(102,102,102,1) !important;
      }
      }
    }
     .vue-treeselect__control{height: 28px !important;line-height:28px !important;padding-left: 30px !important;
    font-size: 12px;color: #666666 !important;width:208px;}
  }
   .case-sort{
  }
}

</style>
