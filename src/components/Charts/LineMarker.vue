<template>
  <div id="main" style="width: 100%;height:17rem;"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('main'))
      this.chart.setOption({
		  title: {
		      text: '产品品类占比',
          x:"center",
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
          　　　　 fontSize:16,

              }
		  },
		  legend: {
		      data: [{
            name:'YLY1',
            textStyle:{
              color:'gray'
            },

          }, {
            name:'脉冲控制仪',
            textStyle:{
               color:'gray'
            },

          },{
            name:'砂石分离机',
            textStyle:{
              color:'gray'
            },

          },{
            name:'云智能除尘',
            textStyle:{
               color:'gray'
            },

          }],
			  bottom:0,

		  },
				series : [
                    {
                        name: '访问来源',
                        type: 'pie',
						minAngle: 5,
						avoidLabelOverlap:true,
                        radius: '60%',
                        roseType: 'angle',
                        data:[
                            {value:350, name:'YLY1',  itemStyle: {  color:'#C3B6E6'}},
                            {value:340, name:'脉冲控制仪',  itemStyle: {  color:'#FACFA9'}},
                            {value:320, name:'砂石分离机',  itemStyle: {  color:'#71D4D4'}},
                            {value:310, name:'云智能除尘',  itemStyle: {  color:'#A3D2F6'}}
                        ],
                    }
                ]
      })
    }
  }
}
</script>
