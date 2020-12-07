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
          yAxis: [
			  {
			                  type: 'value',
			                  nameLocation:"center",
			                  nameGap:35,
			                  nameRotate:0,
			                  nameTextStyle:{
			                      fontSize: 16,
			                  },
			                  //默认以千分位显示，不想用的可以在这加一段
			                  axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
			                      show:true,
			                      showMinLabel:true,
			                      showMaxLabel:true,
			                      formatter: function (value) {
			                          return value;
			                      }
			                  }
			              },
			              {
			                  type: 'value',
			                  nameLocation:"center",
			                  nameGap:35,
			                  nameRotate:0,
							  yAxisIndex: 1,
							  max:20,
			                  nameTextStyle:{
			                      fontSize: 16,
			                  },
			                  //默认以千分位显示，不想用的可以在这加一段
			                  axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
			                      show:true,
			                      showMinLabel:true,
			                      showMaxLabel:true,
			                      formatter: function (value) {
			                          return value;
			                      }
			                  }
			              }
		  ],
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
			yAxisIndex: 1,
            // label: labelOption,
            data: this.y3,
			 max: 20,
          }
          ]
        })
      })
    }

  }
}
</script>
