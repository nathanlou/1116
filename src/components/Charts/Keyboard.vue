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
					const data = res.data
					var val = []
					var nam = []
					var newData = []
					for (var i = 0; i < data.length; i++) {
						var name = data[i].key.replace('省', '')
						var nameone = name.replace('自治区', '')
						var namethree = nameone.replace('维吾尔', '')
						var namefour = namethree.replace('壮族', '')
						var namefive = namefour.replace('回族', '')
						var namesix = namefive.replace('特别行政区', '')
						var nameseven = namesix.replace('市', '')
						val.push(data[i].value)
						nam.push(data[i].key)
						var obj = {
							name: nameseven,
							value: data[i].value
						}
						newData.push(obj)
					}
					this.chart.setOption({
						title: {
							text: '设备国内分布图',
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
							formatter: function(params) {
								if (params.value) {
									return params.name + ' : ' + params.value + '台';
								} else {
									return params.name + ' : ' + '0' + '台';
								}
							}
						},
						toolbox: {
							show: true,
							orient: 'vertical',
							left: 'right',
							top: 'center'
						},
						visualMap: {
							min: 0,
							max: 100,
							// text: ['High', 'Low'],
							realtime: false,
							calculable: false,
							inRange: {
								color: ['lightskyblue', 'yellow', 'orangered']
							}
						},
						series: [{
							name: '',
							type: 'map',
							mapType: 'china', // 自定义扩展图表类型
							// label: {
							//     show: true
							// },
							data: newData
						}]
					})
				})
			}
		}
	}
</script>
