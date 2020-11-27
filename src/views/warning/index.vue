<template>
  <div class="titles">
    <div class="screen">
      关键字：
      <el-input v-model="qhkeyword" placeholder="编号" class="select" size="mini" />
      类型：<el-select v-model="style_value" placeholder="请选择" class="select" size="mini">
        <el-option label="全部" value="" />
        <el-option v-for="item in style_list" :key="item.value" :label="item.typeName" :value="item.id" />
      </el-select>
      处置状态：<el-select v-model="cz_value" placeholder="请选择" class="select" size="mini">
        <el-option v-for="item in cz_list" :key="item.value" :label="item.label" :value="item.value" size="mini" />
      </el-select>
      日期：
      <el-date-picker
        v-model="timevalue"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        class="selectDate"
      />
      <span style="float: right;margin-right: 1.5%;">
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round @click="searchs">搜索</el-button>
      </span>
    </div>
    <div class="container_table">
      <div class="table_headr">报警记录</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 99%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size="mini"
      >
        <el-table-column prop="bh" sortable label="设备编号" align="center" width="170" />
        <el-table-column prop="nbbh" sortable label="内部编号" align="center" />
        <el-table-column prop="ms" label="报警描述" align="center" />
        <el-table-column prop="czZt" label="处置状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.czZt==0" style="color:green;">
              未处置
            </div>
            <div v-else style="color:red;">
              已处置
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="产生时间" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round @click="set_up(scope.$index, scope.row)">操作记录</el-button>
            <el-button
              v-if="scope.row.czZt ==0"
              type="danger"
              size="mini"
              round
              @click="xiugai(scope.$index, scope.row)"
            >处置</el-button>
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
      <el-dialog title="处置" :visible.sync="dialogVisible" width="35%">
        <div>
          <div style="margin-bottom: 0.625rem;">设备编号：{{ bh }}</div>
          <div>
            处置选项：<el-select v-model="qyvalue" placeholder="请选择" size="mini">
              <el-option v-for="item in qycompany" :key="item.value" :label="item.label" :value="item.value" size="mini" />
            </el-select>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  alarm,
  alarmtype
} from '@/api/getlist'
export default {
  data() {
    return {
      dialogVisible: false,
      timevalue: '',
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [],
      cz_list: [{
        value: '',
        label: '全部'
      }, {
        value: 1,
        label: '已处置'
      }, {
        value: 0,
        label: '未处置'
      }],
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
      style_list: [],
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
      company_value: '',
      style_value: '',
      status_value: '',
      cz_value: '',
      qhkeyword: '',
      bh: '',
      qyvalue: '',
      start: 0,
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 20,
        queryBh: '',
        queryNbbh: '',
        queryType: '',
        queryStart: '',
        queryEnd: '',
        queryZt: ''
      }
    }
  },
  created: function() {
    alarmtype({ access_token: localStorage.getItem('accessToken') }).then(res => {
      this.style_list = res.data
    })
    this.getDataList()
  },
  methods: {
    searchs() {
      this.query = {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 20,
        queryBh: this.qhkeyword,
        queryNbbh: '',
        queryType: this.style_value,
        queryStart: this.timevalue[0],
        queryEnd: this.timevalue[1],
        queryZt: this.cz_value
      }
      this.getDataList()
    },
    getDataList() {
      this.query.start = (this.currentPage - 1) * this.pagesize
      this.query.length = this.pagesize
      alarm(this.query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    xiugai(index, row) {
      this.dialogVisible = true
      this.bh = row.bh
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDataList()
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    set_up(index, row) {
      this.$router.push({
        path: 'set_up',
        query: {
          key: row
        }
      })
    }
  }
}
</script>

<style scoped="scoped">
  .screen {
    font-size: 0.875rem;
    color: gray;

  }

  .table_headr {
    height: 2rem;
    line-height: 2rem;
    color: white;
    background-color: #409EFF;
    width: 99%;

  }

  .select {
    width: 10rem;
    margin-right: 1%;
  }

  .selectDate {
    width: 15rem;

    margin-right: 1%;
  }

  .fy {
    text-align: right;
    margin-top: 0.625rem;
  }

  .titles {
    width: 98%;
    margin-left: 1%;
    margin-top: -0.8rem;
    height: 100%;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
  }

  .btn {
    margin-left: 0.5rem;
    margin-bottom: 0.625rem;

  }

  .container_table {
    clear: both;
  }

  @media screen and (max-width: 1024px) {
    .titles {
      font-size: 0.875rem;
    }

    .select {
      width: 6.7rem;

      margin-right: 0.5rem;
    }

    .selectDate {
      width: 21%;
      margin-right: 1%;
      padding: 0.2rem;

    }

    .btn {
      margin-top: 0.625rem;
    }
  }
</style>
