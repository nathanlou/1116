<template>
  <div>
    <div class="searchD">
      <div style="width: 60%;">
        <span style="width:6rem;">企业名称：</span>
        <el-input v-model="query.queryCompanyName" placeholder="请输入企业名称" style="width: 10rem;" size="small" />
        <span style="width:6rem;margin-left: 10px;">登录账号：</span>
        <el-input v-model="query.queryUserName" placeholder="请输入登录账号" style="width: 10rem;" size="small" />
        <el-button style="margin-left: 2rem;" type="primary" icon="el-icon-search" round size="small" @click="doSearch">搜索</el-button>
      </div>
      <div style="display: flex;margin-left: 2rem;width: 20%;" />
      <div style="display: flex;width: 20%;justify-content: flex-end; padding-right: 20px;">
        <el-button type="success" round @click="addAccountInfo('save')">新增信息员</el-button>
      </div>
    </div>
    <div class="tableD">
      <div class="table_headr">列表</div>
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%;text-align: center;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="登录账号">
                <span>{{ props.row.userName }}</span>
              </el-form-item>
              <el-form-item label="企业名称">
                <span>{{ props.row.companyName }}</span>
              </el-form-item>
              <el-form-item label="权限管理">
                <span>{{ props.row.manageType ? (props.row.manageType == 1 ? '管理员' : props.row.manageType == 2 ? '送料员' : '超级管理员' ) : '-' }}</span>
              </el-form-item>
              <el-form-item label="是否启用">
                <span>{{ props.row.isEnable ? (props.row.isEnable == 1 ? '启用' : '停用') : '-' }}</span>
              </el-form-item>
              <el-form-item label="联 系 人">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.tel }}</span>
              </el-form-item>
              <el-form-item label="登录时间">
                <span>{{ props.row.lastLogin }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" label="登录账号" prop="userName" />
        <el-table-column align="center" label="企业名称" prop="companyName" />
        <el-table-column align="center" label="是否启用" prop="isEnable">
          <template slot-scope="scope">
            <span>{{ scope.row.isEnable == 1 ? '启用' :'停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" plain round size="mini" @click="updatePassword(scope.row)">重置密码</el-button>
            <el-button type="warning" plain round size="mini" @click="addAccountInfo('update',scope.row)">编辑</el-button>
            <el-button type="danger" plain round size="mini" @click="deleteAction(1,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        layout="total,prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        background
        @current-change="current_change"
      />
    </div>

    <!--重置密码dialog -->
    <el-dialog title="重置用户密码" :visible.sync="UpdatePwddialogVisible" width="35%">
      <el-form ref="passwordForm" :model="passwordForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户名称">
              <el-input v-model="passwordForm.userName" readonly disabled autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="passwordForm.newPassword" maxlength="20" type="password" autocomplete="off" @input="aaa" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPass">
              <el-input v-model="passwordForm.confirmPass" maxlength="20" type="password" autocomplete="off" @input="bbb" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="start">
          <el-form-item>
            <el-button type="primary" @click="confirmUpdate()">确认重置</el-button>
            <el-button @click="UpdatePwddialogVisible = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 删除对话框 -->
    <el-dialog title="删除提示" :visible.sync="delDialogVisible" width="25%" center>
      <span>确定qianhe账户信息么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框-->
    <el-dialog :title="(form.action =='save'?'新增':'修改') +'信息员信息'" :visible.sync="editInfodialogVisible" width="35%" center>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.action =='save'" label="选择企业" prop="companyId" :rules="[{ required: true, message: '请选择企业', trigger: 'blur' }]">
              <el-select v-model="form.companyId" placeholder="请选择企业" style="width:100%">
                <el-option v-for="item in qycompany" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
            <el-form-item v-else label="企业名称" prop="companyName" :rules="[{ required: true, message: 'companyName', trigger: 'blur' }]">
              <el-input v-model="form.companyName" readonly disabled maxlength="13" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理角色" prop="manageType" :rules="[{ required: true, message: '请选择管理角色', trigger: 'blur' }]">
              <el-select v-model="form.manageType" placeholder="请选择管理角色" style="width:100%">
                <el-option label="管理员" :value="1" />
                <el-option label="送料员" :value="2" />
                <!-- ROLE_SUPERMANAGER,ROLE_SYSMANAGER-->
                <el-option label="超级管理员" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="form.name" maxlength="100" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
              <el-input v-model="form.tel" maxlength="11" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.action =='save'" label="用户名" prop="userName" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
              <el-input v-model="form.userName" maxlength="100" placeholder="请输入用户名" autocomplete="off" />
            </el-form-item>
            <el-form-item v-if="form.action =='update'" label="用户名" prop="userName" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
              <el-input v-model="form.userName" readonly disabled maxlength="100" placeholder="请输入用户名" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.action =='save'" label="密码" prop="password" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="form.password" type="password" maxlength="100" placeholder="请输入密码" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="是否启用">
              <el-switch v-model="form.isEnable" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-form-item>
            <el-button type="primary" @click="submit()">保存</el-button>
            <el-button @click="editInfodialogVisible = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import {
  companyUserListBsysData,
  companyUserSave,
  companyUserUpdateResetPd,
  companyUserDelete
} from '@/api/companyManager.js'
import {
  companyListCom
} from '@/api/companyManager.js'
export default {
  data() {
    return {
      form: {
        id: '',
        action: '',
        companyId: '',
        manageType: '',
        name: '',
        tel: '',
        userName: '',
        password: '',
        isEnable: 0
      },
      optionsEnterPN: [],
      optionsrole: [],
      optionsisUser: [],
      total: 0, // 默认数据总数
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      UpdatePwddialogVisible: false,
      delDialogVisible: false,
      editInfodialogVisible: false,
      userInfo: {
        account: '',
        password: '',
        enterpriseName: '',
        contactPersion: '',
        accountphone: '',
        isUser: '',
        role: ''
      },
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 10,
        queryCompanyName: '',
        queryUserName: '',
        companyId: ''
      },
      /* 登录账号，企业名称，权限管理，联系电话，联系人，是否启用，最后登录时间*/
      tableData: [],
      // 修改密码表单
      passwordForm: {
        newPassword: '',
        confirmPass: ''
      }
    }
  },
  created() {
    this.getList()
    this.getAllCompany()
  },
  methods: {
    // 查询所有企业列表
    getAllCompany() {
      companyListCom().then(res => {
        if (res.status === 200) {
          this.qycompany = res.data
        } else {
          this.$message.error('加载企业列表失败')
        }
      })
    },
    doSearch() {
      this.currentPage = 1
      this.getList()
    },
    getList() {
      this.query.start = (this.currentPage - 1) * this.pageSize
      this.query.length = this.pageSize
      companyUserListBsysData(this.query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.getList()
    },
    initForm() {
      this.form = {
        access_token: localStorage.getItem('accessToken'),
        id: '',
        companyId: '',
        manageType: '',
        name: '',
        tel: '',
        userName: '',
        password: '',
        isEnable: ''
      }
    },
    addAccountInfo(action, row) {
      if (action === 'save') {
        this.initForm()
      } else {
        this.form = JSON.parse(JSON.stringify(row))
      }
      this.form.action = action
      this.form.access_token = localStorage.getItem('accessToken')
      this.editInfodialogVisible = true
    },
    // 新增或者保存
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          companyUserSave(this.form).then(res => {
            if (res.status === 200) {
              this.$message.success(this.form.action === 'save' ? '添加成功' : '修改成功')
              this.getList()
              this.editInfodialogVisible = false
            }
          })
        } else {
          return false
        }
      })
    },
    // 删除数据
    deleteAction(index, row) {
      this.$confirm('是否确认删除企业[' + row.companyName + ']的用户[' + row.userName + ']?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return companyUserDelete({
          access_token: localStorage.getItem('accessToken'),
          id: row.id
        })
      }).then(() => {
        this.getList()
        this.$message.success('删除成功')
      }).catch(function() {})
    },
    // 修改密码
    updatePassword(row) {
      this.passwordForm = row
      this.passwordForm.newPassword = ''
      this.passwordForm.confirmPass = ''
      this.passwordForm.access_token = localStorage.getItem('accessToken')
      this.UpdatePwddialogVisible = true
    },
    // 确认重置密码
    confirmUpdate() {
      if (this.passwordForm.newPassword && this.passwordForm.newPassword !== this.passwordForm.confirmPass) {
        this.$message.error('两次输入密码不一样')
        return false
      }
      if (!this.passwordForm.newPassword) {
        this.$message.error('请输入新密码')
        return false
      }
      if (!this.passwordForm.confirmPass) {
        this.$message.error('请再次输入新密码')
        return false
      }
      companyUserUpdateResetPd(this.passwordForm).then(res => {
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.UpdatePwddialogVisible = false
        }
      })
      return false
    },
    // aaa
    aaa(e) {
      this.$forceUpdate()
    },
    bbb(e) {
      this.$forceUpdate()
    }
  }
}
</script>

<style>
  .searchD {
    margin-left: 1.5rem;
    margin-top: -0.8rem;
    color: gray;
    display: flex;
    align-items: center;

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
    margin: 0.8rem 1.5rem;
  }

  .accountinfoD {

    display: flex;
    align-items: center;
  }

  .accountinfoSpan {
    width: 5rem;
  }

  .accountinfoinput {
    width: 12rem;
  }
</style>
