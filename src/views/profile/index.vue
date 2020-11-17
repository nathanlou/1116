<template>
	<div class="app-container">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="账户信息" name="first">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="企业名称">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
						<el-form-item label="所在地址">
							<el-input v-model="form.szdz"></el-input>
						</el-form-item>
						<el-form-item label="备注">
							<el-input v-model="form.bz"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">立即修改</el-button>
						</el-form-item>
					</el-form>
			</el-tab-pane>
			<el-tab-pane label="账户安全" name="second">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="用户账号" prop="age">
						{{user.name}}
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import UserCard from './components/UserCard'
	import Activity from './components/Activity'
	import Timeline from './components/Timeline'
	import Account from './components/Account'

	export default {
		name: 'Profile',
		components: {
			UserCard,
			Activity,
			Timeline,
			Account
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			}
			return {
				user: {},
				activeTab: 'activity',
				activeName: 'first',
				form: {
					name: '潜合自动化',
					phone: '13800000000',
					szdz: '新乡火炬园',
					bz: ''
				},
				ruleForm: {
					pass: '',
					checkPass: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		computed: {
			...mapGetters([
				'name',
				'avatar',
				'roles'
			])
		},
		created() {
			this.getUser()
		},
		methods: {
			getUser() {
				this.user = {
					name: this.name,
					role: this.roles.join(' | '),
					email: 'admin@test.com',
					avatar: this.avatar
				}
			},
			handleClick(tab, event) {},
			onSubmit() {},
			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            alert('!');
			          } else {
			            return false;
			          }
			        });
			      },
		}
	}
</script>
<style scoped="scoped">
	.el-input{
		width: 18.75rem;
	}
</style>