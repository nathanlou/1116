<template>
	<div class="titles">
		<div class="screen">
      <div>
        账号/姓名：
        <el-input v-model="qhkeyword" placeholder="编号/内部编号" class="select" size='mini'/>

        日期：
        <el-date-picker v-model="timevalue" class="datatime" type="daterange" range-separator="至" start-placeholder="开始日期"
         end-placeholder="结束日期" size='mini' />

      </div>
      <div>
      <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round>搜索</el-button>
      </div>
		</div>
		<div class="container_table">
			<div class="table_headr">系统日志</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}"
       :header-cell-style="{background:'#FAFAFA',color:'green'}" size='mini'>
				<el-table-column prop="czzh" label="用户账号" align="center" />
				<el-table-column prop="cznr" label="操作内容" align="center" />
				<el-table-column prop="czip" label="操作IP" align="center" />
				<el-table-column prop="czsj" label="操作时间" align="center" />
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
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				tableData: [
					{
						czzh: 'admin(管理员)',
						czip: '127.0.0.1',
						cznr: '登陆系统(Mac OS X (iPhone)、Apple Mail、)',
						czsj: '2020-04-19 09:36:25'
					},
					{
						czzh: 'admin(管理员)',
						czip: '127.0.0.1',
						cznr: '查询统计分布',
						czsj: '2020-04-19 09:36:25'
					},
					{
						czzh: 'admin(管理员)',
						czip: '127.0.0.1',
						cznr: '登陆系统(Android 1.x、Chrome 8、83.0.4103.106)',
						czsj: '2020-04-19 09:36:25'
					},
					{
						czzh: 'admin(管理员)',
						czip: '127.0.0.1',
						cznr: '登陆系统(Mac OS X (iPhone)、Apple Mail、)',
						czsj: '2020-04-19 09:36:25'
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
			}
		}
	}
</script>

<style scoped="scoped">
  .titles {
  	width: 99%;
  	margin-left: 2%;
  	height: 100%;
  	margin-bottom: 1.25rem;
  	font-size: 0.875rem;
    color: gray;
  }
	.screen {
    width: 98%;
		font-size: 0.875rem;
    display: flex;
    align-items: center;
    margin-bottom: 1%;
    justify-content: space-between;
    color: gray;
	}

	.select {
		width: 10rem;
    margin-right: 2%;
	}
  .table_headr{

  }
	.lxselect {
		width: 6rem;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}
	.btn {


	}

	.container_table {
    width: 98%;
		clear: both;
	}

	.datatime {
		width: 40%;
	}

	@media screen and (max-width: 1024px) {
		.titles {
			font-size: 0.875rem;
      margin-top: -2%;
      color: gray;
		}

		.select {
			width: 10rem;
		}
		.datatime {
			width: 25%;


		}

    .btn {


    }
	}
</style>
