<template>
	<div class="titles">
		<div class="container_table">
			<div class="table_headr">列表</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="czr" label="通知人" align="center" />
				<el-table-column prop="cznr" label="通知内容" align="center" />
				<el-table-column prop="czsj" label="通知时间" align="center" />
			</el-table>
			<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		created: function() {
			this.total = this.tableData.length
		},
		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage
			}
		}
	}
</script>

<style scoped="scoped">
	.titles{
		width: 95%;
		margin-left: 2.5%;
	}
</style>
