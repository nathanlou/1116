<template>
  <div class="titles">
    <div class="container_table">
      <div class="table_headr">系统配置</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 100%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size="mini"
      >
        <el-table-column prop="name" label="属性名" align="center" />
        <el-table-column prop="type" label="类型" align="center" />
        <el-table-column prop="value" label="属性值" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" round plain @click="xiugai(scope.$index, scope.row)">修改</el-button>
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
    <!-- socket -->
    <el-dialog title="修改系统参数" :visible.sync="czmmdialog" width="30%">
      <el-form ref="ruleForm" status-icon label-width="80px" class="demo-ruleForm">
        <el-form-item label="属性名" prop="age" size="mini">
          {{ name }}
        </el-form-item>
        <el-form-item label="类型" prop="pass" size="mini">
          {{ style }}
        </el-form-item>
        <el-form-item label="属性值" prop="checkPass" size="mini">
          <el-switch v-if="id=='socketOpen'" v-model="value" active-value="0" inactive-value="1" />
          <el-input v-else="" v-model="value" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="czmmdialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm(id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- socket -->
  </div>
</template>

<script>
import {
  syspar,
  sysxg
} from '@/api/sys'
export default {
  data() {
    return {
      czmmdialog: false,
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [],
      value: '',
      style: '',
      name: '',
      start: 0,
      id: ''
    }
  },
  created: function() {
    this.total = this.tableData.length
    this.getlist()
  },
  methods: {
    getlist() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        start: this.start,
        length: 20
      }
      syspar(query).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    xiugai(index, row) {
      this.czmmdialog = true
      this.name = row.name
      this.style = row.type
      this.value = row.value
      this.id = row.id
    },
    handleCurrentChange(val) {
      var that = this
      that.query.start = (val - 1) * 20
      this.getlist(that.start)
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    submitForm(id) {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        action: 'update',
        value: this.value,
        id: id
      }
      var mymessage = confirm('您确定修改吗?')
      if (mymessage === true) {
        sysxg(query).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          location.reload()
        })
      }
    }
  }
}
</script>

<style scoped="scoped">
	.screen {
		font-size: 0.875rem;
	}

	.select {
		width: 10rem;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}

	.titles {
		width: 95%;
		margin-left: 2.5%;
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

		.selects {
			width: 11rem;
		}

		.select {
			width: 13rem;
		}

		.btn {
			margin-top: 0.625rem;
		}
	}
</style>
