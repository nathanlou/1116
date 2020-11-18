<template>
	<div>
		<div style="text-align: right;">
			日期：<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
		</div>
		<div :id="id" :class="className" style="width: 100%;height: 40vh;" />
	</div>
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
				chart: null,
				value1:''
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
						options: echarts.util.reduce(posList, function(map, pos) {
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
					distance: 15,
					onChange: function() {
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
					fontSize: 13,
					rich: {
						name: {
							textBorderColor: '#fff'
						}
					}
				};
				this.chart.setOption({
					color: ['#58a3f7', '#52c1f5', '#4bced0', '#fb6260'],
					title: {
						text: '设备统计'
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
						data: ['云平台控制仪', '砂石分离机', '洗车机', '雾炮车']
					},
					xAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: ['客户1', '客户2', '客户3', '客户4', '客户5', '客户6', '客户7', '客户8', '客户9', '客户10']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '云平台控制仪',
							type: 'bar',
							label: labelOption,
							data: [220, 182, 191, 234, 290, 220, 182, 191, 234, 290],
						},
						{
							name: '砂石分离机',
							type: 'bar',
							label: labelOption,
							data: [150, 232, 201, 154, 190, 150, 232, 201, 154, 190]
						},
						{
							name: '洗车机',
							type: 'bar',
							label: labelOption,
							data: [98, 77, 101, 99, 40, 98, 77, 101, 99, 40],
						},
						{
							name: '雾炮车',
							type: 'bar',
							label: labelOption,
							data: [30, 147, 254, 110, 35, 42, 17, 66, 34, 140],
						}
					]
				})
			}
		}
	}
</script>
