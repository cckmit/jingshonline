<template>
  <div class="lawyer-case">
    <div class="lawyer-case-select">
      <div class="lawyer-case-item">
        <p>管辖法院 :</p>
        <treeselect
          :options="courtDataList"
          :auto-load-root-options="false"
          :load-options="loadOptions"
          placeholder="请选择管辖法院"
          @select="HandleCourtSelect"
          @input="CourtdeChangeSelect"
        />
        <!-- <client-only>
          <el-select
            v-el-select-loadmore="loadmore"
            v-model="courtSelectVal"
            :filter-method="filterMethod"
            :loading="loading"
            placeholder="请选择"
            filterable
            clearable
            @visible-change="courtBlur"
            @change="courtChange"
          >
            <el-option
              v-for="item in courtData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </client-only> -->
      </div>
      <div class="lawyer-case-item">
        <p>所属行业 :</p>
        <treeselect
          :options="industryDataList"
          v-model="caseListParam.industryId"
          :normalizer="industryNormalizer"
          placeholder="请选择所属行业"
        />
      </div>
      <div class="lawyer-case-item">
        <p>所属领域 :</p>
        <treeselect
          :options="practiceareaDataList"
          v-model="caseListParam.practiceAreaId"
          :normalizer="practiceareaNormalizer"
          placeholder="请选择所属领域"
        />
      </div>
    </div>
    <div class="lawyer-case-filter">
      <span :class="activeIndex === 1 ? 'filter-active' : ''" @click="filterChange('updatetime')">更新时间</span>
      <span :class="activeIndex === 2 ? 'filter-active' : ''" @click="filterChange('clickcount')">访问人数</span>
      <span :class="activeIndex === 3 ? 'filter-active' : ''" @click="filterChange('followerCount')">收藏数量</span>
      <i/>
    </div>
    <div v-if="lawyerCaseList.length" class="lawyer-case-list">
      <div v-for="(item,index) in lawyerCaseList" :key="index" class="lawyer-case-list-item">
        <nuxt-link :to="'/case/'+item.id+'/info'">
          <div v-if="item.highlight.title" class="case-item-title">{{ item.highlight.title[0] }}</div>
          <div class="case-info">
            <div>
              <p v-if="item.caseType !== 2"><span><i class="el-icon-caret-right"/>管辖法院 : {{ item.courtName ? item.courtName :'暂无数据' }}</span></p>
              <p v-if="item.caseType !== 1"><span><i class="el-icon-caret-right"/>所属行业 : {{ item.industryName ? item.industryName:'暂无数据' }}</span></p>
            </div>
            <div>
              <p v-if="item.caseType !== 2"><span><i class="el-icon-caret-right"/>所属案由 : {{ item.caseReasonName?item.caseReasonName:'暂无数据' }}</span></p>
              <p><span><i class="el-icon-caret-right"/>所属领域 : {{ item.practiceAreaName?item.practiceAreaName:'暂无数据' }}</span></p>
            </div>
          </div>
          <div class="case-item-article">
            <div>
              <p class="title">【法院观点】</p>
              <span class="text" v-text="'暂无数据'"/>
            </div>
            <div>
              <p class="title">【结果命中】</p>
              <span class="text" v-html="item.highlight.judgmentDocument ? item.highlight.judgmentDocument[0] : '暂无数据'"/>
            </div>
          </div>
          <div class="case-item-bottom">
            <span v-if="item.judgmentNumber && item.caseType !== 2" class="judgement-number">{{ item.judgmentNumber	}}</span>
            <span class="case-time"><i class="el-icon-time"/>{{ item.updateTime | dateFormat("YYYY-mm-dd") }}</span>
            <span class="collect no-select" @click.prevent="userCollect(index)"><i :class="item.isFollow ? 'el-icon-star-on' : 'el-icon-star-off'" v-text="item.isFollow? '已收藏' : '收藏'"/></span>
            <!-- <span class="share no-select" @click.prevent="share(item.id)"><i/>分享</span> -->
          </div>
          <i v-if="item.isClassicCase" class="classic"/>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="no-data">
      暂无相关案例
    </div>
    <Pagination v-show="totalCount>0" :total="totalCount" :page="caseListParam.pageIndex" :limit="caseListParam.pageCount" @pagination="handlePageChange" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions } from 'vuex'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
export default {
  name: 'LawyerCase',
  components: {
    Pagination,
    Treeselect
  },
  // 法院指令
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
          if (condition) {
            binding.value()
          }
        })
      }
    }
  },
  props: {
    industryDataList: {
      type: Array,
      default: function() {
        return []
      }
    },
    practiceareaDataList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      // 认证案例列表
      lawyerCaseList: [],
      // 筛选条件高亮
      activeIndex: 1,
      // 分页器
      totalCount: 0,
      // 获取认证案例所需参数
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
      courtDataList: [],
      // 行业树数据
      industryTree: [],
      // 案件领域数据
      practiceAreaData: [],
      // 法院数据 后期更改
      courtParams: {
        name: '',
        regionId: undefined,
        courtLevel: undefined,
        pageCount: 10,
        pageIndex: 1
      },
      courtData: [],
      courtSelectVal: '',
      courtTotalCount: 0,
      loading: false
    }
  },
  watch: {
    // 监听检索条件
    caseListParam: {
      deep: true,
      handler(val) {
        this.getLawyerCaseList(val)
      }
    }
  },
  created() {
    this.getCourtRegion(null)
    this.getLawyerCaseList(this.caseListParam)
  },
  methods: {
    ...mapActions('lawyerinfo', ['GetLawyerCaseList', 'UserFollowCase', 'UserUnFollowCase']),
    ...mapActions('region', ['getCourtRegionsData', 'getCourtRegionsChildData']),
    ...mapActions('court', ['getCourtData']),
    // 获取认证案例列表
    getLawyerCaseList(query) {
      this.GetLawyerCaseList(query).then(res => {
        if (res !== null) {
          this.totalCount = res.totalCount
          this.lawyerCaseList = res.items
        }
      })
    },
    // 获取地区信息-法院
    getCourtRegion(query) {
      this.getCourtRegionsData(query).then(res => {
        this.courtDataList = res.map(item => {
          return { id: item.name, label: item.name, nodeId: item.id, children: item.nodeType === 1 ? '' : null }
        })
      })
    },
    // 领域数据二次处理
    practiceareaNormalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length ? node.children : ''
      }
    },
    // 行业数据二次处理
    industryNormalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length ? node.children : ''
      }
    },
    // 法院选中-改变检索条件
    HandleCourtSelect(node) {
      this.caseListParam.courtId = node.nodeId
    },
    // 法院-选项改变
    CourtdeChangeSelect(value) {
      if (!value) {
        this.caseListParam.courtId = undefined
      }
    },
    // 法院-延迟加载
    simulateAsyncOperation(fn) {
      setTimeout(fn, 600)
    },
    // 法院-延迟加载
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS && parentNode.nodeId) {
        this.simulateAsyncOperation(() => {
          this.getCourtRegionsChildData(parentNode.nodeId).then(res => {
            parentNode.children = res.map(item => {
              return {
                id: item.name,
                label: item.name,
                nodeId: item.id,
                children: item.nodeType === 1 ? '' : null
              }
            })
            callback()
          })
        })
      }
    },
    // 改变排序状态
    filterChange(type) {
      if (type === 'updatetime') {
        this.activeIndex = 1
        this.caseListParam.sorting = 'updatetime'
      }
      if (type === 'clickcount') {
        this.activeIndex = 2
        this.caseListParam.sorting = 'clickcount'
      }
      if (type === 'followerCount') {
        this.activeIndex = 3
        this.caseListParam.sorting = 'followerCount'
      }
    },
    // 翻页操作
    handlePageChange(val) {
      this.caseListParam.pageIndex = val.page
      this.caseListParam.pageCount = val.limit
    },
    // 用户收藏
    userCollect(index) {
      const caseIndex = this.lawyerCaseList[index]
      if (caseIndex.isFollow) {
        this.UserUnFollowCase(caseIndex.id).then(res => {
          this.$notify({
            message: `取消收藏案例 : ${this.lawyerCaseList[index].title}`,
            duration: 2000
          })
          this.lawyerCaseList[index].isFollow = !this.lawyerCaseList[index].isFollow
        })
      } else {
        this.UserFollowCase(caseIndex.id).then(res => {
          this.$notify({
            message: `收藏案例 : ${this.lawyerCaseList[index].title}`,
            duration: 2000
          })
          this.lawyerCaseList[index].isFollow = !this.lawyerCaseList[index].isFollow
        })
      }
    },
    // 法院单条 后期变更
    getCourt(query, type) {
      this.getCourtData(query).then(res => {
        this.courtTotalCount = res.totalCount
        if (type === 'filter') {
          this.courtData = res.items
        } else {
          this.courtData = [...this.courtData, ...res.items]
        }
      })
    },
    loadmore() {
      this.courtParams.pageIndex++
      if (this.courtParams.pageIndex <= Math.ceil(this.courtTotalCount / this.courtParams.pageCount)) {
        this.getCourt(this.courtParams)
      }
      console.log('加载更多', 'index:', this.courtParams.pageIndex, 'totalCount:', this.courtTotalCount)
    },
    courtChange() {
      this.caseListParam.courtId = this.courtSelectVal
    },
    courtBlur() {
      if (this.courtSelectVal === '') {
        this.courtParams.name = ''
        this.courtParams.pageIndex = 1
        this.courtData = []
        this.getCourt(this.courtParams)
      }
      console.log('离开', 'index:', this.courtParams.pageIndex, 'totalCount:', this.courtTotalCount)
    },
    filterMethod(query) {
      this.courtParams.pageIndex = 1
      this.loading = true
      setTimeout(() => {
        this.courtParams.name = query
        this.loading = false
        this.getCourt(this.courtParams, 'filter')
        console.log('检索', 'index:', this.courtParams.pageIndex, 'totalCount:', this.courtTotalCount)
      }, 600)
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
  padding-bottom: 24px;
  min-height: 412px;
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
      .el-input__icon {
        // color: #fff;
        position: absolute;
        right: -5px;
        top: 0.5px;
        transition: none;
        width:30px;
        height:30px;
        line-height:30px;
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
      .vue-treeselect__single-value {
        font-size: 14px;
        line-height: 30px;
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
      .vue-treeselect__menu{
        height: 300px;
        position: relative;
        z-index: 9999;
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
        line-height: 28px;
        margin-top: 30px;
        position: relative;
        overflow: hidden;
        span{
          position: absolute;
          right: 28px;
        }
      }
      .case-info {
        margin-top: 7px;
        color:#737373;
        font-size: 14px;
        padding-left: 48px;
        box-sizing: border-box;
        display: flex;
        div {
          margin-right: 60px;
        }
        .el-icon-caret-right{
          color: #999999;
        }
        p {
          line-height: 28px;
        }
      }
      .case-item-article {
        padding-left: 24px;
        padding-right: 28px;
        font-size: 14px;
        line-height: 24px;
        color: #333;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        .title{
          margin-top: 2px;
          margin-bottom: 7px;
        }
        .text{
          overflow: hidden;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          display: -webkit-box;
          margin-bottom: 11px;
        }
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
          font-size: 12px;
          color: #333333;
          cursor: pointer;
        }
        .judgement-number {
          color: #949494;
          margin-right: 28px;
        }
        .case-time {
          margin-right: 15px;
          .el-icon-time{
            color: #828282;
            margin-right: 5px;
          }
        }
        .collect {
          width: 60px;
          text-align: center;
          user-select: none;
          margin-right: 25px;
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
    /* 分享 */
  .share{
    div{
      margin-top: 5px;
      text-align: right;
    }
    img{
      width: 100px;
    }
  }
  .no-data{
    margin-top: 100px;
    text-align: center;
    font-size: 32px;
  }
}

</style>
