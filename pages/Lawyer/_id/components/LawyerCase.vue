<template>
  <div class="lawyer-case">
    <div class="lawyer-case-select">
      <div class="lawyer-case-item">
        <p>管辖法院 :</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="lawyer-case-item">
        <p>所属行业 :</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="lawyer-case-item">
        <p>所属领域 :</p>
        <el-select v-model="practiceData.activePractice" placeholder="请选择">
          <el-option
            v-for="item in practiceData.practiceOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
    </div>
    <div class="lawyer-case-filter">
      <span :class="activeIndex === 1 ? 'filter-active' : ''" @click="filterChange('time')">更新时间</span>
      <span :class="activeIndex === 2 ? 'filter-active' : ''" @click="filterChange('people')">访问人数</span>
      <span :class="activeIndex === 3 ? 'filter-active' : ''" @click="filterChange('count')">收藏数量</span>
      <i/>
    </div>
    <div class="lawyer-case-list">
      <div class="lawyer-case-list-item">
        <nuxt-link to="/case/10/info">
          <div class="case-item-title">宋雪强与汇天网络科技有限公司关于房屋租赁合同纠纷案<span>2019-12-17</span></div>
          <p class="case-item-article">宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209宋雪强与汇天网络科技有限公司一案二审民事判决书	北京市第三中级人民法院 二审 （2015）三中民终字第06709号	【文书来源汇天网络科技有限公司，住所地北京市通州庄大街1号209......</p>
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
    <Pagination v-show="totalCount>0" :total="totalCount" :page="lawyerCaseSearch.pageIndex" :limit="lawyerCaseSearch.pageCount" @pagination="handlePageChange" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions } from 'vuex'
export default {
  name: 'LawyerCase',
  components: {
    Pagination
  },
  props: {

  },
  data() {
    return {
      practiceData: {
        practiceOption: [
          {
            label: '诉讼领域',
            value: 0
          }, {
            label: '非诉讼领域',
            value: 1
          }
        ],
        activePractice: ''
      },
      options: [{
        label: '诉讼领域',
        value: 0
      }, {
        label: '非诉讼领域',
        value: 1
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      // 认证案例列表
      lawyerCaseList: [],
      // 筛选条件高亮
      activeIndex: 1,
      // 分页器
      lawyerCaseSearch: {
        pageCount: 10,
        pageIndex: 1
      },
      // 应为案例length
      totalCount: 10,
      // 获取认证案例所需参数 必传
      caseListParam: {
        practiceAreaId: 0, // 诉讼领域Id number 【诉讼领域,非诉讼领域】
        nonePracticeAreaId: 0, // 非诉讼领域Id number 【诉讼领域,非诉讼领域】
        searchKey: '', // 搜索关键字: 支持(当事人、律师、专业领域、案由、法院、律所、裁判文书关键字) string
        courtLevel: 0, // 法院等级 number
        courtReginId: 0, // 法院所属区域 nmuber || arr
        courtId: 0, // 法院Id number
        caseReasonId: 0, // 案由Id number
        lawyerId: this.$route.params.id, // 律师Id number
        sorting: 'string', // 排序
        sortType: 0, // 排序类型
        pageCount: 1, // 页目 number
        pageIndex: 1// 页码 number
      }
    }
  },
  computed: {

  },
  watch: {
    caseListParam: {
      deep: true,
      immediate: true,
      handler(val) {
        // this.getLawyerCaseList(val)
      }
    }
  },
  created() {
    // this.getLawyerCaseList(this.caseListParam)
  },
  methods: {
    ...mapActions('lawyerinfo', ['GetLawyerCaseList']),
    // 获取认证案例列表
    getLawyerCaseList(query) {
      this.GetLawyerCaseList(query).then(res => {
        if (res.isSucceed) {
          console.log('成功', res)
        }
      })
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
