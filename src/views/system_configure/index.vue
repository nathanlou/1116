<template>
	<div class="titles">
		<div class="container_table">
			<div class="table_headr">系统配置</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}" size='mini'>
				<el-table-column prop="name" label="属性名" align="center" />
				<el-table-column prop="style" label="类型" align="center" />
				<el-table-column prop="value" label="属性值" align="center" />
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="xiugai(scope.$index, scope.row)" round plain>修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
			<!-- socket -->
			<el-dialog title="修改系统参数" :visible.sync="czmmdialog" width="30%">
				<el-form ref="ruleForm"  status-icon  label-width="80px" class="demo-ruleForm">
					<el-form-item label="属性名" prop="age" size='mini'>
						{{ name }}
					</el-form-item>
					<el-form-item label="类型" prop="pass" size='mini'>
						{{style}}
					</el-form-item>
					<el-form-item label="属性值" prop="checkPass" size='mini'>
						<el-switch v-if="this.index==2" v-model="value"></el-switch>
						<el-input v-else='' v-model="value" autocomplete="off" />
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="czmmdialog = false" size='mini'>取 消</el-button>
					<el-button type="primary" @click="submitForm(index)" size='mini'>确 定</el-button>
				</span>
			</el-dialog>
			<!-- socket -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				czmmdialog: false,
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				tableData: [
					{
						name:'socketip',
						value:'127.0.0.1',
						style:'字符串'
					},
					{
						name:'socket端口',
						value:'9999',
						style:'数字'
					},
					{
						name:'socket开关',
						value:'true',
						style:'开关'
					},
					{
						name:'系统名称',
						value:'智慧除尘',
						style:'字符串'
					}
				],
				value: '',
				style: '',
				name: '',
				index:''
			}
		},
		created: function() {
			this.total = this.tableData.length
			if(this.tableData[2].value == 'true'){
				this.tableData[2].value = '开启'
			}else{
				this.tableData[2].value = '关闭'
			}
		},
		methods: {
			xiugai(index, row) {
				this.czmmdialog = true
				this.name = row.name
				this.style = row.style
				this.value = row.value
				this.index = index
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
			submitForm(index) {
				console.log(index)
			}
		}
	}
</script>

<style scoped="scoped">
	.screen {
		font-size: 0.875rem;
	}

	.select {
		width: 10rem;
	}

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

		.selects {
			width: 11rem;
		}

		.select {
			width: 13rem;
		}

		.btn {
			margin-top: 0.625rem;
		}
	}
</style>
