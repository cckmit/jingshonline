<template>
  <div class="lawyer-professional">
    <div id="Litigation" ref="Litigation" style="width:600px;height:400px;"/>
    <div id="LitigationTwo" ref="LitigationTwo" style="width:600px;height:400px;"/>
  </div>
</template>

<script>
export default {
  name: 'LawyerProfessional',
  components: {

  },
  props: {},
  data() {
    return {
      option: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
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
  padding: 38px 28px 0;
  border-bottom: 1px solid #eee;
  border-left:  1px solid #eee;
  border-right:  1px solid #eee;
}
</style>
