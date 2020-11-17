<template>
	<div style="width: 95%;margin-left: 2.5%;">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="基础信息" name="first">
				<div class="msg_con">
					<div style="display: flex;width: 50%;"></div>
					<div class="bigtitle" style="text-align: center;">设备信息</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div style="display: flex;width: 50%;">
							<div class="label">企业：</div>
							<div style="margin-left: 0.9375rem;">潜合自动化</div>
						</div>
						<div style="display: flex;width: 50%;">
							<div class="label">设备编号：</div>
							<div style="margin-left: 0.9375rem;">QHW001G210290201</div>
						</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div style="display: flex;width: 50%;">
							<div class="label">内部编号：</div>
							<div style="margin-left: 0.9375rem;">qh001</div>
						</div>
						<div style="display: flex;width: 50%;">
							<div class="label">SIM卡号：</div>
							<div style="margin-left: 0.9375rem;">14445415215<span style="color: dodgerblue;">正常</span></div>
						</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div style="display: flex;width: 50%;">
							<div class="label">负责人：</div>
							<div style="margin-left: 0.9375rem;">杨总</div>
						</div>
						<div style="display: flex;width: 50%;">
							<div class="label">联系电话：</div>
							<div style="margin-left: 0.9375rem;">13800000000</div>
						</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div style="display: flex;width: 50%;">
							<div class="label">设备种类：</div>
							<div style="margin-left: 0.9375rem;">YLY1</div>
						</div>
						<div style="display: flex;width: 50%;">
							<div class="label">设备型号：</div>
							<div style="margin-left: 0.9375rem;">1型</div>
						</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div style="display: flex;width: 50%;">
							<div class="label">安装日期：</div>
							<div style="margin-left: 0.9375rem;">2020-05-07</div>
						</div>
						<div style="display: flex;width: 50%;">
							<div class="label">到期日期：</div>
							<div style="margin-left: 0.9375rem;">2021-05-07</div>
						</div>
					</div>
					<div style="display: flex;height: 3.125rem;line-height: 3.125rem;border: 0.0625rem solid gainsboro;">
						<div style="display: flex;width: 50%;">
							<div class="label">当前地址：</div>
							<div style="margin-left: 0.9375rem;">新乡火炬园</div>
						</div>
						<div style="display: flex;width: 50%;">
							<div class="label">通讯时间：</div>
							<div style="margin-left: 0.9375rem;">2021-05-07 06:05:45</div>
						</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="配置管理" name="second">
				<div class="table_headr">列表</div>
				<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
				 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}">
					<el-table-column prop="czr" label="迁移日期" align="center" />
					<el-table-column prop="cznr" label="迁移类型" align="center" />
					<el-table-column prop="czsj" label="迁移前地址" align="center" />
					<el-table-column prop="czsj" label="迁移后地址" align="center" />
					<el-table-column prop="czsj" label="迁移人" align="center" />
				</el-table>
				<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
			</el-tab-pane>
			<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'first',
				timevalue: '',
				czzh: '',
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				tableData: [{
						czr: 'superadmin',
						cznr: '设备需要缴费',
						czsj: '2020-04-19 09:36:25'
					},
					{
						czr: 'superadmin',
						cznr: '设备需要缴费',
						czsj: '2020-04-19 09:34:25'
					}
				]
			};
		},
		created: function() {
			this.total = this.tableData.length
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage
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
	.msg_con{
		width: 60%;
		margin-left: 15%;
	}
	.cp_msg{
		width: 70%;
		margin-left: 15%;
		margin-top: 1.5%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		height: 28.125rem;
	}
	@media screen and (max-width: 1024px) {
		.msg_con{
			width: 100%;
			margin-left: 0;
		}
		.cp_msg{
			width: 120%;
			margin-left: 0;
		}
	}
</style>
