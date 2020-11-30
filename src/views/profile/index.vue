<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="账户信息" name="first">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="企业名称:">
            {{ form.deptName }}
          </el-form-item>
          <el-form-item label="名字:">
            {{ form.name }}
          </el-form-item>
          <el-form-item label="联系电话:">
            {{ form.iphone }}
          </el-form-item>
          <el-form-item label="创建时间:">
            {{ form.createTime }}
          </el-form-item>
          <el-form-item label="最近一次登录:">
            {{ form.lastLogin }}
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账户安全" name="second">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户账号" prop="age">
            {{ form.userName }}
          </el-form-item>
          <el-form-item label="旧密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
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
  getSessionUser,
  updatepassword
} from '@/api/globaldata'
export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      activeTab: 'activity',
      activeName: 'first',
      form: '',
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        },
        {
          min: 8,
          max: 16,
          message: '长度在 8 到 16 个字符',
          trigger: 'blur'
        }
        ],
        checkPass: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        },
        {
          min: 8,
          max: 16,
          message: '长度在 8 到 16 个字符',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      const query = {
        access_token: localStorage.getItem('accessToken')
      }
      getSessionUser(query).then(res => {
        this.form = res.data.user
      })
    },
    handleClick(tab, event) {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const query = {
            access_token: localStorage.getItem('accessToken'),
            oldPassword: this.ruleForm.pass,
            newPassword: this.ruleForm.checkPass
          }
          updatepassword(query).then(res => {
            if (res.status === 200) {
              this.loading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped="scoped">
	.el-input {
		width: 18.75rem;
	}
</style>
