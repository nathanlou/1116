<template>
  <div id="main" style="width: 100%;height:17rem;" />
</template>

<script>
import {
  indexdata
} from '@/api/globaldata'
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
      listType: [],
      y1: []
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
      this.chart = echarts.init(document.getElementById('main'))
      this.chart.setOption({
        title: {
          text: '产品品类占比',
          x: 'center',
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
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}({d}%)'
        },
        legend: {
          // x: 'center',
          // y: 'bottom',
          // padding: [10, 0, 0, 0],
          // icon: 'circle',
          data: [],
          bottom: 0
        },
        color: ['#C3B6E6', '#FACFA9', '#71D4D4', '#A3D2F6', '#75B6E4', '#90EC7D', '#46454A', '#F6A35F'],
        series: [{
          name: '占比情况',
          type: 'pie',
          minAngle: 5,
          avoidLabelOverlap: true,
          radius: '60%',
          // roseType: 'angle',
          data: []
        }]
      })
      const query = {
        access_token: localStorage.getItem('accessToken')
      }
      indexdata(query).then(res => {
        var names = [] // 类别数组（用于存放饼图的类别）
        var brower = []
        const listType = res.data.listType
        for (var i = 0; i < listType.length; i++) {
          var obj = {}
          var arr = []
          obj.name = listType[i].xval
          obj.value = listType[i].y1
          arr.name = listType[i].xval
          names[i] = obj
          brower[i] = arr
        }
        this.chart.setOption({
          legend: {
            data: brower.value
          },
          series: [{
            data: names
          }]
        })
      })
    }
  }
}
</script>
