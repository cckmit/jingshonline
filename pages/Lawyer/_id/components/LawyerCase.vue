<template>
  <div class="lawyer-case">
    <div class="lawyer-case-select">
      <div class="lawyer-case-item">
        <p>管辖法院 :</p>
        <treeselect
          :options="courtData"
          :disable-branch-nodes="true"
          :show-count="true"
          v-model="caseListParam.courtId"
          placeholder="请选择管辖法院"
        />
      </div>
      <div class="lawyer-case-item">
        <p>所属行业 :</p>
        <treeselect
          :options="courtData"
          :disable-branch-nodes="true"
          :show-count="true"
          v-model="caseListParam.industryId"
          placeholder="请选择所属行业"
        />
      </div>
      <div class="lawyer-case-item">
        <p>所属领域 :</p>
        <treeselect
          :options="courtData"
          :disable-branch-nodes="true"
          :show-count="true"
          v-model="caseListParam.practiceAreaId"
          placeholder="请选择所属领域"
        />
      </div>
    </div>
    <div class="lawyer-case-filter">
      <span :class="activeIndex === 1 ? 'filter-active' : ''" @click="filterChange('updatetime')">更新时间</span>
      <span :class="activeIndex === 2 ? 'filter-active' : ''" @click="filterChange('visitorcount')">访问人数</span>
      <span :class="activeIndex === 3 ? 'filter-active' : ''" @click="filterChange('clickcount')">收藏数量</span>
      <i/>
    </div>
    <div class="lawyer-case-list">
      <div v-for="(item,index) in lawyerCaseList" :key="index" class="lawyer-case-list-item">
        <nuxt-link :to="'/case/'+item.id+'/info'">
          <div class="case-item-title">{{ item.highlight.title[0] }}<span>{{ item.updateTime | dateFormat("YYYY-mm-dd") }}</span></div>
        </nuxt-link>
        <p class="case-item-article">{{ item.highlight.judgmentDocument[0] }}</p>
        <div class="case-item-bottom">
          <span :class="item.caseStatus === 2 ? 'check-active':'check'" class="no-select" v-text="item.caseStatus === 2 ? '已审核': '未审核'" />
          <span class="collect no-select" @click="userCollect(index)"><i :class="item.isCollect ? 'el-icon-star-on' : 'el-icon-star-off'">收藏</i></span>
          <span class="share no-select" @click="userShare"><i/>分享</span>
        </div>
        <i class="classic"/>
      </div>
    </div>
    <Pagination v-show="totalCount>0" :total="totalCount" :page="caseListParam.pageIndex" :limit="caseListParam.pageCount" @pagination="handlePageChange" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions } from 'vuex'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'LawyerCase',
  components: {
    Pagination,
    Treeselect
  },
  props: {

  },
  data() {
    return {
      // 认证案例列表
      lawyerCaseList: [],
      // 筛选条件高亮
      activeIndex: 1,
      // 分页器
      totalCount: 10,
      // 获取认证案例所需参数 必传
      caseListParam: {
        practiceAreaId: undefined, // 领域Id number 【诉讼领域,非诉讼领域】
        searchKey: '', // 搜索关键字: 支持(当事人、律师、专业领域、案由、法院、律所、裁判文书关键字) string
        courtLevel: undefined, // 法院等级 number
        courtReginId: undefined, // 法院所属区域 nmuber || arr
        courtId: undefined, // 法院Id number
        caseReasonId: undefined, // 案由Id number
        lawyerId: this.$route.params.id, // 律师Id number
        industryId: null, // 行业id 暂无检索条件
        sorting: '', // 排序
        sortType: 0, // 排序类型
        pageCount: 10, // 页目条数 number
        pageIndex: 1// 页码 number
      },
      // 法院数据
      courtData: [],
      // 行业树数据
      industryTree: [],
      practiceAreaData: []
    }
  },
  computed: {
  },
  watch: {
    // 监听检索条件
    caseListParam: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log('刷新检索条件:', val)
        // this.getLawyerCaseList(val)
      }
    }
  },
  mounted() {
    this.getLawyerCaseList(this.caseListParam)
  },
  methods: {
    ...mapActions('lawyerinfo', ['GetLawyerCaseList']),
    // 获取认证案例列表
    getLawyerCaseList(query) {
      this.GetLawyerCaseList(query).then(res => {
        if (res !== null) {
          this.totalCount = res.totalCount
          this.lawyerCaseList = res.items
          console.log(this.lawyerCaseList)
          // 处理案例法院数据
          this.lawyerCaseList.forEach(item => {
            this.courtData.push({
              id: item.courtId,
              label: item.courtName
            })
          })
        }
      })
    },
    // 改变排序状态
    filterChange(type) {
      if (type === 'updatetime') {
        this.activeIndex = 1
        this.caseListParam.sorting = 'updatetime'
      }
      if (type === 'visitorcount') {
        this.activeIndex = 2
        this.caseListParam.sorting = 'visitorcount'
      }
      if (type === 'clickcount') {
        this.activeIndex = 3
        this.caseListParam.sorting = 'clickcount'
      }
    },
    // 翻页操作
    handlePageChange(val) {
      this.caseListParam.pageIndex = val.page
      this.caseListParam.pageCount = val.limit
    },
    // 用户收藏
    userCollect(index) {
      this.lawyerCaseList[index].isCollect = !this.lawyerCaseList[index].isCollect
    },
    // 用户分享
    userShare() {
    }
  }
}
</script>

<style lang="scss">
.no-select{

  -webkit-touch-callout: none; /* iOS Safari */

  -webkit-user-select: none; /* Chrome/Safari/Opera */

  -khtml-user-select: none; /* Konqueror */

  -moz-user-select: none; /* Firefox */

  -ms-user-select: none; /* Internet Explorer/Edge */

  user-select: none; /* Non-prefixed version, currently not supported by any browser */

}
.lawyer-case{
  .pagination-container {
    background: #f2f2f2;
  }
  .lawyer-case-select{
    background: #fff;
    padding-top: 25px;
    padding-left: 38px;
    padding-bottom: 25px;
    border: 1px solid #eee;
    border-top: none;
    display: flex;
    justify-content: flex-start;
    line-height: 28px;
    p {
      margin-bottom: 6px;
    }
    .lawyer-case-item {
      margin-right: 60px;
      color: #333333;
      .el-input__inner {
        width: 280px;
        height: 30px;
        line-height: 28px;
        outline: none;
        border: 1px solid #e7edf1;
        border-radius: 0;
        overflow: hidden;
      }
      .el-icon-arrow-up:before {
        position: relative;
        top: -6px;
      }
      .el-input__icon {
        color: #fff;
        background: #cccccc;
        position: absolute;
        right: -5px;
        top: 0.5px;
        transition: none;
        width:30px;
        height:30px;
        background:rgba(204,204,204,1);
        border:1px solid rgba(230, 236, 240, 0.8);
      }
      .is-reverse {
        background: #f68020;
      }
      .vue-treeselect {
        outline: 0;
      }
      .vue-treeselect--focused:not(.vue-treeselect--open) .vue-treeselect__control {
        border-color: none;
        box-shadow: none;
      }
      .vue-treeselect__control{
        outline: none;
        padding-left: 5px;
        display: table;
        table-layout: fixed;
        width: 100%;
        width: 280px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ddd;
        border-radius: 3px;
        background: #fff;
        -webkit-transition-duration: 200ms;
        transition-duration: 200ms;
        -webkit-transition-property: border-color, box-shadow, width, height, background-color, opacity;
        transition-property: border-color, box-shadow, width, height, background-color, opacity;
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
      }
      .vue-treeselect__input {
        font-size: 14px;
      }
      .vue-treeselect__menu-container {
        font-size: 14px;
        width: 280px;
      }
      .vue-treeselect__placeholder {
        font-size: 14px;
        line-height: 30px
      }
      .vue-treeselect__control-arrow-container {
        position: relative;
        left: 5px;
        width: 30px;
        height: 30px;
        background:#f2f2f2
      }
      .vue-treeselect--open {
        .vue-treeselect__control-arrow-container {
          background: #f68020
        }
      }
    }
  }
  .lawyer-case-filter {
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #999999;
    padding-left: 12px;
    position: relative;
    .filter-active {
      color:#f68020;
    }
    i{
      position: absolute;
      width: 147px;
      height: 20px;
      background-image: url("../../../../assets/lawyerinfo/jinsh.png");
      background-repeat: no-repeat;
      block-size: 100% 100%;
      right: 18px;
      top: 18px;
    }
    span {
      cursor: pointer;
      margin-right: 40px;
    }
  }
  .lawyer-case-list {
    margin-bottom: 24px;
    .lawyer-case-list-item {
      background: #fff;
      cursor: pointer;
      height: auto;
      border-width: 1px 1px 1px 3px;
      border-style: solid;
      border-color:#eee #eee #eee #c5c5c5;
      position: relative;
      margin-bottom: 16px;
      .case-item-title {
        padding-left: 24px;
        padding-right: 28px;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        margin-top: 19px;
        margin-bottom: 19px;
        position: relative;
        overflow: hidden;
        span{
          position: absolute;
          right: 28px;
        }
      }
      .case-item-article {
        padding-left: 24px;
        padding-right: 28px;
        font-size: 14px;
        line-height: 24px;
        color: #999999;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .case-item-bottom {
        left: 2px;
        bottom: -3px;
        width:100%;
        height: 29px;
        background: #fbfbfb;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          line-height: 29px;
          margin-right: 17px;
          font-size: 12px;
          color: #333333;
          cursor: pointer;
        }
        .check {
          width: 46px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background: #c5c5c5;
          color: #ffffff;
          border-radius: 5px;
        }
        .check-active {
          background: #f68020;
          color: #ffffff;
          text-align: center;
          width: 46px;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
        }
        .collect {
          user-select: none;
          .el-icon-star-off:before {
            margin-right: 6px;
          }
          .el-icon-star-on:before {
            margin-right: 6px;
            color: #f68020
          }
          i {
            display: inline-block;
            margin-right: 6px;
            vertical-align: -1px;
          }
        }
        .share {
        i {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-image: url("../../../../assets/lawyerinfo/share.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-right: 6px;
            vertical-align: -1px;
        }
      }
      }
      .classic {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        width: 49px;
        height: 49px;
        background-image: url("../../../../assets/lawyerinfo/classic.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .lawyer-case-list-item:hover {
      border-color:#eee #eee #eee #f68020;
    }
  }
}
</style>
