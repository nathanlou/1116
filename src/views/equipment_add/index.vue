<template>
	<div class="overview_container ">
		<h2 style="text-align: center;center;margin-left: -8%; margin-bottom: 5%;">添加设备</h2>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<div style="display: flex;" size="mini">
				<el-form-item label="企业" prop="companyId" size="mini" style='width: 40%;margin-right: 8%;'>
					<el-select v-model="ruleForm.companyId" placeholder="请选择" style="width: 100%;" @change="selectChanged(item)">
						<el-option v-for="(item,index) in companyName" :key='index' :label="item.companyName" :value="item.companyId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="设备编号" prop="bh" size="mini" style='width: 40%;margin-right: 8%;'>

					<el-input v-model="ruleForm.bh"></el-input>

				</el-form-item>
			</div>
			<div style="display: flex;">
				<el-form-item label="内部编号" prop="nbbh" style='width: 40%;margin-right: 8%;' size="mini">

					<el-input v-model="ruleForm.nbbh"></el-input>

				</el-form-item>
				<el-form-item label="SIM卡号" prop="sim" style='width: 40%;' size="mini">
					<el-input v-model="ruleForm.sim"></el-input>
				</el-form-item>
			</div>
			<div style="display: flex;">
				<el-form-item label="设备种类" prop="sbzl" style='width: 40%;margin-right: 8%;' size="mini">
					<el-select v-model="ruleForm.sbzl" placeholder="请选择" style="width: 100%;">
						<el-option label="YLY1" value="yly1"></el-option>
						<el-option label="云智能控制仪" value="yun"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="设备型号" prop="sbxh" style='width: 40%;' size="mini">
					<el-select v-model="ruleForm.sbxh" placeholder="请选择" style="width: 100%;">
						<el-option label="1型" value="1"></el-option>
						<el-option label="2型" value="2"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div style="display: flex;">
				<el-form-item label="工地负责人" prop="gdfzr" style='width: 40%;margin-right: 8%;' size="mini">
					<el-input v-model="ruleForm.gdfzr"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="phone" style='width: 40%;' size="mini">
					<el-input v-model="ruleForm.phone"></el-input>
				</el-form-item>
			</div>
			<div style="display: flex;">
				<el-form-item label="安装日期" required style='width: 40%;margin-right: 8%;' size="mini">
					<el-form-item prop="azrq" size="mini">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.azrq" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form-item>
				<el-form-item label="缴费日期" required style='width: 40%;' size="mini">
					<el-form-item prop="jfrq" size="mini">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.jfrq" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form-item>
			</div>
			<div style="display: flex; margin-top: -1rem;">
				<el-form-item label="当前地址" prop="dqdz" style='width: 40%;margin-right: 8%;' size="mini">
					<el-input v-model="ruleForm.dqdz"></el-input>
				</el-form-item>
				<el-form-item label="生产厂家" prop="sccj" style='width: 40%;' size="mini">
					<el-input v-model="ruleForm.sccj"></el-input>
				</el-form-item>
			</div>
			<div style="display: flex;">
				<el-form-item label="工地名称" prop="gdmc" style='width: 40%;margin-right: 8%;' size="mini">
					<el-input v-model="ruleForm.gdmc"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="bz" style='width: 40%;' size="mini">
					<el-input></el-input>
				</el-form-item>
			</div>
			<el-form-item style="text-align: center;margin-left: -10%;margin-top: 4%;">
				<el-button type="primary" @click="submitForm('ruleForm')" size="mini" round>立即添加</el-button>
				<el-button type="success" @click="resetForm('ruleForm')" size="mini" round>重置信息</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		company_listData,
		equipment_add
	} from '@/api/getlist'
	export default {
		data() {
			var cart = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('sim卡号不能为空'));
				}
				setTimeout(() => {
					if (Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if (value.length != 13) {
							callback(new Error('必须13位'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			// 此处自定义校验手机号码js逻辑
			var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
			var validatePhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('号码不能为空!!'))
				}
				setTimeout(() => {
					if (!phoneReg.test(value)) {
						callback(new Error('格式有误'))
					} else {
						callback()
					}
				}, 1000)
			}
			return {
				companyName: '',
				query: {
					access_token: localStorage.getItem('accessToken'),
					action: 'save',
					id: '',
					companyId: '',
					bh: '',
					companyBh: 100,
					sim: 111111,
					gdmc: 11111,
					gdfzr: '',
					gdfzrsj: '',
					scqy: '',
					kzqScqy: '',
					sbxh: '',
					sblxId: '',
					yxrq: '',
					dqdz: '',
					azrq: ''
				},
				ruleForm: {
					access_token: localStorage.getItem('accessToken'),
					action: 'save',
					id: '',
					companyId: '',
					bh: '',
					nbbh: '',
					sim: '',
					sbzl: '',
					sbxh: '',
					gdfzr: '',
					phone: '',
					azrq: '',
					jfrq: '',
					dqdz: '',
					sccj: '',
					gdmc: '',
					bz: '',
				},
				rules: {
					bh: [{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					nbbh: [{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					gdfzr: [{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						trigger: 'blur',
						validator: validatePhone,
					}],
					sim: [{
						required: true,
						trigger: 'blur',
						validator: cart
					}],
					companyId: [{
						required: true,
						message: '该项为必填项',
						trigger: 'change'
					}],
					sbzl: [{
						required: true,
						message: '该项为必填项',
						trigger: 'change'
					}],
					sbxh: [{
						required: true,
						message: '该项为必填项',
						trigger: 'change'
					}],
					azrq: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					jfrq: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],

				}
			};
		},
		created() {
			let that = this
			var query = {
				access_token: localStorage.getItem('accessToken'),
				start: 0,
				length: '2000',
				queryName: ''
			}
			company_listData(query).then(res => {
				console.log(res)
				this.companyName = res.data
			})
		},
		methods: {
			selectChanged(value) {
				console.log(value)
				// this.ruleForm.companyId = value
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let that = this
						// equipment_add(query ).then(res =>{
						// 	console.log(res)
						// })
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
	.overview_container {
		width: 90%;
		margin-left: 4%;
		margin-top: -2%;
		margin-right: 4%;
		color: gray;

	}
</style>
