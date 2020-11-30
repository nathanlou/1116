<template>
  <div id="map" style="width: 100%;height: 17.5rem;" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts/map/js/china.js'
import {
  statMap
} from '@/api/globaldata'
export default {
  mixins: [resize],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('map'))
      const query = {
        access_token: localStorage.getItem('accessToken')
      }
      statMap(query).then(res => {
        this.chart.setOption({
          title: {
            text: '全国设备分布图',
            x: 'center',
            sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12',
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
            formatter: '{b}{c}(台)'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
          },
          visualMap: {
            min: 0,
            max: 5000,
            // text: ['High', 'Low'],
            realtime: false,
            calculable: false,
            inRange: {
              color: ['#9EDFFD', '#2976BE']
            }
          },
          series: [{
            name: '',
            type: 'map',
            mapType: 'china', // 自定义扩展图表类型
            // label: {
            //     show: true
            // },
            data: res.data
          }]
        })
      })
    }
  }
}
</script>
