<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
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
      this.chart = echarts.init(document.getElementById(this.id))
      var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 10,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
        myChart.setOption({
            series: [{
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }]
        });
    }
};


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
};
      this.chart.setOption({
    color: ['#71D4D4', '#C3B6E6', 'red'],
    title: {
          text: '设备运行统计图',
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
          borderWidth: 0,
        },
    legend: {
        data: ['运行时间', '启动次数', '报警情况'],
        textStyle:{//图例文字的样式
                    color:'gray',
                    fontSize:14
                }
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {show: false},
            data: ['客户1', '客户2', '客户3', '客户4', '客户5','客户6', '客户7', '客户8', '客户9', '客户10'],
            axisLine:{
              lineStyle:{//图例文字的样式
                          color:'gray',
                          fontSize:20
                      }
            }

        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine:{
              lineStyle:{//图例文字的样式
                          color:'gray',
                          fontSize:20
                      }
            }
        }
    ],
    series: [
        {
            name: '运行时间',
            type: 'bar',
            label: labelOption,
            data: [220, 182, 191, 234, 290,220, 182, 191, 234, 290],
        },
        {
            name: '启动次数',
            type: 'bar',
            label: labelOption,
            data: [150, 232, 201, 154, 190,150, 232, 201, 154, 190]
        },
        {
            name: '报警情况',
            type: 'line',
            // label: labelOption,
            data: [98, 77, 101, 99, 40,98, 77, 101, 99, 40],
        }
    ]
      })
    }
  }
}
</script>
