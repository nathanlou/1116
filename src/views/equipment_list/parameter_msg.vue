<template>
	<div class="titles">
		<div class="container_table">
			<div class="table_headr">参数设置</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}">
			 <el-table-column type="selection" align="center" />
				<el-table-column prop="csmc"  label="参数名称" align="center" width="170" />
				<el-table-column prop="csdb" label="参数代表" align="center" />
				<el-table-column prop="cssz" label="参数设置" align="center">
					<template slot-scope="scope">
							<el-input v-model="scope.row.cssz"></el-input>
						</template>
					</el-table-column>
				<el-table-column prop="csfw" label="参数范围" align="center" />
				<el-table-column prop="dw" label="单位" align="center" />
			</el-table>
			<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
			<div style="text-align: center;margin-top: 1%;">
				<el-button type="success" @click='dialogVisible = true'>确认修改</el-button>
			</div>
			<el-dialog title="修改" :visible.sync="dialogVisible" width="35%">
				<div>
					<div style="margin-bottom: 0.625rem;">设备编号：</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="xiugai()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				tableData: [
					{
						csmc:'脉冲宽度',
						csdb:'P-01',
						cssz:'1',
						csfw:'1-9999',
						dw:'0.01秒'
					},
					{
						csmc:'脉冲间隔',
						csdb:'P-02',
						cssz:'1',
						csfw:'1-9999',
						dw:'秒'
					}
				],
				qyvalue: ''
			}
		},
		created: function() {
			
		},
		methods: {
			xiugai(index, row) {
				var int = this.tableData;
				for (var i=0; i<int.length;i++) {
					console.log(int[i])
				}
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
		}
	}
</script>

<style scoped="scoped">
	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}

	.titles {
		width: 95%;
		margin-left: 2.5%;
		height: 100%;
		margin-bottom: 1.25rem;
		font-size: 0.875rem;
	}

	.btn {
		margin-left: 0.5rem;
		margin-bottom: 0.625rem;
	}

	.container_table {
		clear: both;
	}

	@media screen and (max-width: 1024px) {
		.titles {
			font-size: 0.875rem;
		}
	}
</style>
