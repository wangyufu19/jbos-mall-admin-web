<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme


export default {

  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        color: ["#6395F9", "#62DAAB", "#657798", "#F6C022", "#E96C5B", "#74CBED", "#9968BD", "#FF9D4E", "#299998"],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: '50%',
          orient: 'vertical',
          x:'left',
          data: ['北京', '上海', '深圳', '杭州'],
        },

        toolbox: {
          show: true,
          right: '20px', 
          feature: {
            mark: {show: true},
            dataView: {
              show: true,
              readOnly: false
            },
            mageicType:{
              show: true,
              type: '[pie]',
              option: {}
            },
            restore: {show: false},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '区域',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: [
              { value: 320, name: '北京' },
              { value: 240, name: '上海' },
              { value: 149, name: '深圳' },
              { value: 100, name: '杭州' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
