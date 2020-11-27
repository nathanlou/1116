<template>
  <div class="titles">
    <div class="container_table">
      <div class="table_headr">列表</div>
      <el-table ref="multipleTable" :data="tableData" border stripe style="width: 100%;font-size: 13px;" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="createName" label="通知人" align="center" />
        <el-table-column prop="typeName" label="消息类型" align="center" />
        <el-table-column prop="cont" label="通知内容" align="center" />
        <el-table-column prop="createTime" label="通知时间" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" round plain @click="confirm(scope.$index, scope.row)">确认查看</el-button>
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
    </div>
  </div>
</template>

<script>
import {
  msgReceive_listData,
  msgReceive_getDetail
} from '@/api/companyUser'
export default {
  data() {
    return {
      timevalue: '',
      czzh: '',
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [],
      start: 0,
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: this.start,
        length: 20
      }
    }
  },
  created: function() {
    this.total = this.tableData.length
    this.getlist()
  },
  methods: {
    getlist() {
      msgReceive_listData(this.query).then(res => {
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
    confirm(index, row) {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        id: row.id
      }
      msgReceive_getDetail(query).then(res => {

      })
    }
  }
}
</script>

<style scoped="scoped">
	.titles {
		width: 95%;
		margin-left: 2.5%;
	}
</style>
