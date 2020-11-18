<template>
  <div class="titles">
    <div class="screen">
      企业：
      <el-select v-model="company_value" placeholder="请选择" class="select" size="mini" width='10%'   >
        <el-option v-for="item in company_list" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      关键字：<el-input v-model="qhkeyword" placeholder="编号/内部编号" class="select"  size="mini"/>
      类型：<el-select v-model="style_value" placeholder="请选择" class="select"  size="mini">
        <el-option v-for="item in style_list" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      日期：<el-date-picker v-model="timevalue" type="daterange"
      range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期"  size="mini" style="width: 25%;"/>

      <span style="float: right;margin-right: 1.5%;">
        <el-button class="btn" type="primary" icon="el-icon-search" size="mini" round>搜索</el-button>
        <el-button class="btn" type="danger" icon="el-icon-delete" size="mini" @click="deletes()"  round>批量删除</el-button>
      </span>
    </div>
    <div class="container_table">
			<div class="table_headr">迁移列表</div>
      <el-table
        size='mini'
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        stripe
        style="width: 100%;font-size: 13px;"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column prop="bh" sortable label="设备编号" align="center" width="170" />
        <el-table-column prop="nbbh" sortable label="内部编号" align="center" />
        <el-table-column prop="qyri" label="迁移日期" align="center" />
        <el-table-column prop="qyqqy" label="迁移前企业" align="center" />
        <el-table-column prop="qyhqy" label="迁移后企业" align="center" />
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="xiugai(scope.$index, scope.row)" round>修改</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        layout="total,prev, pager, next"
        :total="total"
        background
        @current-change="current_change"
      />
      <el-dialog title="修改" :visible.sync="dialogVisible" width="35%">
        <div>
          <div style="margin-bottom: 0.625rem;">设备编号：{{ bh }}</div>
          <div>
            迁移企业：<el-select v-model="qyvalue" placeholder="请选择">
              <el-option v-for="item in qycompany" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      timevalue: '',
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      tableData: [{
        bh: 'QHW001G210290201',
        nbbh: 'qh001',
        gdmc: '新乡火炬园',
        qyri: '2020-04-19',
        qyqqy: '潜合测试',
        qyhqy: '客户体验'
      },
      {
        bh: 'QHW001G210290202',
        nbbh: 'qh001',
        gdmc: '新乡火炬园',
        qyri: '2020-04-19',
        qyqqy: '潜合测试',
        qyhqy: '客户体验'
      }
      ],
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
      style_list: [{
        value: '选项0',
        label: '全部'
      }, {
        value: '选项1',
        label: 'YLY1'
      }, {
        value: '选项2',
        label: '智能除尘'
      }],
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
      qhkeyword: '',
      bh: '',
      qyvalue: ''
    }
  },
  created: function() {
    this.total = this.tableData.length
  },
  methods: {
    xiugai(index,row) {
      this.dialogVisible = true
      this.bh = row.bh
    },
    handleDelete(index, row) {
			        this.tableData.splice(index, 1)
			      },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    deletes() {
      this.selectionDatas = []
      var arr = []
      var data = this.$refs.multipleTable.selection
      if (data.length == 0) {
        this.$alert('您没有任何选择', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      } else {
        data.forEach(function(item) {
          arr.push(item.bh)
        })
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }

      // 				request.delete(apis.manageModel, arr)
      // 					.then(function(response) {
      // 						if (response.data.code == 200) {
      //
      // 						}
      // 					})
      // 					.catch(function(error) {
      // 						console.log(error);
      // 					});
    }
  }
}
</script>

<style scoped="scoped">
	.screen {
		font-size: 0.875rem;
    color: gray;
	}
.table_headr{
    height: 2rem;
    line-height: 2rem;
    color: white;
    background-color: #409EFF ;
  }
	.select {
		width: 7rem;
	}

	.fy {
		text-align: right;
		margin-top: 0.625rem;
	}

	.titles {
	width: 95%;
		margin-left: 1rem;
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
        width:6.7rem;

        margin-right: 1rem;
      }

      .btn {
        margin-top: 0.625rem;
      }
    }
</style>
