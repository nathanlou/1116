<template>
  <div class="titles">
    <div class="screen">
      <div style="width: 80%;">
        <div>
          <span style="width: 120px;">设备编号：</span>
          <el-input v-model="queryLog.queryBh" placeholder="设备编号" class="select" size="mini" />
          <span style="width: 120px;">内部编号：</span>
          <el-input v-model="queryLog.queryNbbh" placeholder="内部编号" class="select" size="mini" />
          <span style="width: 120px;">设备类型：</span>
          <el-select v-model="queryLog.queryType" placeholder="请选择" class="lxselect" size="mini">
            <el-option v-for="item in sbzl_list" :key="item.id" :label="item.sblx" :value="item.id" />
          </el-select>
          <span style="width: 120px;">操作账号：</span>
          <el-input v-model="queryLog.queryUserName" placeholder="操作人" class="select" size="mini" />
        </div>
        <div style="margin: 10px 0;">
          <span style="width: 120px;">设备ID：</span>
          <el-input v-model="queryLog.queryDeviceId" placeholder="设备ID" class="select" size="mini" />
          <span style="width: 120px;">日期：</span>
          <el-date-picker
            v-model="queryLog.timevalue"
            class="datatime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </div>
      </div>

      <span style="width: 20%;display: flex;justify-content: flex-end;padding-right: 20px;">
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round @click="doSearch">搜索</el-button>
        <el-button class="btn" type="danger" icon="el-icon-delete" size="mini" round @click="deletes()">批量删除</el-button>
      </span>
    </div>
    <div class="container_table">
      <div class="table_headr">操作日志</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 99%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size="mini"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column prop="deviceBh" sortable label="设备编号" align="center" width="170" />
        <el-table-column prop="companyBh" sortable label="内部编号" align="center" />
        <el-table-column prop="createUserName" label="操作人" align="center" />
        <el-table-column prop="cznr" label="操作内容" align="center" />
        <el-table-column prop="createTime" label="操作时间" align="center" width="150" />
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
  </div>
</template>

<script>
import {
  deviceOpLogDeleteAll,
  deviceOpLogListData
} from '@/api/deviceSetUp.js'
import {
  deviceType_listData
} from '@/api/getlist'
export default {
  data() {
    return {
      timevalue: '',
      czzh: '',
      total: 0, // 默认数据总数
      pageSize: 15, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [],
      queryLog: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 15,
        queryBh: '',
        queryNbbh: '',
        queryType: '',
        queryUserName: '',
        queryDeviceId: '',
        queryStart: '',
        queryEnd: '',
        timevalue: ''
      },
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
      sbzl_list: []
    }
  },
  created: function() {
    deviceType_listData({
      access_token: localStorage.getItem('accessToken'),
      start: 0,
      length: 1000
    }).then(res => {
      const list = res.data
      list.unshift({
        id: '',
        sblx: '全部'
      })
      this.sbzl_list = list
    })
    this.getOptLogList()
  },
  methods: {
    doSearch() {
      this.currentPage = 1
      this.getOptLogList()
    },
    // 查询操作日志
    getOptLogList() {
      this.queryLog.start = this.currentPage - 1
      this.queryLog.length = this.pageSize
      if (this.queryLog.timevalue && this.queryLog.timevalue.length === 2) {
        this.queryLog.queryStart = this.queryLog.timevalue[0]
        this.queryLog.queryEnd = this.queryLog.timevalue[1]
      } else {
        this.queryLog.queryStart = ''
        this.queryLog.queryEnd = ''
      }
      deviceOpLogListData(this.queryLog).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
          this.total = res.recordsTotal
        } else {
          this.$message.error('加载操作日志列表失败')
        }
      })
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
      // 重新查询
      this.getOptLogList()
    },
    deletes() {
      this.selectionDatas = []
      var arr = []
      var data = this.$refs.multipleTable.selection
      if (data.length === 0) {
        this.$alert('您没有任何选择', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      } else {
        data.forEach(function(item) {
          arr.push(item.id)
        })
        console.log()
        this.$confirm('此操作将永久删除相应记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deviceOpLogDeleteAll({
            access_token: localStorage.getItem('accessToken'),
            ids: arr.join(',')
          }).then(response => {
            if (response.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.currentPage = 1
              this.getOptLogList()
            }
          }).catch(function(error) {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
}
</script>

<style scoped="scoped">
  .titles {
    width: 98%;
    margin-left: 1.5%;
    height: 100%;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
    color: gray;
    margin-top: -0.5%;
  }

  .screen {
    display: flex;
    align-items: center;
    align-content: center;
    font-size: 0.875rem;
    color: gray;
  }

  .select {
    width: 10rem;
    margin-right: 1.5%;
  }

  .lxselect {
    width: 12%;
    margin-right: 1.5%;
  }

  .fy {
    text-align: right;
    margin-top: 0.625rem;
  }

  .btn {
    margin-left: 0.5rem;
    margin-bottom: 0.625rem;
  }

  .container_table {
    clear: both;

  }

  .datatime {
    width: 18.75rem;
  }

  .table_headr {
    height: 2rem;
    width: 99%;
    line-height: 2rem;
    color: white;
    background-color: #409EFF;
  }

  @media screen and (max-width: 1024px) {
    .titles {
      width: 98%;
      margin-left: 1.5%;
      height: 100%;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
      color: gray;
      margin-top: -1.8%;
    }

    .select {
      width: 15%;
      margin-right: 1.5%;
    }

    .datatime {
      width: 23%
    }

    .btn {
      margin-top: 0.625rem;
    }

    .table_headr {
      height: 2rem;
      width: 99%;
      line-height: 2rem;
      color: white;
      background-color: #409EFF;
    }
  }
</style>
