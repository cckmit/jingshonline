<template>
  <div class="lawyer-professional">
    <div v-if="chartData.practicea && chartData.practicea.length" id="Litigation" ref="Litigation" style="width:550px;height:450px;"/>
    <div v-if="chartData.noPracticea && chartData.noPracticea.length" id="LitigationTwo" ref="LitigationTwo" style="width:550px;height:450px;"/>
  </div>
</template>

<script>
export default {
  name: 'LawyerProfessional',
  components: {
  },
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {
          practicea: [],
          noPracticea: []
        }
      }
    }
  },
  data() {
    return {
      practiceaOptions: {
        title: {
          text: '诉讼领域案例分布图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          width: 200
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true }
          }
        },
        series: [
          {
            name: '当前领域',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
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
      noPracticeaOptions: {
        title: {
          text: '非诉讼领域案例分布图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true }
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
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
      }

    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    if (this.chartData.practicea && this.chartData.practicea.length > 0) {
      this.chartData.practicea.forEach(item => {
        this.practiceaOptions.series[0].data.push({
          value: item.count,
          name: item.name
        })
      })
    }
    if (this.chartData.noPracticea && this.chartData.noPracticea.length > 0) {
      this.chartData.noPracticea.forEach(item => {
        this.noPracticeaOptions.series[0].data.push({
          value: item.count,
          name: item.name
        })
      })
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      if (this.chartData.practicea && this.chartData.practicea.length) {
        const myChart = this.$echarts.init(this.$refs.Litigation)
        myChart.setOption(this.practiceaOptions)
      }
      if (this.chartData.noPracticea && this.chartData.noPracticea.length) {
        const myChartTwo = this.$echarts.init(this.$refs.LitigationTwo)
        myChartTwo.setOption(this.noPracticeaOptions)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lawyer-professional {
  margin-bottom: 160px;
  background: #fff;
  padding: 38px 28px 24px;
  border-bottom: 1px solid #eee;
  border-left:  1px solid #eee;
  border-right:  1px solid #eee;
  #Litigation{
    margin-bottom: 46px;
  }
}

</style>
