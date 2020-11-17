<template>
  <div id="map" style="width: 100%;height: 17.5rem;" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import china from 'echarts/map/js/china.js'

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
      this.chart.setOption({
        title: {
            text: '全国设备分布图',
            x:"center",
            sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12',
            textStyle:{
                    //文字颜色
                    color:'gray',
                    //字体风格,'normal','italic','oblique'
                    fontStyle:'normal',
                    //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    fontWeight:'bold',
                    //字体系列
                    fontFamily:'sans-serif',
                    //字体大小
            　　　　 fontSize:16
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
            top: 'center',
        },
        visualMap: {
            min: 0,
            max: 5000,
            // text: ['High', 'Low'],
            realtime: false,
            calculable: false,
            inRange: {
                color: [ '#9EDFFD', '#2976BE']
            }
        },
        series: [
            {
                name: '',
                type: 'map',
                mapType: 'china', // 自定义扩展图表类型
                // label: {
                //     show: true
                // },
                data: [
                    {name: '北京',value: Math.round(Math.random()*500)},
                            {name: '天津',value: Math.round(Math.random()*5)},
                            {name: '上海',value: Math.round(Math.random()*15)},
                            {name: '重庆',value: Math.round(Math.random()*25)},
                            {name: '河北',value: Math.round(Math.random()*35)},
                            {name: '河南',value: Math.round(Math.random()*45)},
                            {name: '云南',value: Math.round(Math.random()*55)},
                            {name: '辽宁',value: Math.round(Math.random()*65)},
                            {name: '黑龙江',value: Math.round(Math.random()*75)},
                            {name: '湖南',value: Math.round(Math.random()*85)},
                            {name: '安徽',value: Math.round(Math.random()*95)},
                            {name: '山东',value: Math.round(Math.random()*100)},
                            {name: '新疆',value: Math.round(Math.random()*500)},
                            {name: '江苏',value: Math.round(Math.random()*500)},
                            {name: '浙江',value: Math.round(Math.random()*500)},
                            {name: '江西',value: Math.round(Math.random()*500)},
                            {name: '湖北',value: Math.round(Math.random()*500)},
                            {name: '广西',value: Math.round(Math.random()*500)},
                            {name: '甘肃',value: Math.round(Math.random()*500)},
                            {name: '山西',value: Math.round(Math.random()*500)},
                            {name: '内蒙古',value: Math.round(Math.random()*500)},
                            {name: '陕西',value: Math.round(Math.random()*500)},
                            {name: '吉林',value: Math.round(Math.random()*500)},
                            {name: '福建',value: Math.round(Math.random()*500)},
                            {name: '贵州',value: Math.round(Math.random()*500)},
                            {name: '广东',value: Math.round(Math.random()*500)},
                            {name: '青海',value: Math.round(Math.random()*500)},
                            {name: '西藏',value: Math.round(Math.random()*500)},
                            {name: '四川',value: Math.round(Math.random()*500)},
                            {name: '宁夏',value: Math.round(Math.random()*500)},
                            {name: '海南',value: Math.round(Math.random()*500)},
                            {name: '台湾',value: Math.round(Math.random()*155)},
                            {name: '香港',value: Math.round(Math.random()*145)},
                            {name: '澳门',value: Math.round(Math.random()*135)},
                            {name: '南海诸岛',value: Math.round(Math.random()*500)}
                ],
            }
        ]
      })
    }
  }
}
</script>
