<template>
  <div class="titles">
    <div class="screenD">
      <div class="screen">
          公司名称/账号：<el-input v-model="qhkeyword" placeholder="" class="select" size='mini'/>
          权限：<el-select v-model="qx_value" placeholder="请选择"  size='mini' class="select">
                 <el-option v-for="item in qx_list" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
     </div>
      <div style="display: flex;">
         <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round>搜索</el-button>
        <el-button class="btn" type="primary" icon="el-icon-edit" size="mini" @click="tjdialog = true" round>添加信息</el-button>
      </div>
    </div>
    <div class="container_table">
			<div class="table_headr">用户列表</div>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        stripe
        style="width: 99%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size='mini'
      >
        <el-table-column prop="zh" label="账号" align="center" width="140"  fixed/>
        <el-table-column prop="gsmc" label="公司名称" align="center" width="120"/>
        <el-table-column prop="qx" label="权限" align="center" width="120" />
        <el-table-column prop="zhdlsj" label="最后登录时间" align="center" width="170" />
        <el-table-column prop="qy" label="是否启用" align="center">
          <template slot-scope="scope" width="100">
            <el-tag :type="scope.row.qy === '启用' ? 'primary' : 'danger'" disable-transitions size="mini">{{ scope.row.qy }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限设置" align="center" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="fenpei(scope.$index, scope.row)" round plain>分配权限</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="czmm(scope.$index, scope.row)" round plain>重置密码</el-button>
            <el-button type="warning" size="mini" @click="xiugai(scope.$index, scope.row)" round plain>修改</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)" round plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        layout="total,prev, pager, next"
        :total="total"
        background
        @current-change="current_change"
      />
      <!-- 分配权限 -->
      <el-dialog title="分配权限" :visible.sync="fpqxdialog" width="30%">
        <div>
          <div style="margin-bottom: 0.625rem;">
            <el-radio-group v-model="radio">
              <div style="padding: 0.5rem 0.5rem;">
                <el-radio :label="3">超级管理员</el-radio>
              </div>
              <div style="padding: 0.5rem 0.5rem;">
                <el-radio :label="6">系统管理员</el-radio>
              </div>
              <div style="padding: 0.5rem 0.5rem;">
                <el-radio :label="9">企业管理员</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="fpqxdialog = false" size='mini'>取 消</el-button>
          <el-button type="primary" @click="fpqxdialog = false" size='mini'>确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限 -->
      <!-- 重置密码 -->
      <el-dialog title="重置密码" :visible.sync="czmmdialog" width="30%">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="登录账号" prop="age">
            {{ zh }}
          </el-form-item>
          <el-form-item label="密码" prop="pass" size='mini'>
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" size='mini'/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" size='mini'>
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" size='mini'/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="czmmdialog = false" size='mini'>取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" size='mini'>确 定</el-button>
        </span>
      </el-dialog>
      <!-- 重置密码 -->
      <!-- 修改信息 -->
      <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%">
        <el-form ref="xgruleForm" :model="xgruleForm" status-icon :rules="xgrules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="登录账号" prop="zh">
            {{ zh }}
          </el-form-item>
          <el-form-item label="公司名称" prop="gsmc">
            {{ company }}
          </el-form-item>
          <el-form-item label="权限" prop="qx" size='mini'>
            <el-select v-model="xgruleForm.qx" placeholder="请选择" size='mini'>
              <el-option label="超级管理员" value="super" />
              <el-option label="系统管理员" value="admin" />
              <el-option label="企业管理员" value="company" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone" size='mini'>
            <el-input v-model="xgruleForm.phone"  size='mini'/>
          </el-form-item>
          <el-form-item label="是否启用" prop="qy">
            <el-switch v-model="xgruleForm.qy" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size='mini'>取 消</el-button>
          <el-button type="primary" @click="xgsubmitForm('xgruleForm')" size='mini'>确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改信息 -->
      <!-- 添加信息 -->
      <el-dialog title="添加信息" :visible.sync="tjdialog" width="30%">
        <el-form ref="tjruleForm" :model="tjruleForm" status-icon :rules="tjrules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="登录账号" prop="zh" size='mini'>
            <el-input v-model="tjruleForm.zh" />
          </el-form-item>
          <el-form-item label="公司名称" prop="gsmc" size='mini'>
            <el-input v-model="tjruleForm.gsmc" />
          </el-form-item>
          <el-form-item label="权限" prop="qx" size='mini'>
            <el-select v-model="tjruleForm.qx" placeholder="请选择" size='mini'>
              <el-option label="超级管理员" value="super" />
              <el-option label="系统管理员" value="admin" />
              <el-option label="企业管理员" value="company" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone" size='mini'>
            <el-input v-model="tjruleForm.phone" />
          </el-form-item>
          <el-form-item label="是否启用" prop="qy" size='mini'>
            <el-switch v-model="tjruleForm.qy" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tjdialog = false" size='mini'>取 消</el-button>
          <el-button type="primary" @click="tjsubmitForm('tjruleForm')" size='mini'>确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加信息 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      radio: 3,
      fpqxdialog: false,
      czmmdialog: false,
      dialogVisible: false,
      tjdialog: false,
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [{
        zh: 'qhsuperadmin',
        gsmc: '潜合自动化',
        qx: '超级管理员',
        zhdlsj: '2020-04-19 09:25:45',
        qy: '启用'
      },
      {
        zh: 'admin',
        gsmc: '宝鸡石化',
        qx: '系统管理员',
        zhdlsj: '2020-04-19 09:25:45',
        qy: '启用'
      },
      {
        zh: 'lingxian',
        gsmc: '山东领先',
        qx: '企业管理员',
        zhdlsj: '2020-04-19 09:25:45',
        qy: '启用'
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
      qx_list: [{
        value: '选项0',
        label: '全部'
      }, {
        value: '选项1',
        label: '系统管理员'
      }, {
        value: '选项2',
        label: '企业管理员'
      }],
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
      company: '',
      qx_value: '',
      status_value: '',
      qhkeyword: '',
      bh: '',
      zh: '',
      qyvalue: '',
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      xgruleForm: {
        qx: '',
        phone: '',
        qy: true
      },
      xgrules: {
        qx: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          trigger: 'blur',
          validator: validatePhone
        }]
      },
      tjruleForm: {
        zh: '',
        gsmc: '',
        qx: '',
        phone: '',
        qy: true
      },
      tjrules: {
        zh: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        }],
        gsmc: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        }],
        qx: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          trigger: 'blur',
          validator: validatePhone
        }]
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
  created: function() {
    this.total = this.tableData.length
  },
  methods: {
    handleDelete(index, row) {
			        this.tableData.splice(index, 1)
			      },
    czmm(index, row) {
      this.czmmdialog = true
      this.zh = row.zh
    },
    fenpei(index, row) {
      this.fpqxdialog = true
    },
    xiugai(index, row) {
      this.dialogVisible = true
      this.zh = row.zh
      this.company = row.gsmc
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    xgsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tjsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped="scoped">
  .table_headr{
    width: 99%;
  }
  .screenD{
    display: flex;
    align-items: center;
    width: 99%;

  }
	.screen {
		font-size: 0.875rem;
    width: 98%;
    margin-right: 1%;
    margin-top: -0.8%;
	}

	.select {
		width: 20%;
    margin-right: 1%;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}

	.titles {
		width: 98%;
		margin-left: 2%;
		height: 100%;
		margin-bottom: 1.25rem;
		font-size: 0.875rem;
    color: gray;

	}

	.btn {
		margin-left: 0.5rem;
		margin-bottom: 0.625rem;
	}

	.container_table {
		clear: both;
	}
  .demo-ruleForm{
    color: gray;
  }

	@media screen and (max-width: 1024px) {
    .titles {
    	width: 98%;
    	margin-left: 2%;
    	height: 100%;
    	margin-bottom: 1.25rem;
    	font-size: 0.875rem;
      color: gray;
      margin-top: -2.5%;
    }
    .screen{

    }
		.titles {
			font-size: 0.875rem;
		}

		.selects {
			width: 5rem;
		}

		.select {
			width: 8rem;
		}

		.btn {
			margin-top: 0.625rem;
		}
	}
</style>
