<template>
	<div class="titles">
		<div class="screen">
			企业：<el-select v-model="query.qCompanyId" placeholder="请选择" class="select" size="mini" width="10%">
				<el-option key="" label="全部" value="" />
				<el-option v-for="item in company_list" :key="item.key" :label="item.value" :value="item.key" />
			</el-select>
			关键字：
			<el-input v-model="query.qKeyword" placeholder="编号/内部编号/sim" class="select" size="mini" />
			状态：<el-select v-model="query.qState" placeholder="请选择" class="select" size="mini">
				<el-option v-for="item in status_list" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<el-button class="btn" type="primary" icon="el-icon-search" size="mini" round="" @click="getlist">搜索</el-button>
			<span style="float: right;">
				<router-link to="/equipment_add/index">
					<el-button class="btn" type="success" icon="el-icon-edit" size="mini" round>添加设备</el-button>
				</router-link>
				<router-link to="/batch_add/index">
					<el-button class="btn" type="warning" icon="el-icon-edit" size="mini" round>批量添加</el-button>
				</router-link>
				<el-button class="btn" type="danger" icon="el-icon-delete" size="mini" round @click="deletes()">批量删除</el-button>
			</span>
		</div>
		<div class="container_table">
			<div class="table_headr">列 表</div>
			<el-table ref="multipleTable" :data="tableData" border stripe style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}"
			 :row-style="{height: '0'}" :cell-style="{padding: '0'}" size="mini">
				<el-table-column fixed type="selection" align="center" size="mini" />
				<!-- <el-table-column fixed prop="bh" sortable label="设备编号" align="center" width="150" size="mini" /> -->
				<el-table-column fixed prop="bh" sortable label="设备编号" align="center" width="150" size="mini">
					<template slot-scope="scope">
						<div style="color:#337ab7;cursor: pointer;" @click="details(scope.$index, scope.row)">
							{{ scope.row.bh }}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="companyBh" sortable label="内部编号" align="center" width="115" size="mini" />
				<el-table-column prop="gdmc" label="工地名称" width="100" align="center" size="mini" />
				<el-table-column prop="sblx" label="设备种类" align="center" size="mini" />
				<el-table-column prop="sbxh" label="设备型号" align="center" size="mini" />
				<el-table-column prop="yxsj" sortable label="运行时间" align="center" width="110" size="mini" />
				<el-table-column prop="qdcs" sortable label="启动次数" align="center" width="110" size="mini" />
				<el-table-column prop="zt" label="设备状态" align="center" size="mini">
					<template slot-scope="scope">
						<div v-if="scope.row.deviceState==1" style="color:green;">
							在线
						</div>
						<div v-else style="color:red;">
							离线
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="isEnable" label="开机状态" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.isEnable==1" style="color:green;">
							开机
						</div>
						<div v-else style="color:red;">
							关机
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="version" label="软件版本" align="center" width="80" size="mini" />
				<el-table-column label="操作" width="280" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button class="btn btn_do" type="success" size="mini" round plain @click="monitor(scope.$index, scope.row)">监控</el-button>
						<el-button class="btn btn_do" type="warning" size="mini" round plain @click="set_up(scope.$index, scope.row)">设置</el-button>
						<el-button class="btn btn_do" type="danger" size="mini" round plain @click="getQrcode(scope.row.id)">二维码</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="fy" :current-page.sync="currentPage" :page-size="20" layout="total, prev, pager, next" :total="total"
			 @current-change="handleCurrentChange" />
		</div>
		<!-- 二维码弹窗 -->
		<el-dialog title="设备二维码" :visible.sync="showQrcodePath" width="30%">
			<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;align-content: center;">
				<el-image style="width: 400px;height: 400px;" :src="host + qrCodePath" fit="contain" />
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		equipment_list /* equipment_del */
	} from '@/api/getlist'
	import {
		companyListCom
	} from '@/api/companyManager.js'
	import {
		deviceInforGetEwm,
		deviceInforDeleteAll
	} from '@/api/deviceSetUp.js'
	export default {
		data() {
			return {
				host: process.env.VUE_APP_BASE_API,
				qrCodePath: '',
				showQrcodePath: false,
				total: 0, // 默认数据总数
				pagesize: 20, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				tableData: [],
				company_list: [],
				status_list: [{
					value: '',
					label: '全部'
				}, {
					value: 'online',
					label: '在线'
				}, {
					value: 'offline',
					label: '离线'
				}],
				start: 0,
				query: {
					access_token: localStorage.getItem('accessToken'),
					start: this.start,
					length: 20,
					qCompanyId: '',
					qKeyword: '',
					qState: '',
					qVersion: '',
					orderColumn: ''
				}
			}
		},
		created: function() {
			this.query.qState = this.$route.query.status
			setInterval(this.getlist, 30000)
			this.getlist()
			this.handleCurrentChange()
			companyListCom().then(res => {
				this.company_list = res.data
			})
		},
		methods: {
			details(index, row) {
				localStorage.setItem('details', row.id)
				this.$router.push({
					path: 'details',
					query: {
						key: localStorage.setItem('id', row.id)
					}
				})
			},
			getlist() {
				const that = this
				equipment_list(that.query).then(res => {
					this.tableData = res.data
					this.total = res.recordsTotal
				})
			},
			getQrcode(id) {
				if (id) {
					const query = {
						access_token: localStorage.getItem('accessToken'),
						id: id
					}
					deviceInforGetEwm(query).then(res => {
						if (res.status === 200) {
							this.qrCodePath = res.data
							this.showQrcodePath = true
						}
					})
				}
			},
			set_up(index, row) {
				localStorage.setItem('id', row.id)
				this.$router.push({
					path: '/equipment_list/set_up',
					query: {
						key: localStorage.setItem('id', row.id)
					}
				})
			},
			monitor(index, row) {
				this.$router.push({
					path: '/equipment_list/monitor',
					query: {
						rowData: row
					}
				})
			},
			handleCurrentChange(val) {
				var that = this
				that.query.start = (val - 1) * 20
				this.getlist(that.start)
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
			deleteRow(index, rows) {
				rows.splice(index, 1)
			},
			deletes() {
				this.selectionDatas = []
				var arr = []
				var data = this.$refs.multipleTable.selection
				if (data.length === 0) {
					this.$alert('您没有任何选择', '提示', {
						confirmButtonText: '确定',
						callback: action => {}
					})
				} else {
					data.forEach(function(item) {
						arr.push(item.id)
					})
					this.$confirm('此操作将永久删除这些设备, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						deviceInforDeleteAll({
								access_token: localStorage.getItem('accessToken'),
								ids: arr.join(',')
							})
							.then(response => {
								if (response.status === 200) {
									this.$message({
										type: 'success',
										message: '删除成功!'
									})
									this.currentPage = 1
									this.getlist()
								}
							})
							.catch(function(error) {
								console.log(error)
							})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.screen {
		font-size: 0.875rem;
		color: gray;
	}

	.select {
		width: 10rem;
		margin-right: 1rem;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}

	.titles {
		width: 95%;
		margin-left: 1rem;

		height: 100%;
		margin-bottom: 1.25rem;
		font-size: 0.875rem;
	}

	.btn {
		margin-left: 0.5rem;
		margin-bottom: 0.625rem;

	}

	.btn_do {
		margin-top: 0.625rem;

	}

	.container_table {
		clear: both;
	}

	.table_headr {
		height: 2rem;
		line-height: 2rem;
		color: white;
		background-color: #409EFF;

	}

	@media screen and (max-width: 1024px) {
		.titles {
			font-size: 0.875rem;
			margin-top: -2.5%;
		}

		.select {
			width: 6.7rem;

			margin-right: 1rem;
		}

		.btn {
			margin-top: 0.625rem;
		}
	}
</style>
