<template>
	<div class="titles">
		<div class="screen">
      <span>
        企业：<el-select v-model="company_value" placeholder="请选择" class="select" size='mini'>
          <el-option v-for="item in company_list" :key="item.value" :label="item.label" :value="item.value" size='mini' />
        </el-select>
      </span>
       <span>
			关键字：
			<el-input v-model="qhkeyword" placeholder="编号、内部编号" class="select" size='mini'/>
			类型：<el-select v-model="style_value" placeholder="请选择" class="select" size='mini'>
				<el-option v-for="item in style_list" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
      </span>
       <span>
			SIM状态：<el-select v-model="status_value" placeholder="请选择" class="select" size='mini'>
				<el-option v-for="item in status_list" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
      </span>
      <span>
			提醒类别：<el-select v-model="remind" placeholder="请选择" class="select" size='mini'>
				<el-option v-for="item in remind_list" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
      </span>

			<span style="float: right;">
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round>搜索</el-button>
				<el-button class="btn" type="success" icon="el-icon-edit" size="mini" @click='reminds()' round >批量提醒</el-button>
				<el-button class="btn" type="danger" icon="el-icon-edit" size="mini"  @click='renews()' round >批量续费</el-button>
			</span>
		</div>
		<div class="container_table">
			<div class="table_headr">SIM卡管理列表</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}" size='mini' >
				<el-table-column type="selection" align="center"  fixed />
				<el-table-column prop="sim" label="SIM卡号" align="center" width="150" fixed>
					<template slot-scope="scope">
						<el-button type="text" @click='sim_msg(scope.$index, scope.row)'>{{scope.row.sim}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="company" sortable label="企业名称" align="center" width="130" />
				<el-table-column prop="bh" sortable label="设备编号" align="center" width="170" />
				<el-table-column prop="nbbh" sortable label="内部编号" align="center" width="130" />
				<el-table-column prop="simzt" label="SIM状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.simzt === '正常' ? 'primary' : 'danger'" disable-transitions size='mini'>{{ scope.row.simzt }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="sbzt" label="设备状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.sbzt === '在线' ? 'primary' : 'danger'" disable-transitions size='mini'>{{ scope.row.sbzt }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="jhrq" sortable label="激活日期" align="center" width="130" />
				<el-table-column prop="dqrq" sortable label="到期日期" align="center" width="130" />
				<el-table-column label="操作" width="250" align="center" fixed='right'>
					<template slot-scope="scope">
						<el-button class="btn" type="success" size="mini"  @click='remindsim(scope.$index, scope.row)' round plain>提醒</el-button>
						<el-button class="btn" type="danger" size="mini" @click='renew(scope.$index, scope.row)' round plain>续费</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
		</div>
		<!-- 批量续费 -->
		<el-dialog title="批量续费" :visible.sync="dialogVisible" width="40%">
			<el-form ref="form" :model="form" label-width="90px">
			  <el-form-item label="选择的条数">
			    {{remind_lenght}}条
			  </el-form-item>
			  <el-form-item label="续费月份">
			      <el-select v-model="form.money" placeholder="请选择">
			        <el-option label="一个月" value="1"></el-option>
			        <el-option label="二个月" value="2"></el-option>
					<el-option label="三个月" value="3"></el-option>
					<el-option label="四个月" value="4"></el-option>
					<el-option label="五个月" value="5"></el-option>
					<el-option label="半年" value="6"></el-option>
					<el-option label="一年" value="12"></el-option>
			      </el-select>
			    </el-form-item>
			  <el-form-item label="支付方式">
					  <el-radio-group v-model="radio">
					      <el-radio :label="3">微信</el-radio>
					      <el-radio :label="6">支付宝</el-radio>
					      <el-radio :label="9">现金</el-radio>
					  </el-radio-group>
			    </el-form-item>
				<el-form-item label="续费人">

				</el-form-item>
				<el-form-item label="时间">
				  {{time}}
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 批量续费 -->
		<!-- 续费 -->
		<el-dialog title="续费" :visible.sync="xfdialog" width="40%">
			<el-form ref="form" :model="form" label-width="90px">
			  <el-form-item label="企业名称" style='margin-top: -2rem;'>
			    {{row.company}}
			  </el-form-item>
			  <el-form-item label="设备编号" >
			    {{row.bh}}
			  </el-form-item>
			  <el-form-item label="SIM卡号" >
			    {{row.sim}}
			  </el-form-item>
			  <el-form-item label="激活日期" >
			    {{row.jhrq}}
			  </el-form-item>
			  <el-form-item label="到期日期" >
			    {{row.dqrq}}
			  </el-form-item>
			  <el-form-item label="续费月份" size='mini' >
			      <el-select v-model="form.money" placeholder="请选择">
			        <el-option label="一个月" value="1"></el-option>
			        <el-option label="二个月" value="2"></el-option>
					<el-option label="三个月" value="3"></el-option>
					<el-option label="四个月" value="4"></el-option>
					<el-option label="五个月" value="5"></el-option>
					<el-option label="半年" value="6"></el-option>
					<el-option label="一年" value="12"></el-option>
			      </el-select>
			    </el-form-item>
			  <el-form-item label="支付方式">
					  <el-radio-group v-model="radio">
					      <el-radio :label="3">微信</el-radio>
					      <el-radio :label="6">支付宝</el-radio>
					      <el-radio :label="9">现金</el-radio>
					  </el-radio-group>
			    </el-form-item>
				<el-form-item label="续费人">
              <el-select v-model="form.money" placeholder="请选择" size='mini'>
                <el-option label="一月" value="1"></el-option>
                <el-option label="二月" value="2"></el-option>
              </el-select>
				</el-form-item>
				<el-form-item label="时间">
				  {{time}}
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="xfdialog = false" size='mini'>取 消</el-button>
				<el-button type="primary" @click="xfdialog = false" size='mini'>确 定</el-button>
			</span>
		</el-dialog>
		<!-- 续费 -->
		<!-- 提醒 -->
		<el-dialog title="提醒" :visible.sync="txdialog" width="40%">
			<el-form ref="form" :model="form" label-width="90px">
			  <el-form-item label="企业名称" size='mini'>
			    {{row.company}}
			  </el-form-item>
			  <el-form-item label="设备编号">
			    {{row.bh}}
			  </el-form-item>
			  <el-form-item label="内部编号">
			    {{row.nbbh}}
			  </el-form-item>
			  <el-form-item label="SIM卡号">
			    {{row.sim}}
			  </el-form-item>
				<el-form-item label="提示信息">
				  您的SIM卡,到期时间{{row.dqrq}},请及时续费。
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="txdialog = false" size='mini'>发送通知</el-button>
			</span>
		</el-dialog>
		<!-- 提醒 -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					resource:"",
					money:''
				},
				time:"",
				radio:3,
				xfdialog:false,
				txdialog:false,
				dialogVisible: false,
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				remind: '',
				remind_lenght: '',
				tableData: [{
						sim: '14401127512575',
						company: "潜合自动化",
						bh: 'QHW001G210290201',
						nbbh: 'qh001',
						simzt: '停机',
						sbzt: '离线',
						jhrq: '2019-09-15',
						dqrq: '2020-09-15(30天)',
					},
					{
						sim: '14401127512575',
						company: "山东领先",
						bh: 'QHW001G210290201',
						nbbh: 'qh001',
						simzt: '正常',
						sbzt: '在线',
						jhrq: '2019-11-15',
						dqrq: '2020-11-15(10天)',
					}
				],
				remind_list: [{
					value: '选项0',
					label: '全部'
				}, {
					value: '选项1',
					label: '已过期'
				}, {
					value: '选项2',
					label: '临近过期'
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
					label: 'YLY1'
				}, {
					value: '选项2',
					label: '智能除尘'
				}],
				status_list: [{
					value: '选项0',
					label: '全部'
				}, {
					value: '选项1',
					label: '正常'
				}, {
					value: '选项2',
					label: '停机'
				}],
				company_value: '',
				style_value: '',
				status_value: '',
				qhkeyword: '',
				row:'',
			}
		},
		created: function() {
			this.total = this.tableData.length
			var myDate = new Date();
			this.time = myDate.toLocaleString()
		},
		methods: {
			sim_msg(index,item){
				this.$router.push({path:'sim_msg',query: {
                key:item
            }})
			},
			renew(index,row){
				this.xfdialog = true
				this.row = row
			},
			remindsim(index,row){
				this.txdialog = true
				this.row = row
			},
			reminds(){
				this.selectionDatas = []
				var arr = []
				var data = this.$refs.multipleTable.selection
				if (data.length == 0) {
					this.$alert('您没有任何选择', '提示', {
						confirmButtonText: '确定',
						callback: action => {}
					})
				} else {
					// this.dialogVisible = true
					this.remind_lenght = data.length;
					data.forEach(function(item) {
						arr.push(item)
					})
				}
			},
			renews() {
				this.selectionDatas = []
				var arr = []
				var data = this.$refs.multipleTable.selection
				if (data.length == 0) {
					this.$alert('您没有任何选择', '提示', {
						confirmButtonText: '确定',
						callback: action => {}
					})
				} else {
					this.dialogVisible = true
					this.remind_lenght = data.length;
					// data.forEach(function(item) {
					// 	arr.push(item)
					// })
				}
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
		}
	}
</script>

<style scoped="scoped">
	.screen {
		font-size: 0.875rem;
    width: 98%;
    color: gray;
	}

	.select {
		width: 10%;
    margin-right: 1.5%;

	}
  .deviderR{
    margin-right:1.1 %;
  }

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}
  .el-form-item--mini .el-form-item__label{

  }
  .el-form-item__content{
    padding: 0;
    line-height: 28px;
  }
	.titles {
		width: 99%;
		margin-left: 2%;
    margin-right: 2%;
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
    width: 98%;
	}
  .el-form-item__label{
    color: gray;
    font-weight: 500;
  }

	@media screen and (max-width: 1024px) {
		.titles {
			font-size: 0.875rem;
      width: 99%;
      margin-left: 2%;
      margin-right: 2%;
		}

		.select {
			width: 11.05%;
      font-size: 0.7rem;
		}


		.btn {
			margin-top: 0.625rem;
		}
    .el-form-item__label{
      color: gray;
      font-weight: 500;
    }
	}
</style>
