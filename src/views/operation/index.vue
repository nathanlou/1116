<template>
	<div class="titles">
		<div class="screen">
			关键字：
			<el-input v-model="qhkeyword" placeholder="编号、内部编号" class="select"  size='mini' />
			类型：<el-select v-model="style_value" placeholder="请选择" class="lxselect" size='mini'>
				<el-option v-for="item in style_list" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			操作账号：
			<el-input v-model="czzh" placeholder="" class="select" size='mini' />
			日期：
			<el-date-picker v-model="timevalue" class="datatime" type="daterange" range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期"  size='mini'/>

			<span style="float: right;margin-right: 2%;">
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round>搜索</el-button>
				<el-button class="btn" type="danger" icon="el-icon-delete" size="mini" @click="deletes()" round>批量删除</el-button>
			</span>
		</div>
		<div class="container_table">
			<div class="table_headr">操作日志</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 99%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}" size='mini' >
				<el-table-column type="selection" align="center" />
				<el-table-column prop="bh" sortable label="设备编号" align="center" width="170" />
				<el-table-column prop="nbbh" sortable label="内部编号" align="center" />
				<el-table-column prop="czr" label="操作人" align="center" />
				<el-table-column prop="cznr" label="操作内容" align="center" />
				<el-table-column prop="czsj" label="操作时间" align="center" width="150" />
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
						bh: 'QHW001G210290201',
						nbbh: 'qh001',
						czr: 'admin',
						cznr: '成功启动设备指令',
						czsj: '2020-04-19 09:36:25'
					},
					{
						bh: 'QHW001G210290201',
						nbbh: 'qh001',
						czr: 'admin',
						cznr: '成功停止设备指令',
						czsj: '2020-04-19 09:34:25'
					}
				],
				qycompany: [{
					value: '选项1',
					label: '潜合测试'
				}, {
					value: '选项2',
					label: '客户体验'
				}],
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
				style_list: [{
						value: '选项0',
						label: '全部'
					}, {
						value: '选项1',
						label: '启动'
					}, {
						value: '选项2',
						label: '停止'
					},
					{
						value: '选项3',
						label: '重启'
					}
				],
				status_list: [{
					value: '选项0',
					label: '全部'
				}, {
					value: '选项1',
					label: '在线'
				}, {
					value: '选项2',
					label: '离线'
				}],
				company_value: '',
				style_value: '',
				status_value: '',
				qhkeyword: '',
				bh: '',
				qyvalue: ''
			}
		},
		created: function() {
			this.total = this.tableData.length
		},
		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
			deletes() {
				this.selectionDatas = []
				var arr = []
				var data = this.$refs.multipleTable.selection
				if (data.length == 0) {
					this.$alert('您没有任何选择', '提示', {
						confirmButtonText: '确定',
						callback: action => {}
					})
				} else {
					data.forEach(function(item) {
						arr.push(item.bh)
					})
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				}

				// 				request.delete(apis.manageModel, arr)
				// 					.then(function(response) {
				// 						if (response.data.code == 200) {
				//
				// 						}
				// 					})
				// 					.catch(function(error) {
				// 						console.log(error);
				// 					});
			}
		}
	}
</script>

<style scoped="scoped">
  .titles {
  	width: 98%;
  	margin-left: 1.5%;
  	height: 100%;
  	margin-bottom: 1.25rem;
  	font-size: 0.875rem;
    color: gray;
    margin-top: -0.5%;
  }
	.screen {
		font-size: 0.875rem;
    color: gray;
	}

	.select {
		width: 10rem;
    margin-right: 1.5%;
	}

	.lxselect {
		width: 12%;
    margin-right: 1.5%;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}



	.btn {
		margin-left: 0.5rem;
		margin-bottom: 0.625rem;
	}

	.container_table {
		clear: both;

	}

	.datatime {
		width: 18.75rem;
	}
.table_headr{
    height: 2rem;
    width: 99%;
    line-height: 2rem;
    color: white;
    background-color: #409EFF ;
  }
	@media screen and (max-width: 1024px) {
		.titles {
			width: 98%;
			margin-left: 1.5%;
			height: 100%;
			margin-bottom: 1.25rem;
			font-size: 0.875rem;
			color: gray;
      margin-top: -1.8%;
		}

		.select {
			width: 15%;
       margin-right: 1.5%;
		}
    .datatime {
    	width: 23%
    }

		.btn {
			margin-top: 0.625rem;
		}
    .table_headr{
        height: 2rem;
         width: 99%;
        line-height: 2rem;
        color: white;
        background-color: #409EFF ;
      }
	}
</style>
