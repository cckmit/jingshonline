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
      <span :class="activeIndex === 1 ? 'filter-active' : ''" @click="filterChange('time')">更新时间</span>
      <span :class="activeIndex === 2 ? 'filter-active' : ''" @click="filterChange('people')">访问人数</span>
      <span :class="activeIndex === 3 ? 'filter-active' : ''" @click="filterChange('count')">收藏数量</span>
      <i/>
    </div>
    <div class="lawyer-case-list">
      <div v-for="(item,index) in lawyerCaseList" :key="index" class="lawyer-case-list-item">
        <nuxt-link to="/case/10/info">
          <div class="case-item-title">{{ item.title }}<span>{{ item.endTime | dateFormat("YYYY-mm-dd") }}</span></div>
          <p class="case-item-article">{{ item.judgmentResult }}</p>
          <div class="case-item-bottom">
            <span :class="'ischeck'? 'check-active':'check'" >已审核</span>
            <span class="collect" @click="userCollect"><i/>收藏</span>
            <span class="share" @click="userShare"><i/>分享</span>
          </div>
          <i class="classic"/>
        </nuxt-link>
      </div>
      <div class="lawyer-case-list-item">
        <div class="case-item-title">宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案<span>2019-12-17</span></div>
        <p class="case-item-article">宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......</p>
        <div class="case-item-bottom">
          <span :class="'ischeck'? 'check-active':'check'" >已审核</span>
          <span class="collect"><i/>收藏</span>
          <span class="share"><i/>分享</span>
        </div>
        <i class="classic"/>
      </div>
      <div class="lawyer-case-list-item">
        <div class="case-item-title">宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案<span>2019-12-17</span></div>
        <p class="case-item-article">宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......</p>
        <div class="case-item-bottom">
          <span :class="'ischeck'? 'check-active':'check'" >已审核</span>
          <span class="collect"><i/>收藏</span>
          <span class="share"><i/>分享</span>
        </div>
        <i class="classic"/>
      </div>
      <div class="lawyer-case-list-item">
        <div class="case-item-title">宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案<span>2019-12-17</span></div>
        <p class="case-item-article">宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......</p>
        <div class="case-item-bottom">
          <span :class="'ischeck'? 'check-active':'check'" >已审核</span>
          <span class="collect"><i/>收藏</span>
          <span class="share"><i/>分享</span>
        </div>
        <i class="classic"/>
      </div>
      <div class="lawyer-case-list-item">
        <div class="case-item-title">宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案<span>2019-12-17</span></div>
        <p class="case-item-article">宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......</p>
        <div class="case-item-bottom">
          <span :class="'ischeck'? 'check-active':'check'" >已审核</span>
          <span class="collect"><i/>收藏</span>
          <span class="share"><i/>分享</span>
        </div>
        <i class="classic"/>
      </div>
      <div class="lawyer-case-list-item">
        <div class="case-item-title">宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案<span>2019-12-17</span></div>
        <p class="case-item-article">宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......</p>
        <div class="case-item-bottom">
          <span :class="0? 'check-active':'check'" >已审核</span>
          <span class="collect"><i/>收藏</span>
          <span class="share"><i/>分享</span>
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
        practiceAreaId: undefined, // 诉讼领域Id number 【诉讼领域,非诉讼领域】
        nonePracticeAreaId: undefined, // 非诉讼领域Id number 【诉讼领域,非诉讼领域】
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
      // 返回案例信息
      items: [
        {
          title: '宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案',
          practiceAreaId: 0, // 领域id
          practiceAreaName: '诉讼领域', // 领域名称
          caseReasonId: 7, // 案由id
          caseReasonName: '婚姻家庭纠纷', // 案由名称
          lawyerId: 0, // 律师id
          lawyerName: '王二', // 律师名称
          lawfirmId: 6, // 律所id
          lawfirmName: '京师律师事务所', // 律所名称
          courtId: 1, // 法院id
          courtName: '朝阳区人民法院', // 法院name
          startTime: '2020-01-19T01:46:32.297Z', // 案例开始时间
          endTime: '2020-01-19T01:46:32.297Z', //  案例结束时间
          judgmentResult: '宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......' // 案例内容
        },
        {
          title: '刘某与张某得婚姻家庭纠纷案件',
          practiceAreaId: 1, // 领域id
          practiceAreaName: '非诉讼领域', // 领域名称
          caseReasonId: 8, // 案由id
          caseReasonName: '家产纠纷', // 案由名称
          lawyerId: 1, // 律师id
          lawyerName: '李四', // 律师名称
          lawfirmId: 7, // 律所id
          lawfirmName: '权力律师事务所', // 律所名称
          courtId: 2, // 法院id
          courtName: '海淀区人民法院', // 法院name
          startTime: '2020-01-19T01:46:32.297Z', // 案例开始时间
          endTime: '2020-01-19T01:46:32.297Z', //  案例结束时间
          judgmentResult: '宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......' // 案例内容
        }
      ],
      // 法院数据
      courtData: [
        { id: 1, label: '朝阳区人民法院' },
        { id: 1, label: '朝阳区人民法院', children: [{ id: 11, label: '高碑店法院', children: [{ id: 111, label: '高级人民法院' }] }] }
      ],
      // 行业树数据
      industryTree: []
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
        // this.getLawyerCaseList(val)
      }
    }
  },
  created() {
    this.getLawyerCaseList(this.caseListParam)
  },
  methods: {
    ...mapActions('lawyerinfo', ['GetLawyerCaseList']),
    // 获取认证案例列表
    getLawyerCaseList(query) {
      // this.GetLawyerCaseList(query).then(res => {
      //   if (res.data.entity.isSucceed) {
      //     this.lawyerCaseList = res.data.entity.items
      //     // 首次加载处理法院数据
      //     if (this.courtData.length <= 0) {
      //       this.lawyerCaseList.forEach((item, index) => {
      //         this.courtData.push({
      //           id: item.courtId,
      //           label: item.courtName
      //         })
      //       })
      //     }
      //     // 首次加载处理行业树数据
      //     if (this.industryTree.length <= 0) {
      //       this.lawyerCaseList.forEach((item, index) => {
      //         this.industryTree.push({

      //         })
      //       })
      //     }
      //   }
      // })
      this.lawyerCaseList = this.items
      if (this.courtData.length <= 0) {
        this.lawyerCaseList.forEach((item, index) => {
          this.courtData.push({
            id: item.courtId,
            label: item.courtName
          })
        })
      }
      console.log(this.courtData)
    },
    // 改变排序状态
    filterChange(type) {
      if (type === 'time') {
        this.activeIndex = 1
      }
      if (type === 'people') {
        this.activeIndex = 2
      }
      if (type === 'count') {
        this.activeIndex = 3
      }
    },
    // 翻页操作
    handlePageChange(val) {
      this.caseListParam.pageIndex = val.page
      this.caseListParam.pageCount = val.limit
    },
    // 用户收藏
    userCollect() {
    },
    // 用户分享
    userShare() {
    }
  }
}
</script>

<style lang="scss">
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
      height: 168px;
      border-width: 1px 1px 1px 3px;
      border-style: solid;
      border-color:#eee #eee #eee #c5c5c5;
      padding-left: 24px;
      padding-right: 28px;
      position: relative;
      margin-bottom: 16px;
      .case-item-title {
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        margin-top: 19px;
        margin-bottom: 19px;
        position: relative;
        overflow: hidden;
        span{
          position: absolute;
          right: 0;
        }
      }
      .case-item-article {
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
        position: absolute;
        left: 2px;
        bottom: -3px;
        width:100%;
        height: 29px;
        background: #fbfbfb;
        padding-right: 10px;
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
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-image: url("../../../../assets/lawyerinfo/star.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
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
