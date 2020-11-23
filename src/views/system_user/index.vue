<template>
  <div class="titles">
    <div class="screenD">
      <div class="screen">
        部门名称：
        <el-input v-model="query.queryName" placeholder="" class="select" size="mini" />
      </div>
      <div style="display: flex;">
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round @click="getlist">搜索</el-button>
        <el-button class="btn" type="primary" icon="el-icon-edit" size="mini" round @click="tjdialog = true">添加信息</el-button>
      </div>
    </div>
    <div class="container_table">
      <div class="table_headr">用户列表</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 99%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size="mini"
      >
        <el-table-column prop="userName" label="账号" align="center" width="140" fixed />
        <el-table-column prop="name" label="姓名" align="center" width="120" />
        <el-table-column prop="roles" label="权限" align="center" width="120" />
        <el-table-column prop="deptName" label="所属部门" align="center" width="120" />
        <el-table-column prop="lastLogin" label="最后登录时间" align="center" width="170" />
        <el-table-column prop="iphone" label="联系电话" align="center" width="170" />
        <el-table-column prop="isEnable" label="是否启用" align="center">
          <template slot-scope="scope" width="100">
            <div v-if="scope.row.isEnable==1" style="color:green;">
              启用
            </div>
            <div v-else style="color:red;">
              禁用
            </div>
          </template>
        </el-table-column>
        <el-table-column label="权限设置" align="center" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round plain @click="fenpei(scope.$index, scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" round plain @click="czmm(scope.$index, scope.row)">重置密码</el-button>
            <el-button type="warning" size="mini" round plain @click="xiugai(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="mini" round plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
      <!-- 分配权限 -->
      <el-dialog title="分配权限" :visible.sync="fpqxdialog" width="30%">
        <div>
          <div style="margin-bottom: 0.625rem;">
            <el-radio-group v-model="radio">
              <div v-for="(item,index) in roleId_list" :key="index" style="padding: 0.5rem 0.5rem;">
                <el-radio :label="item.id">{{ item.name }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="fpqxdialog = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="fpqxclick">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限 -->
      <!-- 重置密码 -->
      <el-dialog title="重置密码" :visible.sync="czmmdialog" width="30%">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="登录账号" prop="age">
            {{ zh }}
          </el-form-item>
          <el-form-item label="密码" prop="pass" size="mini">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" size="mini" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" size="mini">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" size="mini" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="czmmdialog = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 重置密码 -->
      <!-- 修改信息 -->
      <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%">
        <el-form ref="xgruleForm" :model="xgruleForm" status-icon :rules="xgrules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName" size="mini">
            {{ xgruleForm.userName }}
          </el-form-item>
          <el-form-item label="部门" prop="deptId" size="mini">
            <el-select v-model="xgruleForm.deptId" placeholder="请选择" size="mini">
              <el-option v-for="item in deptId_list" :key="item.value" :label="item.deptName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="isEnable" size="mini">
            <el-switch v-model="xgruleForm.isEnable" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item label="名称" prop="name" size="mini">
            <el-input v-model="xgruleForm.name" />
          </el-form-item>
          <el-form-item label="手机号码" prop="iphone" size="mini">
            <el-input v-model="xgruleForm.iphone" />
          </el-form-item>
          <el-form-item label="岗位角色" prop="roleId" size="mini">
            <el-select v-model="xgruleForm.roleId" placeholder="请选择" size="mini">
              <el-option v-for="item in roleId_list" :key="item.value" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="xgsubmitForm('xgruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改信息 -->
      <!-- 添加信息 -->
      <el-dialog title="添加信息" :visible.sync="tjdialog" width="30%">
        <el-form ref="tjruleForm" :model="tjruleForm" status-icon :rules="tjrules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName" size="mini">
            <el-input v-model="tjruleForm.userName" />
          </el-form-item>
          <el-form-item label="密码" prop="password" size="mini">
            <el-input v-model="tjruleForm.password" maxlength="16" />
          </el-form-item>
          <el-form-item label="部门" prop="deptId" size="mini">
            <el-select v-model="tjruleForm.deptId" placeholder="请选择" size="mini">
              <el-option v-for="item in deptId_list" :key="item.value" :label="item.deptName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="isEnable" size="mini">
            <el-switch v-model="tjruleForm.isEnable" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item label="名称" prop="name" size="mini">
            <el-input v-model="tjruleForm.name" />
          </el-form-item>
          <el-form-item label="手机号码" prop="iphone" size="mini">
            <el-input v-model="tjruleForm.iphone" />
          </el-form-item>
          <el-form-item label="岗位角色" prop="roleId" size="mini">
            <el-select v-model="tjruleForm.roleId" placeholder="请选择" size="mini">
              <el-option v-for="item in roleId_list" :key="item.value" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="tjdialog = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="tjsubmitForm('tjruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加信息 -->
    </div>
  </div>
</template>

<script>
import {
  sysUser_listData,
  sysDept_list,
  sysUser_save,
  sysUserdel,
  sysReset,
  sysPower,
  sysPower_save
} from '@/api/sys'
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
      userId: '',
      radio: '',
      fpqxdialog: false,
      czmmdialog: false,
      dialogVisible: false,
      tjdialog: false,
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [],
      deptId_list: [],
      roleId_list: [],
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
      status_value: '',
      qhkeyword: '',
      bh: '',
      zh: '',
      id: '',
      qyvalue: '',
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      xgruleForm: {
        access_token: localStorage.getItem('accessToken'),
        action: 'update',
        userName: '',
        password: '',
        deptId: '',
        isEnable: 1,
        name: '',
        iphone: '',
        sex: '男',
        roleId: '',
        id: ''
      },
      xgrules: {
        userName: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        }],
        deptId: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        name: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        }],
        iphone: [{
          required: true,
          trigger: 'blur',
          validator: validatePhone
        }],
        roleId: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
      },
      tjruleForm: {
        access_token: localStorage.getItem('accessToken'),
        action: 'save',
        userName: '',
        password: '',
        deptId: '',
        isEnable: 1,
        name: '',
        iphone: '',
        sex: '男',
        roleId: '',
        id: ''
      },
      tjrules: {
        userName: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        },
        {
          min: 8,
          max: 16,
          message: '长度在 8 到 16 个字符'
        }
        ],
        deptId: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        name: [{
          required: true,
          trigger: 'blur',
          message: '该项为必填项'
        }],
        iphone: [{
          required: true,
          trigger: 'blur',
          validator: validatePhone
        }],
        roleId: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
      },
      rules: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        },
        {
          min: 8,
          max: 16,
          message: '长度在 8 到 16 个字符'
        }
        ],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      },
      start: 0,
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: this.start,
        length: 20,
        queryName: '',
        queryDeptId: '',
        queryRole: ''
      }
    }
  },
  created: function() {
    this.getlist()
    this.sysDept_list()
  },
  methods: {
    sysDept_list() {
      const query = {
        start: '0',
        length: 200,
        access_token: localStorage.getItem('accessToken'),
        queryName: ''
      }
      sysDept_list(query).then(res => {
        this.deptId_list = res.data
      })
      const querys = {
        access_token: localStorage.getItem('accessToken'),
        userId: ''
      }
      sysPower(querys).then(res => {
        this.roleId_list = res
      })
    },
    fpqxclick() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        userId: this.userId,
        roleIds: this.radio
      }
      sysPower_save(query).then(res => {
        this.fpqxdialog = false
        location.reload()
      })
    },
    getlist() {
      sysUser_listData(this.query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    handleDelete(index, row) {
      var mymessage = confirm('您确定删除吗?')
      if (mymessage === true) {
        const query = {
          access_token: localStorage.getItem('accessToken'),
          id: row.id
        }
        sysUserdel(query).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          location.reload()
        }).catch(() => {

        })
      }
    },
    czmm(index, row) {
      this.czmmdialog = true
      this.zh = row.userName
      this.id = row.id
    },
    fenpei(index, row) {
      this.fpqxdialog = true
      this.radio = row.roleId
      this.userId = row.id
    },
    xiugai(index, row) {
      this.dialogVisible = true
      this.xgruleForm.userName = row.userName
      this.xgruleForm.deptId = row.deptId
      this.xgruleForm.isEnable = row.isEnable
      this.xgruleForm.name = row.name
      this.xgruleForm.iphone = row.iphone
      this.xgruleForm.roleId = row.roleId
      this.xgruleForm.id = row.id
    },
    handleCurrentChange(val) {
      var that = this
      that.query.start = (val - 1) * 20
      this.getlist(that.start)
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var mymessage = confirm('您确定重置密码吗?')
          if (mymessage === true) {
            const query = {
              access_token: localStorage.getItem('accessToken'),
              id: this.id,
              newPassword: this.ruleForm.checkPass
            }
            sysReset(query).then(res => {
              this.$message({
                message: '重置成功',
                type: 'success'
              })
              this.czmmdialog = false
              location.reload()
            }).catch(() => {

            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    xgsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.xgruleForm)
          var mymessage = confirm('您确定要修改吗?')
          if (mymessage === true) {
            sysUser_save(this.xgruleForm).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogVisible = false
              location.reload()
            }).catch(() => {

            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tjsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sysUser_save(this.tjruleForm).then(res => {
            if (res.status === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.tjdialog = false
              location.reload()
            }
          })
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
	.table_headr {
		width: 99%;
	}

	.screenD {
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

	.demo-ruleForm {
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

		.screen {}

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
