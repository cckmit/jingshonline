<template>
  <div>
    <div class="lawyer-info-container">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/LawyerInfo'}">查找律师</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="lawyer-info-card">
        <div class="lawyer-isAuthentication"/>
        <div class="lawyer-info-top">
          <a class="lawyer-info-picture" href=":javascript">
            <img src="" alt="律师头像">
          </a>
          <div class="lawyer-info-detail">
            <p class="lawyer-name">刘宏辉</p>
            <p class="lawyer-year"><span>8年</span><span>311例</span></p>
            <p class="lawyer-id"><span>ID : 88 </span>最后更新时间 : </p>
            <p class="lawyer-time"><span>2016/3/21 15:24:24</span></p>
          </div>
        </div>
        <div class="lawyer-information">
          <h4>基本信息</h4>
          <ul>
            <li><span>所在律所</span>北京律师事务所</li>
            <li><span>所在地</span>北京律师事务所</li>
            <li><span>最高学历</span>北京律师事务所 </li>
            <li><span>执业证号</span>北京律师事务所</li>
          </ul>
          <h4>联系方式</h4>
          <ul>
            <li><span>联系电话</span>15607021980</li>
            <li><span>律师邮箱</span>15607021980@163.com</li>
          </ul>
          <h4>业务专长</h4>
          <ul class="lawyer-business">
            <li><a href=":javascript">合同纠纷</a></li>
            <li><a href=":javascript">土地房产</a></li>
            <li><a href=":javascript">房产领域纠纷</a></li>
            <li><a href=":javascript">侵权纠纷与赔偿纠纷</a> </li>
            <li><a href=":javascript">土地房产</a></li>
            <li><a href=":javascript">房产领域纠纷</a></li>
            <li><a href=":javascript">侵权纠纷与赔偿纠纷</a> </li>
          </ul>
        </div>
      </div>
      <lawyer-detail/>
    </div>
  </div>
</template>

<script>
import LawyerDetail from './LawyerDetail'
export default {
  layout: 'lawyer',
  components: {
    LawyerDetail
  },
  props: {

  },
  head() {
    return {
      title: '律师详情',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线律师详情；jingshonline-lawyerinfo' }
      ]
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.lawyer-info-container {
  min-width: 1376px;
  max-width: 1376px;
  margin: 0 auto;
  background: #f2f2f2;
  overflow: hidden;
  .lawyer-info-card {
    background: #fff;
    float: left;
    position: relative;
    width: 314px;
    border: 2px solid #f1f1f1;
    padding: 18px;
    height: auto;
    box-sizing: border-box;
    margin-right: 16px;
    .lawyer-isAuthentication {
      position: absolute;
      width: 54px;
      height: 54px;
      background-image: url("../../../assets/lawyerinfo/isAuthentication.png");
      background-size: 100% 100%;
      top: 0;
      right: 0;
    }
    .lawyer-info-top{
      padding-bottom: 16px;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      .lawyer-info-picture {
        display: block;
        width: 128px;
        height: 162px;
        box-sizing: border-box;
        padding: 2px;
        border: 1px solid #d7d7d7;
        margin-right: 26px;
      img {
        display: block;
        width: 126px;
        height: 160px;
      }
      }
    .lawyer-info-detail {
        font-size: 12px;
        box-sizing: border-box;
      .lawyer-name {
        font-size: 24px;
        margin: 30px 0 20px 0;
      }
      .lawyer-year {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 7px;
        span {
          margin-right: 11px;
          padding: 3px 9px;
          color: #fff;
          background: #f68020;
        }
      }
      .lawyer-id,.lawyer-time {
        color: #666666;
        line-height: 24px;
      }
    }
    }
    .lawyer-information {
      h4 {
        margin-top: 13px;
        font-size: 16px;
        color: #333;
        padding-bottom: 9px;
        border-bottom: 1px dashed #ececec;
        margin-bottom: 17px;
      }
      ul li {
        list-style: none;
        font-size: 14px;
        line-height: 14px;
        color: #333;
        margin-bottom: 27px;
        span {
          width: 58px;
          display: inline-block;
          color: #dbdbdb;
          margin-right: 19px;
        }
      }
      .lawyer-business {
        display: flex;
        flex-wrap: wrap;
        li {
          border: 1px solid #ddd;
          border-radius: 5%;
          margin: 0 20px 14px 0;
          padding: 4px 14px;
          a {
            text-decoration: none;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
