<template>
	<div>
		<el-page-header style="margin-left: 2.5%;" content="设置页面" @back="goback" />
		<div style="width: 95%;margin-left: 2.5%;margin-top: 2%;color: gray;display: flex;flex-wrap: wrap;justify-content: space-between;">
			<div class="msg_con">
				<div style="display: flex;width: 100%;height: 1.5rem;font-weight: 700;justify-content: center;">设备信息</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 50%;">
						<div class="label">企业：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.companyName }}</div>
					</div>
					<div style="display: flex;width: 50%;">
						<div class="label">设备编号：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.bh }}</div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 50%;">
						<div class="label">内部编号：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.companyBh }}</div>
					</div>
					<div style="display: flex;width: 50%;">
						<div class="label">SIM卡号：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.sim }} <span style="color: dodgerblue;"> 正常</span></div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 50%;">
						<div class="label">负责人：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.gdfzr }}</div>
					</div>
					<div style="display: flex;width: 50%;">
						<div class="label">联系电话：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.gdfzrsj }}</div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 50%;">
						<div class="label">设备种类：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.sbxh }}</div>
					</div>
					<div style="display: flex;width: 50%;">
						<div class="label">设备型号：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.sblx }}</div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 50%;">
						<div class="label">安装日期：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.azrq }}</div>
					</div>
					<div style="display: flex;width: 50%;">
						<div class="label">到期日期：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.yxrq }}</div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 50%;">
						<div class="label">当前地址：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.dqdz }}</div>
					</div>
					<div style="display: flex;width: 50%;">
						<div class="label">通讯时间：</div>
						<div style="margin-left: 0.9375rem;">{{ msg.lastTime | dateFilter("yyyy-mm-dd hh:mm:ss") }}</div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 100%;">
						<div class="label">远程操作：</div>
						<div style="margin-left: 0.9375rem;">
							<el-button v-if="msg.isEnable!=1" type="success" round plain size="mini" @click="on(&quot;kj&quot;)">远程开机</el-button>
							<el-button v-if="msg.isEnable==1" type="warning" round plain size="mini" @click="on(&quot;gj&quot;)">远程关机</el-button>
							<el-button type="danger" round plain size="mini" @click="on(&quot;cq&quot;)">重启设备</el-button>
						</div>
					</div>
				</div>
				<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
					<div style="display: flex;width: 100%;">
						<div class="label">特殊设置：</div>
						<div style="margin-left: 0.9375rem;">
							<el-button type="success" round plain size="mini" @click="xtjg = true">心跳间隔</el-button>
							<el-button type="warning" round plain size="mini" @click="ipdz = true">IP地址</el-button>
						</div>
					</div>
				</div>
			</div>
			<div class="msg_con" style="margin-top: 2%;">
				<div class="container_table">
					<div class="table_headr">操作记录</div>
					<el-table ref="multipleTable" :data="tableData" border stripe style="width: 100%;font-size: 13px;color: gray;"
					 :default-sort="{prop: 'date', order: 'descending'}" size="mini">
						<el-table-column prop="createUserName" label="操作人" align="center" size="mini" />
						<el-table-column prop="czlx" sortable label="操作类型" align="center" size="mini" />
						<el-table-column prop="cznr" label="操作内容" align="center" size="mini" />
						<el-table-column prop="createTime" label="操作时间" align="center" width="180" size="mini" />
					</el-table>
					<el-pagination class="fy" :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev, pager, next"
					 :total="totalCount" background @current-change="current_change" />
				</div>
			</div>
		</div>
		<!-- 提醒 -->
		<el-dialog title="提示" :visible.sync="tx" width="35%">
			<div>谨慎操作！您确定要操作吗？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="tx = false">取 消</el-button>
				<el-button type="primary" @click="txs()">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 提醒 -->
		<!-- 心跳间隔 -->
		<el-dialog title="心跳间隔" :visible.sync="xtjg" width="50%">
			<div>
				<el-form label-width="150px">
					<el-form-item label="功能">
						心跳间隔设置,单位s 值范围(1~3600)
					</el-form-item>
					<el-form-item label="心跳间隔">
						<el-input v-model="xtvalue" style="width: 60%;" />
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="xtjg = false">取 消</el-button>
				<el-button type="primary" @click="xtclick()">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 心跳间隔 -->
		<!-- IP地址 -->
		<el-dialog title="IP地址" :visible.sync="ipdz" width="50%">
			<div>
				<el-form label-width="150px">
					<el-form-item label="功能">
						修改服务器IP地址指令;例如:10.78.183.12:9090
					</el-form-item>
					<el-form-item label="IP地址以及端口">
						<el-input v-model="ipvalue" style="width: 60%;" />
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ipdz = false">取 消</el-button>
				<el-button type="primary" @click="ipclick()">确 定</el-button>
			</span>
		</el-dialog>
		<!-- IP地址 -->
	</div>
</template>

<script>
	import {
		equipment_del,
		equipment_msg
	} from '@/api/getlist'
	import {
		companyListCom
	} from '@/api/companyManager.js'
	import {
		deviceTransferSave,
		deviceOpLogListData,
		deviceInforUpdateZb
	} from '@/api/deviceSetUp.js'
	import {
		parseTime
	} from '@/utils/index.js'
	export default {
		filters: {
			dateFilter(data, format = '') {
				var dt = new Date(data)
				var y = dt.getFullYear()
				var m = (dt.getMonth() + 1).toString().padStart(2, '0')
				var d = dt.getDate().toString().padStart(2, '0')
				var h = dt.getHours().toString().padStart(2, '0')
				var mm = dt.getMinutes().toString().padStart(2, '0')
				var s = dt.getSeconds().toString().padStart(2, '0')
				if (format.toLocaleLowerCase() === 'yyyy-mm-dd' ||
					format.toLocaleLowerCase() === '') {
					return `${y}-${m}-${d}`
				} else if (format.toLocaleLowerCase() === 'yyyy/mm/dd') {
					return `${y}/${m}/${d}`
				} else if (format.toLocaleLowerCase() === 'yyyy-mm-dd hh:mm:ss') {
					return `${y}-${m}-${d} ${h}:${mm}:${s}`
				} else if (format.toLocaleLowerCase() === 'yyyy/mm/dd hh:mm:ss') {
					return `${y}/${m}/${d} ${h}:${mm}:${s}`
				} else {
					return `时间格式有误`
				}
			}
		},
		data() {
			const self = this
			return {
				ipdz: false,
				xtjg: false,
				tx: false,
				msg: '',
				cs: '',
				xtvalue: '',
				ipvalue: '',
				istag: true,
				queryLog: {
					access_token: localStorage.getItem('accessToken'),
					start: 0,
					length: 10,
					queryDeviceId: localStorage.getItem('id')
				},
				form: {},
				currentPage: 1, // 当前页面
				pageSize: 10, // 每页几条
				totalCount: 0, // 总数
				tableData: [],
			}
		},
		created: function() {
			this.equipment_msg()
			this.getOptLogList()
		},
		methods: {
			// 查询操作日志
			getOptLogList() {
				this.queryLog.start = this.currentPage - 1
				this.queryLog.length = this.pageSize
				deviceOpLogListData(this.queryLog).then(res => {
					if (res.status === 200) {
						this.tableData = res.data
						this.totalCount = res.recordsTotal
					} else {
						this.$message.error('加载操作日志列表失败')
					}
				})
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage
				// 重新查询
				this.getOptLogList()
			},
			equipment_msg() {
				const query = {
					access_token: localStorage.getItem('accessToken'),
					id: localStorage.getItem('id')
				}
				equipment_msg(query).then(res => {
					this.msg = res.data
				})
			},
			on(res) {
				this.tx = true
				this.cs = res
			},
			txs(res) {
				this.tx = false
			},
			xtclick() {
				this.xtjg = false
			},
			ipclick() {
				this.ipdz = false
			},
			// 显示地图
			goback() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style>
	.label {
		width: 6.875rem;
		text-align: center;
		background-color: #E8F4FF;
	}

	.table_headr {
		height: 2rem;
		line-height: 2rem;
		color: white;
		background-color: #409EFF;
	}

	.msg_con {
		width: 49%;
		font-size: 1.0rem;
	}

	.container_table {
		margin-top: 1%;
	}

	.fy {
		margin-top: 1%;
		margin-bottom: 1%;
		text-align: right;
	}

	@media screen and (max-width: 1024px) {
		.msg_con {
			width: 90%;
			margin-left: 0;
			font-size: 0.9rem;
		}

	}

	.search-box {
		position: absolute;
		top: 25px;
		left: 70px;
	}

	.amap-page-container {
		position: relative;
		width: 100%;
		height: 600px;
		box-sizing: border-box;
	}

	.map {
		width: 100%;
		height: 100%;
		position: absolute;
		top: -20px;
		left: 0;
	}

	.toolbar {
		width: 80%;
		height: auto;
		color: red;
		margin-top: 15px;
	}
</style>
