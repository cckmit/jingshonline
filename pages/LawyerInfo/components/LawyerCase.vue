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
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
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
  </div>
</template>

<script>
export default {
  name: 'LawyerCase',
  components: {},
  props: {

  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
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
      activeIndex: 1
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss">
.lawyer-case{

  .lawyer-case-select{
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
        top: -4px;
      }
      .el-input__icon {
        color: #fff;
        background: #cccccc;
        position: absolute;
        right: -4px;
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
      background-image: url("../assets/jinsh.png");
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
    .lawyer-case-list-item {
      height: 168px;
      border-width: 1px 1px 1px 3px;
      border-style: solid;
      border-color:#eee #eee #eee #f68020;
      padding-left: 24px;
      padding-right: 27px;
      padding: -3px 27px -3px 24px;
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
            background-image: url("../assets/star.png");
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
            background-image: url("../assets/share.png");
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
        background-image: url("../assets/classic.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
