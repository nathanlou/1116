<template>
	<div>

		<div class="searchD">
			<div>
				<span style="width:6rem;">选择企业：</span>
				<el-select v-model="enterpriseName" placeholder="请选择" class="searchD_enterName" size="small">
					<el-option v-for="item in optionsEnterPN" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>

			<div>
				<span style="width:6rem;margin-left: 0.6rem;">设备类型：</span>
				<el-select v-model="enterpriseType" placeholder="请选择" class="searchD_enterName" size="small">
					<el-option v-for="item in optionsEnterType" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div style="display: flex; align-items: center;">
				<span style="margin-left: 0.6rem;">关键字：</span>
				<el-input v-model="input" placeholder="设备编号 工地名称" style="width: 10rem;" size="small"></el-input>
			</div>
			<div style="display: flex;margin-left: 2rem;">
				<el-button type="primary" icon="el-icon-search" round  size='small'>搜索</el-button>
			</div>

		</div>
		<div class="tableD">
			<div class="table_headr">设备列表</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
      border :default-sort="{prop: 'date', order: 'descending'}" size='small'>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="企业名称">
								<span>{{ props.row.name }}</span>
							</el-form-item>
							<el-form-item label="设备编号">
								<span>{{ props.row.number }}</span>
							</el-form-item>
							<el-form-item label="设备地址">
								<span>{{ props.row.address }}</span>
							</el-form-item>
							<el-form-item label="设备识别号">
								<span>{{ props.row.idcode }}</span>
							</el-form-item>
							<el-form-item label="版本号">
								<span>{{ props.row.version }}</span>
							</el-form-item>

						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="企业名称" prop="name"  align="center">
				</el-table-column>
				<el-table-column align="center" label="设备识别号" prop="idcode">
				</el-table-column>
				<el-table-column align="center" class="pcvisible_eltable" label="设备编号" prop="number">
				</el-table-column>

				<el-table-column align="center" label="版本号" prop="version">
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" plain round size="mini" @click="updatedialogVisible=true">升级</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 升级管理对话框 -->
		<el-dialog title="升级提示" :visible.sync="updatedialogVisible" width="30%">
			<div style="padding: 0.5rem;">设备名称：A0001</div>
			<div style="padding: 0.5rem;"> 设备识别号：A0001</div>
			<div style="padding: 0.5rem;">版本号：A0001</div>
			<div style="padding: 0.5rem; display: flex; align-items: center;"><span>选择升级包：</span>
				<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
				 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>


				</el-upload>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="updatedialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="updatedialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

		<el-pagination class="fy" layout="total,prev, pager, next" :total="total" background @current-change="current_change" />

	</div>
</template>

<script>
	export default {
		data() {
			return {
				total: 1000, // 默认数据总数
				pagesize: 10, // 每页的数据条数
				currentPage: 1, // 默认开始页面
				istag: true,
				updatedialogVisible: false,
				optionsEnterPN: [{
					value: '潜合自动化',
					label: '潜合自动化'
				}, {
					value: '领先环保',
					label: '领先环保'
				}, {
					value: '山西日化',
					label: '山西日化'
				}, {
					value: '日新化工',
					label: '日新化工'
				}, {
					value: '鸿泰电器',
					label: '鸿泰电器'
				}],
				optionsEnterType: [{
					value: '云平台控制仪',
					label: '云平台控制仪'
				}, {
					value: '洗车机',
					label: '洗车机'
				}, {
					value: '砂石分离机',
					label: '砂石分离机'
				}],
				enterpriseName: '',

				enterpriseType: '',
				tableData: [{
					name: '河南潜合自动化',
					idcode: 'YH003',
					number: '0001',
					address: '新乡市高新区火炬园',
					type: "设备类型",

					version: '0001',

				}, {
					name: '河南潜合自动化',
					idcode: 'YH003',
					number: '0001',
					address: '新乡市高新区火炬园',
					type: "设备类型",
					version: '0001',

				}, {
					name: '河南潜合自动化',
					idcode: 'YH003',
					number: '0001',
					address: '新乡市高新区火炬园',
					type: "设备类型",
					version: '0001',

				}]
			}
		},
		created() {
			this.total = this.tableData.length
		},
		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage
			},
			addAccountInfo() {
				console.log(this.userInfo)
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		}


	}
</script>

<style>
	.searchD {
		margin-left: 1.5rem;
		margin-top: -0.8%;
		color: gray;
		display: flex;
		align-items: center;
	}

	.searchD_enterName {
		width: 7rem;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.tableD {
		margin: 1rem 1.5rem;
	}

	.pcvisible_eltable {
		display: none;
	}


	@media screen and (max-width: 1024px) {
		.pcvisible_eltable {
			display: none;
		}
	}
</style>
