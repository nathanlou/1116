<template>
	<div style="display: flex;justify-content: space-between;">
		<div style="width: 70%;">
			<div class="screen">
				企业：<el-select v-model="companyId" placeholder="请选择" class="select" size="mini">
					<el-option v-for="item in optionsEnterPN" :key="item.key" :label="item.value" :value="item.key" />
				</el-select>
				关键字：
				<el-input v-model="qhkeyword" placeholder="编号、内部编号" class="select" size="mini" />
				<el-button class="btn" type="primary" icon="el-icon-search" size="mini" round>搜索</el-button>
			</div>
			<div style="display: flex;">
				<div v-for="(item,index) in sbzk" :key="index" class="sbzk">
					<div>{{ item.name }}</div>
					<div class="bigtitle">{{ item.value }}</div>
					<div class="text"><i class="el-icon-top" style="color: red;" />{{ item.bl }}%</div>
				</div>
			</div>
			<div id="map" class="mipDiv" />
		</div>

		<div style="margin-right: 2%;margin-left: -2%;">
			<div class="block">
				<el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" />
			</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 size="mini" class="pctable" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column label="排名" align="center">
					<template slot-scope="scope">
						{{ scope.$index+1 }}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="地区" align="center" />
				<el-table-column prop="value" label="设备数量" align="center" />
			</el-table>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 size="mini" class="miniclass" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column label="排名" align="center">
					<template slot-scope="scope">
						{{ scope.$index+1 }}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="地区" align="center" width="75rem" />
				<el-table-column prop="value" label="设备数量" align="center" width="75rem" />
			</el-table>

		</div>

	</div>

</template>

<script>
	import echarts from 'echarts'
	import resize from './mixins/resize'
	import 'echarts/map/js/china.js'
	import {
		companyListCom
	} from '@/api/companyManager.js'
	import {
		statMap
	} from '@/api/globaldata'
	export default {
		mixins: [resize],
		data() {
			return {
				pagesize: 10,
				currentPage: 1,
				companyId: '',
				optionsEnterPN: [],
				value1: '',
				sbzk: [{
						name: '设备总数',
						value: '1556542',
						bl: '13.6'
					},
					{
						name: '本月新增',
						value: '3203',
						bl: '13.6'
					},
					{
						name: '本周新增',
						value: '124',
						bl: '13.6'
					}
				],
				tableData: [],
				chart: null,
				company_list: [{
					value: '选项0',
					label: '全部'
				}, {
					value: '选项1',
					label: '潜合测试'
				}, {
					value: '选项2',
					label: '客户体验'
				}],
				qhkeyword: ''
			}
		},
		created() {
			// 加载企业下拉框
			companyListCom().then(res => {
				this.optionsEnterPN = res.data
			})
		},
		mounted() {
			this.initChart()
		},
		methods: {
			initChart() {
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
					this.tableData = newData
					this.chart = echarts.init(document.getElementById('map'))
					this.chart.setOption({
						title: {
							// text: '全国设备分布图',
							// sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
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
<style scoped="scoped">
	.screen {
		font-size: 0.875rem;
		margin-left: 2%;
		width: 100%;
		color: gray;
	}

	.select {
		width: 25%;
		margin-right: 2%;
		font-weight: 700;

	}

	.btn {
		margin-left: 0.5rem;
	}

	.sbzk {
		width: 28%;
		padding: 1%;
		margin-left: 1.5%;
		margin-top: 1.5%;
		text-align: center;
		background-color: white;
		border-radius: 0.5rem;
		box-shadow: 1px 1px 1px 0px rgba(100, 94, 94, 0.25);
		-webkit-box-shadow: 1px 1px 1px 0px rgba(100, 94, 94, 0.25);
		-moz-box-shadow: 1px 1px 1px 0px rgba(100, 94, 94, 0.25);
	}

	.bigtitle {
		font-size: 1.02rem;
	}

	.pctable {
		width: 100%;
		font-size: 13px;
		margin-top: 2.5%;
		text-align: right;

	}

	.miniclass {
		display: none;
	}

	.mipDiv {
		width: 100%;
		height: 80vh;
		margin-top: -4%;
	}

	@media screen and (max-width: 1024px) {
		.pctable {
			display: none;
		}

		.miniclass {
			display: block;
			width: 98%;
			font-size: 13px;
			margin-top: 2.5%;
		}

		.mipDiv {
			width: 100%;
			height: 80vh;
			margin-top: -10%;
		}

	}
</style>
