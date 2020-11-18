<template>
	<div style="width: 95%;margin-left: 2.5%;">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="SIM卡详情" name="first">
				<div style="width: 60%;">
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">卡号：</div>
						<div style="margin-left: 0.9375rem;">{{msg.sim}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">ICCID：</div>
						<div style="margin-left: 0.9375rem;">{{sim_msg.ICCID}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">状态：</div>
						<div style="margin-left: 0.9375rem;">{{sim_msg.status}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">套餐内流量：</div>
						<div style="margin-left: 0.9375rem;">{{sim_msg.tcnll}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">本月内使用流量：</div>
						<div style="margin-left: 0.9375rem;">{{sim_msg.syll}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">本月内使用短信：</div>
						<div style="margin-left: 0.9375rem;">{{sim_msg.sydx}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">开关机状态：</div>
						<div style="margin-left: 0.9375rem;">{{sim_msg.off_on}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">激活日期：</div>
						<div style="margin-left: 0.9375rem;">{{msg.jhrq}}</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div class="label">到期日期：</div>
						<div style="margin-left: 0.9375rem;">{{msg.dqrq}}</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="缴费记录" name="second">
				<div class="container_table">
					<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
					 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}" :header-cell-style="{background:'#FAFAFA',color:'green'}">
						<el-table-column prop="sim" label="SIM卡号" align="center" />
						<el-table-column prop="bh" label="设备编号" align="center" />
						<el-table-column prop="gsmc" label="企业名称" align="center" />
						<el-table-column prop="money" label="缴费金额" align="center" />
						<el-table-column prop="czsj" label="操作时间" align="center" />
						<el-table-column prop="czr" label="操作人" align="center" />
					</el-table>
					<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'first',
				msg:'',
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				sim_msg:{
					ICCID:'89860412101990362779',
					status:'正常',
					tcnll:'30',
					syll:'0.00',
					sydx:'0条（剩余10条）',
					gprs:'',
					off_on:'开机'
				},
				tableData: [
					{
						sim:'14401127512575',
						bh:'QHW001G210290201',
						gsmc:'潜合自动化',
						money:'30',
						czsj:'2020-06-15 08:26:35',
						czr:'admin'
					},
					{
						sim:'14401127512575',
						bh:'QHW001G210290201',
						gsmc:'潜合自动化',
						money:'30',
						czsj:'2019-06-15 08:26:35',
						czr:'admin'
					}
				],
			}
		},
		created: function() {
			this.msg = this.$route.query.key
			this.total = this.tableData.length
		},
		methods: {
			handleClick(tab, event) {

			}
		}
	};
</script>

<style scoped="scoped">
	.label{
		width: 6.875rem;
		text-align: center;
		background-color: gainsboro;
	}
	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}
</style>
