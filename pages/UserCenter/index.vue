<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="usercenter_index_left">
      <UserInfo/>
      <div class="lawyer-business">
        <h4>擅长领域</h4>
        <p>房产土地（<span>256</span>）</p>
        <p>房产土地（<span>256</span>）</p>
        <p>房产土地（<span>256</span>）</p>
        <!-- <p v-for="(item,index) in practiceareaData" :key="index">{{ item.name }}&nbsp;(<span>{{ item.caseCount }}</span>)</p> -->
      </div>
    </div>
    <div class="usercenter_index_right">
      <ul class="case_count">
        <li>草稿箱<div class="clear"><count-to :start-val="0" :end-val="11" :duration="500"/><small>昨日新增 11</small></div></li>
        <li>未审核通过的案例<div class="clear"><count-to :start-val="0" :end-val="3" :duration="500"/><small>昨日新增 3</small></div></li>
        <li>审核中的案例<div class="clear"><count-to :start-val="0" :end-val="5" :duration="500"/><small>昨日新增 5</small></div></li>
        <li>通过审核案例<div class="clear"><count-to :start-val="0" :end-val="999" :duration="500"/><small>昨日新增 9</small></div></li>
      </ul>
      <div class="clear">
        <div ref="caseInfoChart" class="chart"/>
        <div class="notice">
          <p><i class="iconfont iconbell1"/>消息动态<i class="iconfont iconmore" /></p>
          <ul class="infinite-list-wrapper">
            <li><p>案例审核<span>已读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li class="unread"><p>案例审核<span>未读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li><p>案例审核<span>已读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li class="unread"><p>案例审核<span>未读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li><p>案例审核<span>已读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li><p>案例审核<span>已读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li><p>案例审核<span>已读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
            <li><p>案例审核<span>已读</span></p><div>刘洪辉律师，后台管理员为您添加一条标题为：<span>刘某某与阮某某房屋租赁合同纠纷</span></div><small>2020-03-08</small></li>
          </ul>
        </div>
      </div>
      <div class="caselist">
        <p>
          案例列表
          <span @click="()=>{this.$router.push({path:'/usercenter/case/create'})}"><i class="el-icon-circle-plus-outline"/>添加案例</span>
        </p>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="案件名称"
            width="346"/>

          <el-table-column
            prop="name"
            label="所属领域"
            width="356"/>
          <el-table-column>
            <el-button type="text" icon="el-icon-edit">编辑</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>

          </el-table-column>
          <el-table-column
            prop="date"
            label="录入时间"
            width="112"/>
        </el-table>
      </div>
    </div>
    <el-dialog
      v-if="userInfo.status !== 1 || userInfo.status !== 2"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      custom-class="usercenter_index_auth"
      width="510px"
      title=""
    >
      <div>您尚未进行律师认证</div>
      <p>您尚未进行律师身份认证其他人无法检索到您，请您尽快前往律师认证，我们会对您提供的认证信息进行人工审核，请正确填写。</p>
      <a href="/userCenter/auth/update">前往认证</a>
    </el-dialog>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import Pagination from '@/components/Pagination/index'
import UserInfo from './components/UserInfo'
import { mapState } from 'vuex'
export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    CountTo,
    Pagination,
    UserInfo
  },

  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 用户信息
      userInfo: {},
      // 律师信息
      lawyerInfo: {},
      // 律师状态
      statusName: '',
      // 律师擅长领域信息
      practiceareaData: [],
      // 案例图表数据
      caseChart: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '非诉领域(分布图)',
          padding: [24, 32],
          textStyle: {
            fontWeight: '400',
            fontSize: '12'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            // 标记箭头数据
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [
                [{ type: 'min' }, { type: 'max' }]
              ]
            }
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      },
      // 案例数据
      caseListData: [],
      totalCount: 0,
      // 案例检索条件
      caseListParam: {
        lawyerId: '',
        pageCount: 10, // 页目条数 number
        pageIndex: 1// 页码 number
      },
      // 弹窗
      dialogVisible: true
    }
  },
  computed: {
    ...mapState({
      lawyerStatus: state => state.lawyer.status
    })
  },
  watch: {
  },
  created() {
    // this.getUserInfo()
  },
  mounted() {
    this.initChart()
  },
  methods: {

    // 初始化图表
    initChart() {
      const myChart = this.$echarts.init(this.$refs.caseInfoChart)
      myChart.setOption(this.caseChart)
    },

    // 积分查询
    Integralquery() {
      console.log('积分查询')
    },

    // 添加案件
    addCase() {
      this.$router.push({ path: '/usercenter/case/create' })
    }
  }
}
</script>

<style lang='scss' scoped>
.usercenter_index_left{
  float: left;
  margin-right: 40px;
  .lawyer-business{
    width:240px;
    min-height:172px;
    border:1px solid rgba(229, 229, 229, 0.3);
    background-size: 100vh 100vh;
    background: url("../../assets/usercenter/index-practice-bj.png") repeat-y;
    color: #333;
    h4 {
      font-size:12px;
      height: 13px;
      line-height: 13px;
      color: #333;
      margin: 22px 0 22px 26px;
    }
    p{
      font-size: 14px;
      padding-left: 50px;
      margin-bottom: 16px;
      span{
        font-weight: bold;
        color: #FF1111;
      }
    }
  }
}
.usercenter_index_right{
  float: right;
  width: 1100px;
  /** 顶部案例数据 **/
  .case_count{
    display: flex;
    margin-bottom: 30px;
    li{
      // float: left;
      width: 260px;
      margin: 0 10px;
      padding: 22px 36px;
      border:1px solid rgba(229, 229, 229, 0.3);
      border-radius:5px;
      color: #fff;
      font-size: 14px;
      &:first-child{
        margin-left: 0;
        background: #63A4FF;
      }
      &:nth-child(2){
        background: #FD6F6E;
      }
      &:nth-child(3){
        background: #FFC056;
      }
      &:last-child{
        margin-right: 0;
        background: #1ED0AC;
      }
      div{
        margin-top: 28px;
        font-size: 30px;
        text-align: right;
        span{
          float: left;
        }
        small{
          font-size: 14px;
        }
      }
    }
  }
  /** 图表 **/
  .chart{
    width:730px;
    height:490px;
    border:1px solid rgba(229, 229, 229, 0.3);
    background: #fff;
    float: left;
  }
  /** 消息动态 **/
  .notice{
    width: 350px;
    height: 490px;
    float: right;
    background: #fff;
    >p{
      padding: 20px 26px 10px 26px;
      border-bottom: 1px solid #F5F5F5;
      font-size: 12px;
      color: #333;
      margin-bottom: 0;
      .iconbell1{
        margin-right: 5px;
      }
      .iconmore{
        float: right;
      }
    }
    ul{
      height: 420px;
      overflow: auto;
      li{
        border-bottom: 1px solid rgba(245,245,245,1);;
        padding: 10px 20px 10px 26px;
        cursor: pointer;
      p{
        font-size: 14px;
        margin-bottom: 12px;
        color: #999;
        span{
          width: 40px;
          height: 20px;
          display: block;
          float: right;
          text-align: center;
          font-size: 12px;
          color: #fff;
          border-radius: 5px;
          background: #CBCBCB;
        }
      }
      div{
        color: #999;
        font-size: 12px;
        margin-bottom: 10px;
      }
      small{
        display: block;
        text-align: right;
      }
      }
      li.unread{
        p{
          color: #333;
          span{
            background: #19C6CC;
          }
        }
        div{
          span{
            color: #307FFF;
          }
        }
      }
    }
  }

  /** 案例列表 **/
  .caselist {
    margin-top: 20px;
    margin-bottom: 80px;
    background: #fff;
    padding: 24px 18px;
    height: 614px;
    p{
      font-size: 12px;
      color: #333;
      height: 30px;
      line-height: 30px;
      span{
        display: block;
        float: right;
        width: 94px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: #F68020;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
        i{
          margin-right: 3px;
        }
      }
    }
    .el-table{
      margin-top: 8px;
      .el-button{
        color: #666666;
      }
    }
  }
}

</style>
<style lang="scss">
.caselist{
  .el-table{
    thead{
      th{
        padding: 0;
        background: #EBEBEB;
        .cell{
          height: 32px;
          line-height: 32px;
        }
      }
    }
    tbody{
      tr:nth-child(odd){
        td{
          background: #fff;
        }
      }
      tr:nth-child(even){
        td{
          background: #f9f9f9;
        }
      }
      td{
        padding: 0;
      }
    }
    .cell{
        height: 34px;
        line-height: 34px;
    }
  }
}
/** 未认证弹窗 **/
.usercenter_index_auth{
  height: 380px;
  .el-dialog__header{
    border-bottom: none !important;
    padding: 0 !important;
    height: 58px;
  }
  .el-dialog__body{
    padding: 0 80px !important;
    text-align: center;
    div{
      margin-bottom: 40px;
      font-size: 24px;
      height: 25px;
      color: #000;
    }
    p{
      margin-bottom: 70px;
      font-size: 16px;
      color: #333;
      text-align: left;
      line-height: 30px;
    }
    a{
      width: 166px;
      height: 38px;
      display: inline-block;
      line-height: 38px;
      color: #fff;
      font-size: 16px;
      background: #F68020;
      border-radius: 3px;
    }
  }

}
</style>
