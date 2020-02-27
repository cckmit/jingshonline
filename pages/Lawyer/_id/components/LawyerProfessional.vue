<template>
  <div class="lawyer-professional">
    <div id="Litigation" ref="Litigation" style="width:520px;height:400px;"/>
    <div id="LitigationTwo" ref="LitigationTwo" style="width:520px;height:400px;"/>
  </div>
</template>

<script>
export default {
  name: 'LawyerProfessional',
  components: {

  },
  props: {
    chartData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      option: {
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
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '房产土地' },
              { value: 310, name: '合同纠纷' },
              { value: 234, name: '物权纠纷' },
              { value: 135, name: '婚姻继承' },
              { value: 1548, name: '劳动纠纷' },
              { value: 15, name: '行政案件' },
              { value: 15, name: '侵权纠纷' }
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
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const myChart = this.$echarts.init(this.$refs.Litigation)
      const myChartTwo = this.$echarts.init(this.$refs.LitigationTwo)
      myChart.setOption(this.option)
      myChartTwo.setOption(this.option)
    }
  }
}
</script>>

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
