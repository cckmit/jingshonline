<template>
  <div class="work-bench">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lawyer-info-card">
      <div class="lawyer-info">
        <div class="lawyer-info-picture">
          <img :src="lawyerInfo.avatar" alt="律师头像">
          <span @click="changPicture">更换头像</span>
        </div>
        <div class="lawyer-info-text">
          <p>上次登录时间：{{ userInfo.lastLoginTime | dateFormat("YYYY-mm-dd") }}</p>
          <p>个人积分：<span class="high-light">{{ lawyerInfo.points }}</span><i @click="Integralquery"/><span class="tip">提示文本提示文本提示文本</span></p>
        </div>
        <div class="lawyer-info-icon">
          <ul>
            <li><a href="javascript:void(0);"><i :style="{color:lawyerInfo.status === 1 || lawyerInfo.status === 2 ? '#F44E12' : '#B6B6B6'}" class="iconfont iconpersonnone"/><span>{{ statusName }}</span></a></li>
            <li><a href="javascript:void(0);"><i :style="{color:lawyerInfo.phone ? '#71C856' : '#B6B6B6'}" class="iconfont iconshoujihao"/><span>{{ lawyerInfo.phone ? '已绑定' : '绑定手机' }}</span></a></li>
            <li><a href="javascript:void(0);"><i :style="{color:lawyerInfo.email ? '#55A3FF' : '#B6B6B6'}" class="iconfont iconyouxiangrenzheng"/><span>{{ lawyerInfo.email ? '已绑定' : '绑定邮箱' }}</span></a></li>
          </ul>
        </div>
      </div>
      <div class="lawyer-business">
        <h4>擅长领域</h4>
        <p v-for="(item,index) in practiceareaData" :key="index"><a href="javascript:void(0);">{{ item.name }}&nbsp;(<span class="high-light">{{ item.caseCount }}</span>)</a></p>
      </div>
    </div>
    <div class="work-bench-detail">
      <div class="case-count">
        <ul>
          <li><span class="title">草稿箱</span><p><b>11</b><span>昨日新增 32</span></p></li>
          <li><span class="title">未审核通过的案例</span><p><b>11</b><span>昨日新增 32</span></p></li>
          <li><span class="title">审核中的案例</span><p><b>11</b><span>昨日新增 32</span></p></li>
          <li><span class="title">通过审核案例</span><p><b>11</b><span>昨日新增 32</span></p></li>
        </ul>
      </div>
      <div class="case-info">
        <div ref="caseInfoChart" class="chart"/>
        <div class="case-info-card">
          <h2><i class="icon-bell"/>消息动态<i class="more" @click="getMore"/></h2>
          <ul class="case-info-list">
            <li @click="caseInfoHandle"><div class="info-text"><h4>案例审核<span class="button">未读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text is-read"><h4>案例审核<span class="button">已读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text"><h4>案例审核<span class="button">未读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text is-read"><h4>案例审核<span class="button">已读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text is-read"><h4>案例审核<span class="button">已读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text is-read"><h4>案例审核<span class="button">已读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text is-read"><h4>案例审核<span class="button">已读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text is-read"><h4>案例审核<span class="button">已读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
          </ul>
          <!-- <p class="no-data">暂无数据</p> -->
        </div>
      </div>
      <div class="case-list">
        <h3>案例列表 <button @click="addCase"><i class="el-icon-circle-plus-outline"/>添加案件</button></h3>
        <div class="table-list">
          <el-table
            v-if="totalCount>0"
            :header-cell-style="{background:'#EBEBEB',height:'32px',color:'#666',fontSize:'14px',lineHeight:'32px',padding:'0'}"
            :data="caseListData"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              show-overflow-tooltip
              prop="title"
              label="案例名称"
              width="320"/>
            <el-table-column
              prop="practiceAreaName"
              label="所属领域"
              width="332"/>
            <el-table-column>
              <template slot-scope="scope">
                <span class="edit" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"/>编辑</span>
                <span class="delete" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"/>删除</span>
              </template>
            </el-table-column>
            <el-table-column
              label="录入时间">
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span style="margin-left: 5px">{{ scope.row.startTime | dateFormat("YYYY-mm-dd") }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-else class="table-no-data">
            <h3>您尚未添加案例</h3>
            <p>您尚未添加案例，您可以点击下方按钮按照步骤进行添加案例。</p>
            <a href="javascript:void(0);" @click="addCase">添加案例></a>
          </div>
        </div>
        <Pagination v-show="totalCount>0" :layout="' prev, pager, next'" :total="totalCount" :page="caseListParam.pageIndex" :limit="caseListParam.pageCount" @pagination="handlePageChange" />
      </div>
    </div>
    <el-dialog
      v-if="userInfo.status !== 1 || userInfo.status !== 2"
      :visible.sync="dialogVisible"
      width="510px"
    >
      <h4>您尚未进行律师认证</h4>
      <p>您尚未进行律师身份认证其他人无法检索到您，请您尽快前往律师认证，我们会对您提供的认证信息进行人工审核，请正确填写。</p>
      <a href="/userCenter/auth/update">前往认证</a>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapState } from 'vuex'
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
    Pagination
  },

  data() {
    return {
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
    this.getUserInfo()
  },
  mounted() {
    this.initChart()
  },
  methods: {
    ...mapActions('account', ['GetLoginUserInfo']),
    ...mapActions('case', ['caseQuery', 'caseDelete']),
    ...mapActions('abundant', ['getAbundantInfo']),
    // 用户信息
    getUserInfo() {
      this.GetLoginUserInfo().then(res => {
        this.userInfo = res
        this.lawyerInfo = res.lawyerInfo
        this.statusName = this.lawyerStatus.filter(item => item.id === this.userInfo.lawyerInfo.status)[0].displayName
        this.caseListParam.lawyerId = this.userInfo.lawyerInfo.id
        // 获取律师擅长领域
        this.getAbundantInfo(this.caseListParam.lawyerId).then(res => {
          this.practiceareaData = res.practiceareas
        })
        // 获取律师案例
        this.getLawyerCase(this.caseListParam)
      })
    },
    // 律师案例
    getLawyerCase(query) {
      this.caseQuery(query).then(res => {
        this.totalCount = res.totalCount
        this.caseListData = res.items
        console.log(this.caseListData)
      })
    },
    // 初始化图表
    initChart() {
      const myChart = this.$echarts.init(this.$refs.caseInfoChart)
      myChart.setOption(this.caseChart)
    },
    // 隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'odd'
      } else {
        return 'egg'
      }
    },
    // 积分查询
    Integralquery() {
      console.log('积分查询')
    },
    // 更换头像
    changPicture() {
      console.log('跟换头像')
    },
    // 用户编辑
    handleEdit(index, row) {
      console.log('用户编辑:', row)
    },
    // 用户删除
    handleDelete(index, row) {
      this.caseDelete(row.id).then(res => {
        this.getLawyerCase(this.caseListParam)
      })
    },
    // 添加案件
    addCase() {
      console.log('添加案件')
    },
    // 获取更多讯息
    getMore() {
      console.log('获取更多')
    },
    // 案件讯息
    caseInfoHandle() {
      console.log('案件讯息详情')
    },
    // 翻页操作
    handlePageChange(val) {
      this.caseListParam.pageIndex = val.page
      this.caseListParam.pageCount = val.limit
    },
    // 弹窗认证
    goToConstructor() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss'>
.work-bench {
  max-width: 1327px;
  min-width: 1327px;
  background:rgba(242,242,242,1);
  overflow: hidden;
  margin: 0 auto;
  .no-data {
    padding: 30px 0;
    font-size: 26px;
    text-align: center;
    color: #cccccc;
  }
  .high-light {
    font-size: 14px;
    font-weight: bold;
    color: #ED0F0F;
  }
  .el-dialog{
    height: 380px;
    border-radius:3px;
    overflow: hidden;
    box-sizing: border-box;
    h4 {
      font-size:24px;
      color:rgba(0,0,0,1);
      text-align: center;
      margin: 59px 0 40px 0;
      font-weight:400;
    }
    p {
      padding: 0 80px;
      text-align: center;
      margin-bottom: 88px;
      font-size:16px;
      color:rgba(51,51,51,1);
      line-height:30px;
    }
    a {
      display: block;
      width:166px;
      height:38px;
      line-height: 38px;
      background:rgba(246,128,32,1);
      font-size:16px;
      border-radius:3px;
      text-align: center;
      margin: 0 auto;
      color: #fff;
    }
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .lawyer-info-card{
    width: 240px;
    float: left;
    margin-right: 40px;
    .lawyer-info{
      width:240px;
      height:340px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229, 229, 229, 0.3);
      margin-bottom: 20px;
      padding-top: 40px;
      .lawyer-info-picture:hover span {
        bottom: 0px;
      }
      .lawyer-info-picture {
        margin: 0 auto;
        position: relative;
        display: block;
        width: 140px;
        height: 140px;
        box-sizing: border-box;
        border:1px solid rgba(215, 215, 215, 1);
        cursor: pointer;
        overflow: hidden;
        padding: 2px;
        margin-bottom: 18px;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        span{
          font-size: 14px;
          text-align: center;
          line-height: 26px;
          position: absolute;
          bottom: -26px;
          left: 0;
          transition: bottom .5s;
          color:rgba(255,255,255,1);
          background:rgba(0,0,0,1);
          opacity:0.5;
          width: 100%;
        }
      }
      .lawyer-info-text{
        padding-left: 30px;
        font-size: 12px;
        line-height: 28px;
        margin-bottom: 15px;
        position: relative;
        i {
          cursor: pointer;
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url("../../assets/usercenter/help.png") no-repeat center;
          vertical-align: -2px;
          margin-left: 6px;
          position: relative;
        }
        .tip {
          transition: opacity 2s;
          position: absolute;
          display: block;
          width: 160px;
          height: 60px;
          border: 1px solid #ccc;
          background: #fff;
          z-index: 99;
          border-radius: 5px;
          top: -33px;
          left: 94px;
          font-size: 12px;
          opacity: 0;
        }
        .tip:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          bottom: -5px;
          left: 20px;
          transform: rotate(-45deg);
          border-width: 1px;
          border-style: solid;
          border-color: transparent transparent #ccc #ccc;
          z-index: 100;
          background: #fff;
        }
        i:hover +.tip {
          opacity: 1;
        }
      }
      .lawyer-info-icon {
        ul {
          display: flex;
          list-style: none;
          padding: 0 36px 0 30px;
          justify-content: space-between;
          overflow: hidden;
          li{
            font-size: 12px;
            line-height: 12px;
            a{
              color: #999999;
              i{
                line-height: 33px;
                display: block;
                font-size: 30px;
                text-align: center;
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
    .lawyer-business{
      width:238px;
      min-height:172px;
      border:1px solid rgba(229, 229, 229, 0.3);
      background-size: 100vh 100vh;
      background: url("../../assets/usercenter/index-practice-bj.png") repeat-y;
      color: #333;
      h4 {
        font-size:12px;
        margin: 23px 0 12px 26px;
      }
      a {
        line-height: 34px;
        padding-left: 50px;
        color: #333;
        font-size:14px;
        font-weight:bold;
      }
    }
  }
  .work-bench-detail {
    width: 1046px;
    float: left;
    .case-count{
      font-size: 14px;
      color: #FFFFFF;
      margin-bottom: 33px;
      b{
        font-size:30px;
        font-weight: 400;
        line-height: 30px;
      }
      ul {
        display: flex;
        justify-content: space-between;
        li {
          box-sizing: border-box;
          padding: 23px 0 0 36px;
          cursor: pointer;
          width:246px;
          height:110px;
          border-radius:5px;
          border:1px solid rgba(229, 229, 229, 0.3);
          .title {
            margin-bottom: 28px;
            display: block;
            line-height: 14px;
          }
          p{
            padding-right: 51px;
            span {
              line-height: 30px;
              float: right;
            }
          }
        }
        li:nth-child(1) {
          background: #63A4FF;
        }
        li:nth-child(2) {
          background: #FD6F6E;
        }
        li:nth-child(3) {
          background: #FFC056;
        }
        li:nth-child(4) {
          background: #1ED0AC;
        }

      }
    }
    .case-info{
      display: flex;
      margin-bottom: 20px;
      .chart{
        width:687px;
        height:486px;
        border:1px solid rgba(229, 229, 229, 0.3);
        background: #fff;
      }
      .case-info-card{
        margin-left: 20px;
        width:340px;
        max-height:486px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(229, 229, 229, 0.3);
        position: relative;
        h2{
          position: fixed;
          top: 0;
          left: 0;
          height: 48px;
          line-height: 48px;
          color: #333333;
          position: relative;
          font-size: 12px;
          cursor: pointer;
          .icon-bell {
            display: inline-block;
            width: 16px;
            vertical-align: -3px;
            height: 17px;
            margin: 0 5px 0 26px;
            background: url('../../assets/usercenter/bell.png') no-repeat center center;
          }
          .more {
            display: inline-block;
            width: 4px;
            height: 17px;
            padding: 0 5px;
            right: 26px;
            position: absolute;
            top: 14px;
            background: url('../../assets/usercenter/more.png') no-repeat center center;
          }
        }
        .case-info-list {
          padding-bottom: 12px;
          max-height: 438px;
          overflow-y: scroll;
          li {
            cursor: pointer;
            height: 107px;
            border-top:1px solid rgba(245,245,245,1);
            position: relative;
            .info-text {
              padding: 0 19px 0 25px;
              color:rgba(51,51,51,1);
              h4 {
                line-height: 28px;
                font-size:14px;
                font-weight:400;

                overflow: hidden;
                position: relative;
                .button{
                  position: absolute;
                  right: 0;
                  top: 4px;
                  display: inline-block;
                  width:40px;
                  height:20px;
                  background:rgba(25,198,204,1);
                  border-radius:5px;
                  text-align: center;
                  line-height: 20px;
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255,255,255,1);
                }
              }
              p{
                font-size:12px;
                line-height: 22px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(102,102,102,1);
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
                overflow: hidden;  /** 隐藏超出的内容 **/
              }
              .time {
                position: absolute;
                right: 18px;
                bottom: 10px;
                font-size: 12px;
                text-align: right;
              }
            }
            .is-read {
              h4 {
                color:rgba(153,153,153,1);
                .button {
                  background:rgba(153,153,153,1);
                }
              }
              p{
                color:rgba(153,153,153,1);
              }
            }
          }
        }
      }
    }
    .case-list {
      padding-bottom: 29px;
      background: #fff;
      h3 {
        font-size:12px;
        font-weight:400;
        line-height: 50px;
        position: relative;
        padding-left: 31px;
        button {
          width:94px;
          height:28px;
          background:rgba(246,128,32,1);
          border-radius:3px;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          color: #fff;
          position: absolute;
          top: 15px;
          right: 19px;
          i {
            vertical-align: -1.4px;
            font-size: 16px;
            margin-right: 3px;
          }
        }
      }
      .table-list {
        padding: 0 18px;
        margin-bottom: 36px;
        .table-no-data {
          box-sizing: border-box;
          padding-bottom: 180px;
          text-align: center;
          color:rgba(153,153,153,1);
          h3{
            padding: 0;
            font-size:24px;
            line-height: 24px;
            font-weight:400;
            margin:100px 0 30px 0;
          }
          p {
            font-size: 16px;
            margin-bottom: 75px;
          }
          a {
            font-size: 18px;
            text-decoration:underline;
            color: #666666;
          }
        }
        .edit,.delete {
          i {
            margin: 0 2px;
          }
          margin: 0 15px;
          cursor: pointer;
        }
        .el-table td {
          padding: 0;
        }
        .el-table .odd {
          height:34px;
          line-height: 34px;
          font-size: 12px;
        }
        .el-table .egg {
          background:rgba(249,249,249,1);
          height:34px;
          line-height: 34px;
          font-size: 12px
        }
      }
    }
  }

}
</style>
