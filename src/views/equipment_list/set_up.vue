<template>
	<div style="width: 95%;margin-left: 2.5%;margin-top: 2%;color: gray;">

		<div class="msg_con">
			<div style="display: flex;width: 100%;height: 1.5rem;font-weight: 700;justify-content: center;">设备信息</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;width: 50%;">
					<div class="label">企业：</div>
					<div style="margin-left: 0.9375rem;">{{msg.companyName}}</div>
				</div>
				<div style="display: flex;width: 50%;">
					<div class="label">设备编号：</div>
					<div style="margin-left: 0.9375rem;">{{msg.bh}}</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;width: 50%;">
					<div class="label">内部编号：</div>
					<div style="margin-left: 0.9375rem;">{{msg.companyBh}}</div>
				</div>
				<div style="display: flex;width: 50%;">
					<div class="label">SIM卡号：</div>
					<div style="margin-left: 0.9375rem;">{{msg.sim}}  <span style="color: dodgerblue;">  正常</span></div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;width: 50%;">
					<div class="label">负责人：</div>
					<div style="margin-left: 0.9375rem;">{{msg.gdfzr}}</div>
				</div>
				<div style="display: flex;width: 50%;">
					<div class="label">联系电话：</div>
					<div style="margin-left: 0.9375rem;">{{msg.gdfzrsj}}</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;width: 50%;">
					<div class="label">设备种类：</div>
					<div style="margin-left: 0.9375rem;">{{msg.sbxh}}</div>
				</div>
				<div style="display: flex;width: 50%;">
					<div class="label">设备型号：</div>
					<div style="margin-left: 0.9375rem;">{{msg.sblx}}</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;width: 50%;">
					<div class="label">安装日期：</div>
					<div style="margin-left: 0.9375rem;">{{msg.azrq}}</div>
				</div>
				<div style="display: flex;width: 50%;">
					<div class="label">到期日期：</div>
					<div style="margin-left: 0.9375rem;">{{msg.dqrq}}</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;width: 50%;">
					<div class="label">当前地址：</div>
					<div style="margin-left: 0.9375rem;">{{msg.dqdz}}</div>
				</div>
				<div style="display: flex;width: 50%;">
					<div class="label">通讯时间：</div>
					<div style="margin-left: 0.9375rem;">{{msg.lastDateStr}}</div>
				</div>
			</div>
		</div>
		<div class="msg_con" style="margin-top: 2%;">
			<div style="display: flex;width: 50%;"></div>
			<div class="bigtitle" style="text-align: center;">设备操作</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;">
					<div class="label">基本操作：</div>
					<div style="margin-left: 0.9375rem;">
						<!-- <el-button type="warning">控制设置</el-button> -->
						<el-button type="success" @click='transfer()' round plain size="mini">迁移设备</el-button>
						<el-button type="warning" @click='edit()' round plain size="mini">编辑设备</el-button>
						<el-button type="danger" @click='deletes()' round plain size="mini">删除设备</el-button>
					</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;">
					<div class="label">远程操作：</div>
					<div style="margin-left: 0.9375rem;">
						<el-button type="success" @click='on("kj")' round plain size="mini">远程开机</el-button>
						<el-button type="warning" @click='on("gj")' round plain size="mini">远程关机</el-button>
						<el-button type="danger" @click='on("cq")' round plain size="mini">重启设备</el-button>
					</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;">
					<div class="label">特殊设置：</div>
					<div style="margin-left: 0.9375rem;">
						<el-button type="success" @click='xtjg = true' round plain size="mini">心跳间隔</el-button>
						<el-button type="warning" @click='ipdz = true' round plain size="mini">IP地址</el-button>
					</div>
				</div>
			</div>
			<div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
				<div style="display: flex;">
					<div class="label">参数设置：</div>
					<div style="margin-left: 0.9375rem;">
						<el-button type="success" @click="parameters()" round plain size="mini">参数设置</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="container_table">
			<div class="table_headr">操作记录</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
			 style="width: 100%;font-size: 13px;color: gray;" :default-sort="{prop: 'date', order: 'descending'}" size='mini'>
				<el-table-column prop="czr" label="操作人" align="center" size='mini'/>
				<el-table-column prop="czlx" sortable label="操作类型" align="center" size='mini'/>
				<el-table-column prop="cznr" label="操作内容" align="center" size='mini'/>
				<el-table-column prop="czsj" label="操作时间" align="center" width="180" size='mini'/>
			</el-table>
			<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />
		</div>
		<!-- 迁移 -->
		<el-dialog title="迁移" :visible.sync="dialogVisible" width="55%">
			<div>
				<div style="margin-bottom: 0.625rem;">设备编号：{{ msg.bh }}</div>
				<div>
					迁移企业：<el-select v-model="qyvalue" placeholder="请选择">
						<el-option v-for="item in qycompany" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 迁移 -->
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
				<el-form  label-width="150px">
					<el-form-item label="功能">
					    心跳间隔设置,单位s 值范围(1~3600)
					  </el-form-item>
					  <el-form-item label="心跳间隔">
					      <el-input v-model="xtvalue" style="width: 60%;"></el-input>
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
				<el-form  label-width="150px">
					<el-form-item label="功能">
					    修改服务器IP地址指令;例如:10.78.183.12:9090
					  </el-form-item>
					  <el-form-item label="IP地址以及端口">
					      <el-input v-model="ipvalue" style="width: 60%;"></el-input>
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
	import {equipment_del,equipment_msg} from '@/api/getlist'
	import { getToken, setToken, removeToken } from '@/utils/auth'
	export default {
		data() {
			return {
				ipdz:false,
				xtjg:false,
				tx:false,
				msg: '',
				qyvalue: '',
				qycompany: [{
					value: '选项1',
					label: '潜合测试'
				}, {
					value: '选项2',
					label: '客户体验'
				}],
				dialogVisible: false,
				cs:'',
				xtvalue:'',
				ipvalue:'',
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				tableData: [{
						czr: 'admin',
						czlx:'远程操作',
						cznr: '成功启动设备指令',
						czsj: '2020-04-19 09:36:25'
					},
					{
							czr: 'admin',
							czlx:'基本操作',
							cznr: '迁移设备从潜合测试到客户',
							czsj: '2020-04-19 09:36:25'
						},

				],
			}
		},
		created: function() {
			// this.msg = this.$route.query.key
			this.equipment_msg()
		},
		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
			equipment_msg(){
				let query={
					access_token:localStorage.getItem('accessToken'),
					id:localStorage.getItem('id')
				}
				equipment_msg(query).then(res => {
					this.msg = res.data
				})
			},
			parameters(){
				this.$router.push({
					path: 'parameter_msg'
				})
			},
			edit(){
				this.$router.push({
					path: 'edit',
					query: {
						key: localStorage.getItem('id')
					}
				})
			},
			on(res){
				this.tx = true
				this.cs = res
			},
			txs(res){
				this.tx = false
			},
			transfer() {
				this.dialogVisible = true
			},
			xtclick(){
				this.xtjg = false
			},
			ipclick(){
				this.ipdz = false
			},
			deletes() {
				var mymessage = confirm("您确定删除该设备吗?");
				if (mymessage == true) {
					let query={
						access_token:localStorage.getItem('accessToken'),
						id:this.msg.id
					}
					equipment_del(query).then(res => {
						console.log(res)
						this.goback()
					})
					.catch(() => {
						this.goback()
					})
					// this.$message({
					// 	message: '删除成功',
					// 	type: 'warning'
					// });
				}
			},
			goback(){
				this.$router.go(-1);
			},
		}
	}
</script>

<style>
	.label {
		width: 6.875rem;
		text-align: center;
		background-color:  #E8F4FF;

	}
.table_headr{
    height: 2rem;
    line-height: 2rem;
    color: white;
    background-color: #409EFF ;
  }
	.msg_con {
		width: 80%;
		margin-left: 10%;
     font-size: 1.0rem;
	}
	.container_table{
		margin-top: 1%;
	}
	.fy{
		margin-top: 1%;
		margin-bottom: 1%;
		text-align: right;
	}

  @media screen and (max-width: 1024px) {
  	.msg_con{
  		width: 80%;
  		margin-left: 0;
      font-size: 0.9rem;
  	}

  }
</style>
