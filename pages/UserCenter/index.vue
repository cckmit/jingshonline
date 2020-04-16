<template>
  <div class="work-bench">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userCenter'}">工作台</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lawyer-info-card">
      <div class="lawyer-info">
        <div class="lawyer-info-picture">
          <img src="../../assets/usercenter/woman-sample.jpg" alt="律师头像">
          <span>更换头像</span>
        </div>
        <div class="lawyer-info-text">
          <p>上次登录时间：2020-02-11</p>
          <p>个人积分：<span class="high-light">62</span><i/></p>
        </div>
        <div class="lawyer-info-icon">
          <ul>
            <li><a href="javascript:void(0);"><i class="el-icon-user"/><span>审核中</span></a></li>
            <li><a href="javascript:void(0);"><i class="el-icon-user"/><span>绑定手机</span></a></li>
            <li><a href="javascript:void(0);"><i class="el-icon-user"/><span>绑定邮箱</span></a></li>
          </ul>
        </div>
      </div>
      <div class="lawyer-business">
        <h4>擅长领域</h4>
        <p><a href="javascript:void(0);">房产土地&nbsp;(<span class="high-light">256</span>)</a></p>
        <p><a href="javascript:void(0);">房产土地&nbsp;(<span class="high-light">256</span>)</a></p>
        <p><a href="javascript:void(0);">房产土地&nbsp;(<span class="high-light">256</span>)</a></p>
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
            <li><div class="info-text"><h4>案例审核<span class="button">未读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text"><h4>案例审核<span class="button">未读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text"><h4>案例审核<span class="button">未读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
            <li><div class="info-text"><h4>案例审核<span class="button">未读</span></h4><p>刘洪辉律师，后台管理员为您添加一条标题为：刘某某与阮某某房屋租赁合同纠纷的案例！</p><span class="time">2020-03-08</span></div></li>
          </ul>
        </div>
      </div>
      <div class="case-list">
        <h3>案例列表 <button @click="addCase"><i class="el-icon-circle-plus-outline"/>添加案件</button></h3>
        <div class="table-list">
          <el-table
            :header-cell-style="{background:'#EBEBEB',height:'32px',color:'#666',fontSize:'14px',lineHeight:'32px',padding:'0'}"
            :data="caseListData"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="案例名称"
              width="320"/>
            <el-table-column
              prop="practicearea"
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
                <span style="margin-left: 5px">{{ scope.row.time }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <Pagination v-show="totalCount>0" :layout="' prev, pager, next'" :total="totalCount" :page="caseListParam.pageIndex" :limit="caseListParam.pageCount" @pagination="handlePageChange" />
      </div>
    </div>
    <el-dialog
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
      caseListData: [
        { name: '刘某某与阮某某房屋租赁合同纠纷', practicearea: '诉讼领域-合同纠纷-承包合同', time: '2020-03-08' },
        { name: '刘某某与阮某某房屋租赁合同纠纷', practicearea: '诉讼领域-合同纠纷-承包合同', time: '2020-03-08' },
        { name: '刘某某与阮某某房屋租赁合同纠纷', practicearea: '诉讼领域-合同纠纷-承包合同', time: '2020-03-08' },
        { name: '刘某某与阮某某房屋租赁合同纠纷', practicearea: '诉讼领域-合同纠纷-承包合同', time: '2020-03-08' },
        { name: '刘某某与阮某某房屋租赁合同纠纷', practicearea: '诉讼领域-合同纠纷-承包合同', time: '2020-03-08' },
        { name: '刘某某与阮某某房屋租赁合同纠纷', practicearea: '诉讼领域-合同纠纷-承包合同', time: '2020-03-08' }
      ],
      totalCount: 500,
      // 案例检索条件
      caseListParam: {
        pageCount: 5, // 页目条数 number
        pageIndex: 1// 页码 number
      },
      // 弹窗
      dialogVisible: true
    }
  },

  watch: {
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
    // 隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'odd'
      } else {
        return 'egg'
      }
    },
    // 用户编辑
    handleEdit(index, row) {
      console.log('用户编辑:', row)
    },
    // 用户删除
    handleDelete(index, row) {
      console.log('用户删除:', row)
    },
    // 添加案件
    addCase() {
      console.log('添加案件')
    },
    // 获取更多讯息
    getMore() {
      console.log('获取更多')
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
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url("../../assets/usercenter/help.png") no-repeat center;
          vertical-align: -2px;
          margin-left: 6px;
        }
      }
      .lawyer-info-icon {
        ul {
          display: flex;
          list-style: none;
          padding: 0 36px;
          justify-content: space-between;
          li{
            font-size: 12px;
            line-height: 12px;
            a{
              color: #999999;
              i{
                display: block;
                font-size: 30px;
                text-align: center;
                margin-bottom: 5px;
              }
            }
            a:hover{
              color: #F44E12;
            }
          }
        }
      }
    }
    .lawyer-business{
      width:238px;
      min-height:172px;
      border:1px solid rgba(229, 229, 229, 0.3);
      background: url("../../assets/usercenter/index-practice-bj.png") no-repeat;
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
        min-height:486px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(229, 229, 229, 0.3);
        h2{
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
          li {
            cursor: pointer;
            height: 107px;
            border-top:1px solid rgba(245,245,245,1);
            position: relative;
            .info-text {
              padding: 0 19px 0 25px;
              h4 {
                line-height: 28px;
                font-size:14px;
                font-weight:400;
                color:rgba(51,51,51,1);
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
