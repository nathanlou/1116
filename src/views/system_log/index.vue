<template>
  <div class="titles">
    <div class="screen">
      <div>
        账号/姓名：
        <el-input v-model="qhkeyword" placeholder="用户账号" class="select" size="mini" />

        日期：
        <el-date-picker
          v-model="timevalue"
          value-format="yyyy-MM-dd"
          class="datatime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        />

      </div>
      <div>
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round @click="getlist">搜索</el-button>
      </div>
    </div>
    <div class="container_table">
      <div class="table_headr">系统日志</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 100%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size="mini"
      >
        <el-table-column prop="userName" label="用户账号" align="center" />
        <el-table-column prop="cont" label="操作内容" align="center" />
        <el-table-column prop="loginIp" label="操作IP" align="center" />
        <el-table-column prop="createTime" label="操作时间" align="center" />
      </el-table>
      <el-pagination
        class="fy"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {
  syslog
} from '@/api/sys'
export default {
  data() {
    return {
      timevalue: [],
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [],
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
      company_value: '',
      status_value: '',
      qhkeyword: '',
      bh: '',
      qyvalue: '',
      start: 0
    }
  },
  created: function() {
    this.handleCurrentChange()
    this.getlist()
  },
  methods: {
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    getlist() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        start: this.start,
        length: 20,
        queryName: this.qhkeyword,
        starDate: this.timevalue[0],
        endDate: this.timevalue[1]
      }
      syslog(query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    handleCurrentChange(val) {
      var that = this
      that.start = (val - 1) * 20
      this.getlist(that.start)
    }
  }
}
</script>

<style scoped="scoped">
	.titles {
		width: 99%;
		margin-left: 2%;
		height: 100%;
		margin-bottom: 1.25rem;
		font-size: 0.875rem;
		color: gray;
	}

	.screen {
		width: 98%;
		font-size: 0.875rem;
		display: flex;
		align-items: center;
		margin-bottom: 1%;
		justify-content: space-between;
		color: gray;
	}

	.select {
		width: 10rem;
		margin-right: 2%;
	}

	.table_headr {}

	.lxselect {
		width: 6rem;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}

	.container_table {
		width: 98%;
		clear: both;
	}

	.datatime {
		width: 40%;
	}

	@media screen and (max-width: 1024px) {
		.titles {
			font-size: 0.875rem;
			margin-top: -2%;
			color: gray;
		}

		.select {
			width: 10rem;
		}

		.datatime {
			width: 25%;

		}
	}
</style>
