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
        <el-table-column prop="sort" label="顺序" align="center" />
        <el-table-column prop="roleName" label="角色名称" align="center" />
        <el-table-column prop="roleType" label="类型" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.roleType==1">
              管理角色
            </div>
            <div v-else>
              企业角色
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" round plain @click="xiugai(scope.$index, scope.row)">分配权限</el-button>
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
      <el-tree ref="rootTree" :data="rootData" show-checkbox node-key="value" :default-checked-keys="defaultarr" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="czmmdialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="getKeys">确 定</el-button>
      </span>
    </el-dialog>
    <!-- socket -->
  </div>
</template>

<script>
import {
  sysRole_list,
  saveRoleModules
} from '@/api/sys'
export default {
  data() {
    return {
      defaultarr: [],
      czmmdialog: false,
      total: 1000, // 默认数据总数
      pagesize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      tableData: [],
      roleId: '',
      rootData: [{
        value: '60',
        label: '设备管理',
        children: [{
          value: '2001',
          label: '设备列表'
        },
        {
          value: '2002',
          label: '迁移纪录'
        }, {
          value: '2004',
          label: '操作记录'
        },
        {
          value: '2005',
          label: '报警记录'
        },
        {
          value: '2006',
          label: '设备监控'
        },
        {
          value: '2007',
          label: '设备设置'
        }
        ]
      },
      {
        value: '50',
        label: '统计查询',
        children: [{
          value: '4001',
          label: '设备分布'
        },
        {
          value: '4002',
          label: '数据统计'
        }
        ]
      },
      {
        value: '11',
        label: '企业管理',
        children: [{
          value: '1101',
          label: '企业管理'
        },
        {
          value: '1102',
          label: '企业用户'
        }, {
          value: '1103',
          label: '设备升级管理'
        },
        {
          value: '1104',
          label: '信息员管理'
        },
        {
          value: '1105',
          label: 'Logo设置'
        },
        {
          value: '1106',
          label: '发送通告'
        }
        ]
      },
      {
        value: '43',
        label: '系统管理',
        children: [{
          value: '4301',
          label: '用户管理'
        },
        {
          value: '4302',
          label: '系统配置'
        },
        {
          value: '4303',
          label: '系统日志'
        },
        {
          value: '4304',
          label: '添加种类'
        },
        {
          value: '4305',
          label: '角色管理'
        }
        ]
      }
      ]
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
      sysRole_list(query).then(res => {
        this.tableData = res.data
        this.total = res.recordsTotal
      })
    },
    xiugai(index, row) {
      this.czmmdialog = true
      this.roleId = row.id
      // console.log(row.id)
      // if(row.id === 'role_superManager'){
      // 	this.defaultarr = [60,50,11,43]
      // }
      // if(row.id === 'role_companyManager_sup'){
      // 	this.defaultarr = [60,50,1101,1102,1104,1105,1106,4301,4303]
      // }
      // if(row.id === 'role_companyManager'){
      // 	this.defaultarr = [60,50,1104]
      // }
      // if(row.id === 'role_sysManager'){
      // 	this.defaultarr = [60,50,1101,1102,1104,1105,1106,4301,4303]
      // }
    },
    handleCurrentChange(val) {
      var that = this
      that.query.start = (val - 1) * 20
      this.getlist(that.start)
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    getKeys() {
      var aKey = this.getCheckedKeys(this.rootData, this.$refs.rootTree.getCheckedKeys(), 'value')
      var moduleIds = aKey.toString()
      const query = {
        access_token: localStorage.getItem('accessToken'),
        roleId: this.roleId,
        moduleIds: moduleIds
      }
      saveRoleModules(query).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          location.reload()
        }
      })
    },
    getCheckedKeys(data, keys, key) {
      var res = []
      recursion(data, false)
      return res
      // arr -> 树形总数据
      // keys -> getCheckedKeys获取到的选中key值
      // isChild -> 用来判断是否是子节点
      function recursion(arr, isChild) {
        var aCheck = []
        for (var i = 0; i < arr.length; i++) {
          var obj = arr[i]
          aCheck[i] = false

          if (obj.children) {
            aCheck[i] = recursion(obj.children, true) ? true : aCheck[i]
            if (aCheck[i]) {
              res.push(obj[key])
            }
          }

          for (var j = 0; j < keys.length; j++) {
            if (obj[key] === keys[j]) {
              aCheck[i] = true
              if (res.indexOf(obj[key]) === -1) {
                res.push(obj[key])
              }
              break
            }
          }
        }
        if (isChild) {
          return aCheck.indexOf(true) !== -1
        }
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
