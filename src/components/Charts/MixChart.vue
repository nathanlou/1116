<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import {
  indexdata
} from '@/api/globaldata'
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      listYx: [],
      y1: [],
      y2: [],
      y3: []
    }
  },
  mounted() {
    this.getlist()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getlist() {
      const query = {
        access_token: localStorage.getItem('accessToken')
      }
      indexdata(query).then(res => {
        const listYx = res.data.listYx
        for (var i = 0; i < listYx.length; i++) {
          this.listYx.push(listYx[i].xval)
          this.y1.push(listYx[i].y1)
          this.y2.push(listYx[i].y2)
          this.y3.push(listYx[i].y3)
        }
        this.chart = echarts.init(document.getElementById(this.id))
        // var posList = [
        //   'left', 'right', 'top', 'bottom',
        //   'inside',
        //   'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        //   'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        // ]

        // app.configParameters = {
        //   rotate: {
        //     min: -90,
        //     max: 90
        //   },
        //   align: {
        //     options: {
        //       left: 'left',
        //       center: 'center',
        //       right: 'right'
        //     }
        //   },
        //   verticalAlign: {
        //     options: {
        //       top: 'top',
        //       middle: 'middle',
        //       bottom: 'bottom'
        //     }
        //   },
        //   position: {
        //     options: echarts.util.reduce(posList, function(map, pos) {
        //       map[pos] = pos
        //       return map
        //     }, {})
        //   },
        //   distance: {
        //     min: 0,
        //     max: 100
        //   }
        // }

        // app.config = {
        //   rotate: 0,
        //   align: 'left',
        //   verticalAlign: 'middle',
        //   position: 'insideBottom',
        //   distance: 10,
        //   onChange: function() {
        //     var labelOption = {
        //       normal: {
        //         rotate: app.config.rotate,
        //         align: app.config.align,
        //         verticalAlign: app.config.verticalAlign,
        //         position: app.config.position,
        //         distance: app.config.distance
        //       }
        //     }
        //     myChart.setOption({
        //       series: [{
        //         label: labelOption
        //       }, {
        //         label: labelOption
        //       }, {
        //         label: labelOption
        //       }, {
        //         label: labelOption
        //       }]
        //     })
        //   }
        // }

        var labelOption = {
          show: true,
          position: 'top',
          formatter: '{c}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
        this.chart.setOption({
          color: ['#71D4D4', '#C3B6E6', 'red'],
          title: {
            text: '设备运行统计图',
            textStyle: {
              // 文字颜色
              color: 'gray',
              // 字体风格,'normal','italic','oblique'
              fontStyle: 'normal',
              // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight: 'bold',
              // 字体系列
              fontFamily: 'sans-serif',
              // 字体大小
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              textStyle: {
                color: '#ffffff'
              }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            borderWidth: 0
          },
          legend: {
            data: ['运行时间', '启动次数', '报警情况'],
            textStyle: { // 图例文字的样式
              color: 'gray',
              fontSize: 14
            }
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.listYx,
            axisLine: {
              lineStyle: { // 图例文字的样式
                color: 'gray',
                fontSize: 20
              }
            }

          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: { // 图例文字的样式
                color: 'gray',
                fontSize: 20
              }
            }
          }],
          series: [{
            name: '运行时间',
            type: 'bar',
            label: labelOption,
            data: this.y1
          },
          {
            name: '启动次数',
            type: 'bar',
            label: labelOption,
            data: this.y2
          },
          {
            name: '报警情况',
            type: 'line',
            // label: labelOption,
            data: this.y3
          }
          ]
        })
      })
    }

  }
}
</script>
