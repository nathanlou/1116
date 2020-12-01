<template>
  <div class="containD">
    <div class="" style="margin-top: 0.625rem;">
      <span style="width:6rem;">选择企业：</span>
      <el-select v-model="qCompanyId" placeholder="请选择" class="select" size="mini" width="10%">
        <el-option key="all" label="全部" value="all" />
        <el-option v-for="item in company_list" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
    </div>
    <div class="" style="margin-top: 0.625rem;">
      <span style="width:6rem;">消息类型：</span>
      <el-select v-model="typevalue" placeholder="请选择" class="select" size="mini" width="10%">
        <el-option v-for="item in type_list" :key="item.value" :label="item.typeName" :value="item.id" />
      </el-select>
    </div>
    <div style="display: flex;margin-top: 0.625rem;">
      <span style="width:5rem;">发送内容：</span>
      <el-input v-model="message" type="textarea" :rows="7" style="width: 30rem" placeholder="请输入内容" />
    </div>
    <div style="margin-top:2.5rem;margin-left:5.5rem;">
      <el-button type="primary" size="small" @click="send_out">发送通知</el-button>
    </div>
    <div class="table_headr" style="margin-top: 15px;width: 95%;">已发送列表</div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      style="width: 95%;font-size: 13px;"
      :default-sort="{prop: 'date', order: 'descending'}"
      size="mini"
    >
      <el-table-column prop="sendTo" label="接收企业" align="center" />
      <el-table-column prop="cont" label="发送内容" align="center" />
      <el-table-column prop="typeName" label="消息类型" align="center" />
      <el-table-column prop="createUserName" label="发送人" align="center" />
      <el-table-column prop="createTime" label="发送时间" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" round plain @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fy"
      style="width: 95%;"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>

</template>

<script>
import {
  companyListCom
} from '@/api/companyManager.js'
import {
  msgCont_send,
  msgCont_listSend,
  msgCont_delete,
  msgType_listData
} from '@/api/companyUser'
export default {
  data() {
    return {
      qCompanyId: '',
      typevalue: '',
      type_list: '',
      company_list: [],
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      enterpriseName: '',
      message: '',
      tableData: [],
      start: 0,
      query: {
        access_token: localStorage.getItem('accessToken'),
        start: this.start,
        length: 10
      }
    }
  },
  created() {
    var query = {
      access_token: localStorage.getItem('accessToken'),
      start: 0,
      length: '2000'
    }
    this.total = this.tableData.length
    this.getlist()
    this.handleCurrentChange()
    companyListCom().then(res => {
      this.company_list = res.data
    })
    msgType_listData(query).then(res => {
      this.type_list = res.data
    })
  },
  methods: {
    send_out() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        sendToIds: this.qCompanyId,
        sendType: '1',
        typeId: this.typevalue,
        cont: this.message
      }
      msgCont_send(query).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          location.reload()
        }
      })
    },
    getlist() {
      const that = this
      msgCont_listSend(that.query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    del(index, row) {
      var mymessage = confirm('您确定删除吗?')
      if (mymessage === true) {
        const query = {
          access_token: localStorage.getItem('accessToken'),
          id: row.id
        }
        msgCont_delete(query).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            location.reload()
          }
        })
      }
    },
    handleCurrentChange(val) {
      var that = this
      that.query.start = (val - 1) * 10
      this.getlist(that.start)
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style>
	.containD {
		margin-top: 0rem;
		margin-left: 2rem;
		color: gray;
	}
</style>
