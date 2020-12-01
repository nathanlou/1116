<template>
  <div class="titles">
    <el-button style="margin-bottom: 1%;" type="success" icon="el-icon-edit" size="mini" round @click="addRecord">添加种类</el-button>
    <div class="table_headr">设备种类列表</div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      style="width: 100%;font-size: 13px;"
      :default-sort="{prop: 'date', order: 'descending'}"
      size="mini"
    >
      <!-- <el-table-column prop="id" label="类型ID" align="center" /> -->
      <el-table-column prop="sblx" label="设备类型" align="center" />
      <el-table-column prop="sbxh" label="设备型号" align="center" />
      <el-table-column prop="sbxlh" label="设备识别号" align="center" />
      <el-table-column prop="ms" label="描述" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="createUserName" label="创建人" align="center" />
      <el-table-column label="操作" width="280" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="btn btn_do" type="success" size="mini" round plain @click="see(scope.$index, scope.row)">查看参数</el-button>
          <el-button class="btn btn_do" type="warning" size="mini" round plain @click="modify(scope.$index, scope.row)">修改</el-button>
          <el-button class="btn btn_do" type="danger" size="mini" round plain @click="deletes(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fy"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />

    <!-- 添加种类 -->
    <el-dialog title="添加种类" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="设备类型" prop="sblx" size="small">
          <el-input v-model="form.sblx" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="设备型号" prop="sbxh" size="small">
          <el-input v-model="form.sbxh" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="设备识别号" size="small" prop="sbxlh">
          <el-input v-model="form.sbxlh" style="width: 18.75rem;" />
        </el-form-item>
        <el-form-item label="设备图片" size="small">
          <el-upload
            multiple
            accept="image/png,image/jpg,image/gif,image/jpeg"
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="uploadFile"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="设备描述" size="small">
          <el-input v-model="form.ms" type="textarea" :rows="2" placeholder="请输入内容" style="width: 18.75rem;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd()">取 消</el-button>
        <el-button type="primary" @click="add('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  type_list,
  addtype,
  deltype
} from '@/api/sys'
import {
  getUUid,
  commonFileDelete
} from '@/api/addType'

export default {
  data() {
    return {
      imageMap: {},
      dialogFormVisible: false,
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      activeName: 'first',
      dialogVisible: false,
      disabled: false,
      tableData: [],
      form: {
        access_token: localStorage.getItem('accessToken'),
        action: 'save',
        sblx: '',
        sbxh: '',
        id: '',
        ms: '',
        sbxlh: ''
        // dialogImageUrl: '',
      },
      rules: {
        sblx: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        sbxh: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        id: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        sbxlh: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }]
      },
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 10,
        queryName: ''
      }
    }
  },
  created() {
    this.getlist()
    this.handleCurrentChange()
  },
  methods: {
    cancelAdd() {
      this.dialogFormVisible = false
      Object.keys(this.imageMap).forEach(key => {
        commonFileDelete({
          access_token: localStorage.getItem('accessToken'),
          id: this.imageMap[key]
        }).then(res => {
          console.log(res)
        })
      })
      this.imageMap = {}
    },
    addRecord() {
      this.dialogFormVisible = true
      // 加载唯一UUID
      getUUid({
        access_token: localStorage.getItem('accessToken')
      }).then(res => {
        this.form.id = res.data
      })
    },
    uploadFile(param) {
      const formData = new FormData()
      formData.append('access_token', localStorage.getItem('accessToken'))
      formData.append('busiType', 'deviceCategory')
      formData.append('busiInType', 'deviceCategoryList')
      formData.append('refId', this.form.id)
      formData.append('file', param.file)
      // 新增图片
      const that = this
      this.$http({
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/common/commonLog_upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function(res) {
        if (res.status === 200) {
          that.imageMap[param.file.uid] = res.data.data[0].id
        }
      })
    },
    handleClose(done) {
      done()
    },
    getlist() {
      type_list(this.query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    modify(index, row) {
      this.$router.push({
        path: '/add_type/modify_type',
        query: {
          rowData: JSON.stringify(row)
        }
      })
    },
    see(index, row) {
      this.$router.push({
        path: '/add_type/parameter',
        query: {
          id: row.id
        }
      })
    },
    deletes(index, row) {
      var mymessage = confirm('您确定删除吗?')
      if (mymessage === true) {
        const query = {
          access_token: localStorage.getItem('accessToken'),
          id: row.id
        }
        deltype(query).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.currentPage = 1
          this.getlist(0)
        }).catch(() => {

        })
      }
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addtype(this.form).then(res => {
            this.dialogFormVisible = false
            this.currentPage = 1
            this.getlist(0)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit2() {
      console.log('submit!')
    },
    handleRemove(file) {
      commonFileDelete({
        access_token: localStorage.getItem('accessToken'),
        id: this.imageMap[file.uid]
      }).then(res => {
        if (res.status === 200) {
          delete this.imageMap.[file.uid]
        }
      })
    },
    handlePictureCardPreview(file) {
      this.form.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      var that = this
      that.query.start = (val - 1) * this.pagesize
      this.getlist(that.start)
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style>
  .titles {
    width: 96%;
    margin-left: 2%;

    height: 100%;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
    color: gray;
  }

  .el-form-item .el-form-item {
    margin-bottom: 6px;
  }

  .el-form-item__label {
    color: gray;
    font-weight: 500;
  }

  .deviderLeft {
    margin-left: 2%;
  }

  @media screen and (max-width: 1024px) {
    .titles {
      width: 99%;
      margin-left: 2%;
      margin-top: -1.5%;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;

    }
  }
</style>
