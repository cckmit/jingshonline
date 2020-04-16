<template>
  <div class="chart-main">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/usercenter' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/usercenter/case/statistical'}">案件统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chart-list">
      <div ref="caseHistogram" class="chart-list-item"/>
      <div ref="casePie" class="chart-list-item"/>
      <div ref="Litigation" class="chart-list-item"/>
      <div ref="unLitigation" class="chart-list-item"/>
    </div>
    <div ref="Annualreport" class="chart-bottom"/>
  </div>
</template>
<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterCaseStatistical',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心-案件统计',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
  },
  data() {
    return {
      // 案例统计柱状图
      caseHistogramData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '案例统计',
          padding: [24, 32],
          textStyle: {
            fontWeight: '400',
            fontSize: '12'
          }
        },
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
            { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
            { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
            { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      },
      // 案例统计饼状图
      casePieData: {
        title: {
          text: '案例统计分布图',
          padding: [24, 32],
          textStyle: {
            fontWeight: '400',
            fontSize: '12'
          }
        },
        toolbox: {
          feature: {
            restore: { show: true }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          data: ['诉讼领域', '非诉讼领域'],
          left: 'left',
          padding: [50, 0, 0, 32]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '诉讼领域' },
              { value: 310, name: '非诉讼领域' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]

      },
      // 诉讼领域饼状图
      LitigationData: {
        title: {
          text: '诉讼领域分布图',
          padding: [24, 32],
          textStyle: {
            fontWeight: '400',
            fontSize: '12'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: {
          feature: {
            restore: { show: true }
          }
        },
        legend: {
          padding: [50, 0, 0, 32],
          orient: 'vertical',
          left: 10,
          data: ['行政案由', '民事案由', '刑事案由']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '行政案由' },
              { value: 310, name: '民事案由' },
              { value: 234, name: '刑事案由' }
            ]
          }
        ]
      },
      // 非诉讼领域饼状图
      unLitigationData: {
        title: {
          text: '非诉讼领域分布图',
          padding: [24, 32],
          textStyle: {
            fontWeight: '400',
            fontSize: '12'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: {
          feature: {
            restore: { show: true }
          }
        },
        legend: {
          padding: [50, 0, 0, 32],
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      AnnualreportData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        title: {
          text: '诉讼领域分布图',
          padding: [24, 32],
          textStyle: {
            fontWeight: '400',
            fontSize: '12'
          }
        },
        legend: {
          padding: [50, 0, 0, 32],
          orient: 'vertical',
          left: 10,
          data: ['诉讼领域', '非诉讼领域', '平均案例数']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: {
          show: false
        },
        series: [
          {
            name: '诉讼领域',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '非诉讼领域',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均案例数',
            type: 'line',
            data: [2.6, 66.9, 9.0, 26.4, 28.7, 70.7, 226, 185, 48.7, 18.8, 6.0, 2.3]
          }

        ]
      }

    }
  },
  watch: {
  },
  mounted() {
    this.caseHistograminit()
    this.casePieinit()
    this.litigationinit()
    this.unLitigationinit()
    this.annuaLreportinit()
  },
  methods: {
    caseHistograminit() {
      const caseHistogram = this.$echarts.init(this.$refs.caseHistogram)
      caseHistogram.setOption(this.caseHistogramData)
    },
    casePieinit() {
      const casePie = this.$echarts.init(this.$refs.casePie)
      casePie.setOption(this.casePieData)
    },
    litigationinit() {
      const Litigation = this.$echarts.init(this.$refs.Litigation)
      Litigation.setOption(this.LitigationData)
    },
    unLitigationinit() {
      const unLitigation = this.$echarts.init(this.$refs.unLitigation)
      unLitigation.setOption(this.unLitigationData)
    },
    annuaLreportinit() {
      const Annualreport = this.$echarts.init(this.$refs.Annualreport)
      Annualreport.setOption(this.AnnualreportData)
    }
  }
}
</script>
<style lang='scss' scoped>
.chart-main{
  max-width: 1305px;
  min-width: 1305px;
  margin: 0 auto;
  .chart-list {
    display: flex;
    flex-wrap: wrap;
    .chart-list-item {
      background: #fff;
      box-sizing: border-box;
      width: 640px;
      height: 380px;
      border:1px solid rgba(229, 229, 229, 0.3);
    }
    .chart-list-item:nth-child(2n-1) {
      margin-right: 24px;
      margin-bottom: 20px;
    }
  }
  .chart-bottom {
    background: #fff;
    width: 100%;
    height: 330px;
    margin-bottom: 54px;
    border:1px solid rgba(229, 229, 229, 0.3);
  }
}
</style>
