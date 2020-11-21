<template>
  <div class="overview_container">
    <el-page-header content="详情页面" @back="goBack" />
    <el-button style="margin-top: 1%;margin-bottom: 1%;" type="success" icon="el-icon-edit" size="mini" round @click="add">添加参数</el-button>
    <div class="table_headr">列表</div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      style="width: 100%;font-size: 13px;"
      :default-sort="{prop: 'date', order: 'descending'}"
      size="mini"
    >
      <el-table-column prop="typeId" label="类型ID" align="center" />
      <el-table-column prop="csmc" label="参数名称" align="center" />
      <el-table-column prop="jcqdz" label="寄存器地址" align="center" />
      <el-table-column prop="cd" label="长度" align="center" />
      <el-table-column prop="dxfs" label="读写方式" align="center" />
      <el-table-column prop="sjlx" label="数据类型" align="center" />
      <el-table-column prop="ms" label="描述" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="createUserName" label="创建人" align="center" />
      <el-table-column label="操作" width="280" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="btn btn_do" type="warning" size="mini" round plain @click="modify(scope.$index, scope.row)">修改</el-button>
          <el-button class="btn btn_do" type="danger" size="mini" round plain @click="deletes(scope.$index, scope.row)">删除</el-button>
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

    <!-- 添加 -->
    <el-dialog title="添加参数" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型ID" prop="typeId" size="small">
          <el-input v-model="form.typeId" disabled style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="参数名称" prop="csmc" size="small">
          <el-input v-model="form.csmc" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="寄存器地址" prop="jcqdz" size="small">
          <el-input v-model="form.jcqdz" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="长度" prop="cd" size="small">
          <el-input v-model="form.cd" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="数据类型" prop="sjlx" size="small">
          <el-input v-model="form.sjlx" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="读写方式" prop="dxfs" size="small">
          <el-input v-model="form.dxfs" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="描述" size="small">
          <el-input v-model="form.ms" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="是否启用" size="small">
          <el-switch v-model="form.isEnable" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="备注" size="small">
          <el-input v-model="form.bz" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item v-if="week == true" label="星期几" size="small">
          <el-input v-model="form.week" style="width: 18.75rem;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改参数" :visible.sync="dialogFormVisible1">
      <el-form ref="form1" :model="form1" :rules="rules" label-width="100px">
        <el-form-item label="类型ID" prop="typeId" size="small">
          <el-input v-model="form1.typeId" disabled style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="参数名称" prop="csmc" size="small">
          <el-input v-model="form1.csmc" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="寄存器地址" prop="jcqdz" size="small">
          <el-input v-model="form1.jcqdz" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="长度" prop="cd" size="small">
          <el-input v-model="form1.cd" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="数据类型" prop="sjlx" size="small">
          <el-input v-model="form1.sjlx" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="读写方式" prop="dxfs" size="small">
          <el-input v-model="form1.dxfs" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="描述" size="small">
          <el-input v-model="form1.ms" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="是否启用" size="small">
          <el-switch v-model="form1.isEnable" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="备注" size="small">
          <el-input v-model="form1.bz" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item v-if="week == true" label="星期几" size="small">
          <el-input v-model="form1.week" style="width: 18.75rem;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit1('form1')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  parameter,
  addparameters,
  delparameters
} from '@/api/sys'
export default {
  data() {
    return {
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      tableData: [],
      id: '',
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 200,
        queryName: '',
        typeId: this.$route.query.id
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      week: false,
      form: {
        access_token: localStorage.getItem('accessToken'),
        action: 'save',
        id: '',
        typeId: this.$route.query.id,
        csmc: '',
        jcqdz: '',
        cd: '',
        sjlx: '',
        dxfs: '',
        ms: '',
        isEnable: '1',
        bz: '',
        week: '0'
      },
      form1: {
        access_token: localStorage.getItem('accessToken'),
        action: 'update',
        id: '',
        typeId: this.$route.query.id,
        csmc: '',
        jcqdz: '',
        cd: '',
        sjlx: '',
        dxfs: '',
        ms: '',
        isEnable: '1',
        bz: '',
        week: '0'
      },
      rules: {
        typeId: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        csmc: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        jcqdz: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        sjlx: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        dxfs: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        cd: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }]
      }
    }
  },
  created: function() {
    this.getlist()
    this.handleCurrentChange()
    console.log(this.id)
  },
  methods: {
    goBack() {
      this.$router.go(-1) // 返回上一层
    },
    modify(index, row) {
      this.form1.cd = row.cd
      this.form1.ms = row.ms
      this.form1.id = row.id
      this.form1.dxfs = row.dxfs
      this.form1.csmc = row.csmc
      this.form1.week = row.week
      this.form1.jcqdz = row.jcqdz
      this.form1.sjlx = row.sjlx
      this.dialogFormVisible1 = true
    },
    deletes(index, row) {
      var mymessage = confirm('您确定删除吗?')
      if (mymessage === true) {
        const query = {
          access_token: localStorage.getItem('accessToken'),
          id: row.id
        }
        delparameters(query).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          location.reload()
        }).catch(() => {

        })
      }
    },
    getlist() {
      parameter(this.query).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    handleCurrentChange(val) {
      var that = this
      that.query.start = (val - 1) * 20
      this.getlist(that.start)
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    add() {
      this.dialogFormVisible = true
      if (this.$route.query.id === 'modbus_xwz') {
        this.week = true
      }
    },
    addsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addparameters(this.form).then(res => {
            this.dialogFormVisible = false
            location.reload()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addsubmit1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addparameters(this.form1).then(res => {
            this.dialogFormVisible1 = false
            location.reload()
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

<style>
	.overview_container {
		width: 95%;
		margin-left: 2%;
		color: gray;
		margin-top: 1%;
	}
</style>
