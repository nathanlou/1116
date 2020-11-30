<template>
  <div>

    <div class="searchD">
      <div style="display: flex;width: 100%;">
        <div>
          <span style="width:6rem;">选择企业：</span>
          <el-select v-model="query.queryCompanyId" placeholder="请选择" class="searchD_enterName" size="small">
            <el-option v-for="item in optionsEnterPN" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </div>
        <div>
          <span style="width:6rem;margin-left: 0.6rem;">设备类型：</span>
          <el-select v-model="query.queryTypeId" placeholder="请选择" class="searchD_enterName" size="small">
            <el-option v-for="item in optionsEnterType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="margin-left: 0.6rem;">版本编号：</span>
          <el-input v-model="query.queryVersionNo" placeholder="版本编号" style="width: 10rem;" size="small" />
        </div>
        <div style="display: flex; align-items: center;">
          <span style="margin-left: 0.6rem;">设备型号：</span>
          <el-input v-model="query.queryModel" placeholder="设备型号" style="width: 10rem;" size="small" />
        </div>
        <div style="display: flex;margin-left: 2rem;">
          <el-button type="primary" icon="el-icon-search" round size="small" @click="getList">搜索</el-button>
        </div>
      </div>
      <div style="display: flex;margin-right: 2rem;justify-content: flex-end;">
        <el-button type="success" icon="el-icon-add" round size="small" @click="controlForm('save')">添加升级包</el-button>
      </div>
    </div>
    <div class="tableD">
      <div class="table_headr">设备列表</div>
      <el-table ref="multipleTable" :data="tableData" border :default-sort="{prop: 'date', order: 'descending'}" size="small">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="企业名称">
                <span>{{ props.row.companyName }}</span>
              </el-form-item>
              <el-form-item label="设备编号">
                <span>{{ props.row.bh }}</span>
              </el-form-item>
              <el-form-item label="设备地址">
                <span>{{ props.row.gdmc }}</span>
              </el-form-item>
              <el-form-item label="设备识别号">
                <span>{{ props.row.companyBh }}</span>
              </el-form-item>
              <el-form-item label="版本号">
                <span>{{ props.row.version ? props.row.version : '-' }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center" />
        <el-table-column align="center" label="设备识别号" prop="companyBh" />
        <el-table-column align="center" class="pcvisible_eltable" label="设备编号" prop="bh" />

        <el-table-column align="version" label="版本号" prop="version" />
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain round size="mini" @click="controlForm('update',scope.row)">修改升级包</el-button>
            <el-button type="primary" plain round size="mini" @click="toPackage(scope.row)">下载升级包</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="fy"
      layout="total,prev, pager, next"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      background
      @current-change="current_change"
    />
    <!-- 表单 -->
    <el-dialog :title="(form.action ==='save' ?'添加':'修改')+'升级包'" width="35%" :visible.sync="showForm" style="text-align: center;">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="companyId" :rules="[{ required: true, message: '请选择企业', trigger: 'blur' }]">
              <el-select v-model="form.companyId" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in optionsEnterPN" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本编号" prop="versionNo" :rules="[{ required: true, message: '请输入版本编号', trigger: 'blur'}]">
              <el-input v-model="form.versionNo" maxlength="4" placeholder="请输入版本编号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="typeId" :rules="[{ required: true, message: '请选择设备类型', trigger: 'blur'}]">
              <el-select v-model="form.typeId" placeholder="请选择设备类型" style="width: 100%;" @change="selectModel">
                <el-option v-for="item in optionsEnterTypeForm" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备型号" prop="companyId" :rules="[{ required: true, message: '请选择设备型号', trigger: 'blur' }]">
              <el-select v-model="form.deviceModel" placeholder="请选择设备型号" style="width: 100%;">
                <el-option v-for="item in optionsEnterModel" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime" :rules="[{ required: true, message: '请输入开始时间', trigger: 'blur' }]">
              <el-time-select
                v-model="form.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: form.endTime ? form.endTime:'23:59'
                }"
                placeholder="请输入开始时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime" :rules="[{ required: true, message: '请输入结束时间', trigger: 'blur' }]">
              <el-time-select
                v-model="form.endTime"
                :picker-options="{
                  start: form.startTime ? form.startTime :'00:00',
                  step: '00:01',
                  end: '23:59'
                }"
                placeholder="请输入开始时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传升级包">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            name="form.file"
            :limit="1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :multiple="false"
            accept=".bat"
            list-type="bat"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip">只能上传.bat文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-row type="flex" justify="start">
          <el-form-item>
            <el-button type="primary" @click="submit()">保存</el-button>
            <el-button @click="showForm = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  companyListCom
} from '@/api/companyManager.js'
import {
  deviceTypeListCom
} from '@/api/deviceSetUp.js'
import {
  deviceVersionListData, // 升级包管理列表查询
  deviceVersionSave, // 升级包管理新增/修改
  deviceVersionGetDetail, // 查看详情
  deviceVersionDownload, // 企业升级包-下载
  deviceVersionDelete, // 删除
  deviceVersionGetModel // 企业升级包-根据类型查询型号列表
} from '@/api/packageUpdate.js'

export default {
  data() {
    return {
      fileList: [], // 选择的文件
      showForm: false,
      form: {
        access_token: localStorage.getItem('accessToken'),
        action: 'save',
        companyId: '',
        versionNo: '',
        startTime: '',
        endTime: '',
        deviceModel: '',
        typeId: '',
        file: null
      },
      total: 0, // 默认数据总数
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      updatedialogVisible: false,
      optionsEnterPN: [],
      optionsEnterType: [],
      optionsEnterTypeForm: [],
      optionsEnterModel: [],
      enterpriseName: '',
      enterpriseType: '',
      tableData: [],
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 10,
        queryCompanyId: '', // 企业ID（下拉框，带搜索）
        queryVersionNo: '', // 版本编号手动输入
        queryModel: '', // 设备型号，手动输入
        queryTypeId: '' // 设备种类（下拉框）
      }
    }
  },
  created() {
    // 加载企业下拉框
    companyListCom().then(res => {
      this.optionsEnterPN = res.data
    })
    // 加载设备类型下拉框
    deviceTypeListCom().then(res => {
      const list = JSON.parse(JSON.stringify(res.data))
      list.unshift({
        key: '',
        value: '全部'
      })
      this.optionsEnterType = list
      this.optionsEnterTypeForm = res.data
    })
    this.getList()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 根据设备类型查找型号
    selectModel() {
      deviceVersionGetModel({
        access_token: localStorage.getItem('accessToken'),
        typeId: this.form.typeId
      }).then(res => {
        this.optionsEnterModel = res.data
      })
    },
    // 控制表单
    controlForm(type, row) {
      // 如果是修改
      if (type === 'update') {
        this.form = JSON.parse(JSON.stringify(row))
      } else {
        this.form = {
          companyId: '',
          versionNo: '',
          startTime: '',
          endTime: '',
          deviceModel: '',
          typeId: ''
        }
      }
      this.form.action = type
      this.form.access_token = localStorage.getItem('accessToken')
      this.showForm = true
    },
    // 查询列表
    getList() {
      this.query.start = (this.currentPage - 1) * this.pageSize
      this.query.length = this.pageSize
      deviceVersionListData(this.query).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
        this.total = res.recordsTotal
      })
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
      this.getList()
    },
    addAccountInfo() {
      console.log(this.userInfo)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 修改或保存
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          deviceVersionSave(this.form).then(res => {
            this.$message.success(this.form.action === 'save' ? '添加成功' : '修改成功')
            this.getList()()
            this.showForm = false
          })
        } else {
          return false
        }
      })
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
