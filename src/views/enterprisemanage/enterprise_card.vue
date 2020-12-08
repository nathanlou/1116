<template>
  <div>
    <!-- 搜索条件和添加企业信息 -->
    <div class="searchH">
      <!-- pc搜索条件-->
      <div class="searchT">
        <span class="searchText">企业名称：</span>
        <el-input v-model="pcsearchenterPriseInfo.name" placeholder="请输入内容" clearable style="width: 10%;" />
        <span class="searchText" style="margin-left: 1.25rem;margin-right: 5px;">企业类型：</span>
        <el-select v-model="pcsearchenterPriseInfo.type" placeholder="请选择" style="width: 10%;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span class="searchText" style="margin-left: 1.25rem;margin-right: 5px;">按设备数排序：</span>
        <el-select v-model="pcsearchenterPriseInfo.queryOrder" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in optionsN" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <span class="searchText" style="margin-left: 1.25rem;margin-right: 5px;">是否启用：</span>
        <el-select v-model="pcsearchenterPriseInfo.isUser" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in optionsIS" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

      </div>

      <!-- 搜索、添加企业 -->
      <div style="display: flex;margin-right: 160px;">
        <el-button type="primary" icon="el-icon-search" round size="mini" @click="companyList">搜索</el-button>
        <el-button type="primary" round size="mini" @click="controlForm('save')">添加企业</el-button>
      </div>
    </div>
    <!-- 公司信息card -->
    <div class="enterpriseCard">
      <el-card v-for="(item,i) in companys " :key="i" class="box-card">
        <div style="display: flex;justify-content: space-between;">
          <el-button round size="small" style="background-color: #55C2DD;color: #FFFFFF;">
            <span v-if="item.isTest==0">正式企业</span>
            <span v-else style="color: yellow;">测试企业</span>
            &nbsp;|&nbsp;<span v-if="item.isEnable==1">启用</span>
            <span v-else style="color: yellow;">禁止</span></el-button>
          <div class="div_number_bg">{{ i+1 }}</div>
        </div>
        <div class="card_text">{{ item.companyName }}</div>
        <div class="card_text"><span>负责人：</span><span>{{ item.lxr }}</span></div>
        <div class="card_text"><span>电&nbsp;话:</span><span>{{ item.lxdh }}</span></div>
        <div class="card_text">地址：{{ item.dz }}</div>
        <div class="card_text">创建时间：{{ item.createTime }}</div>
        <div style="background-color: #F0F2F5;height: 1px;margin: 3px 3px 3px 3px;" />
        <div class="card_text">总设备：{{ item.deviceNum }}台</div>
        <div class="card_text"><span>操作：</span>
          <!-- <el-button type="success" plain size="mini" round>查看</el-button> -->
          <el-button type="warning" plain size="mini" round @click="controlForm('update',item)">修改</el-button>
          <el-button type="danger" plain size="mini" round @click="handleDelete(index,item)">删除</el-button>
        </div>
      </el-card>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="fy"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="current_change"
    />

    <!-- 平板搜索条件-->
    <el-dialog title="搜索条件" :visible.sync="searchdialogVisible" width="48%" style="text-align: center;">
      <el-form :model="minisearchenterPriseInfo">
        <div style="margin: 0.625rem;">
          <span class="searc">企业名称：</span>
          <el-input v-model="pcsearchenterPriseInfo.name" placeholder="请输入企业名称" clearable style="width: 48%;" />
        </div>
        <div style="margin: 0.625rem;">
          <span class="searchText" style="">企业类型：</span>
          <el-select v-model="minisearchenterPriseInfo.type" placeholder="请选择" style="width: 48%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div style="margin: 0.625rem;">
          <span style="">是否启用：</span>
          <el-select v-model="minisearchenterPriseInfo.isUser" placeholder="请选择" style="width: 48%;">
            <el-option v-for="item in optionsIS" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div style="margin: 0.625rem;">
          <span class="searchText" style="">按设备数排序：</span>
          <el-select v-model="minisearchenterPriseInfo.queryOrder" placeholder="请选择" style="width: 42%;">
            <el-option v-for="item in optionsN" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="searchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="companyList">确 定</el-button>
      </div>
    </el-dialog>

    <!--企业信息表单-->
    <el-dialog :title="(form.action ==='save' ?'添加':'修改')+'企业信息'" width="35%" :visible.sync="showForm" style="text-align: center;">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-form-item label="企业名称" prop="companyName" :rules="[{ required: true, message: '请输入企业名称', trigger: 'blur' }]">
            <el-input v-model="form.companyName" maxlength="100" placeholder="请输入企业名称" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="lxr" :rules="[{ required: true, message: '请输入联系人', trigger: 'blur' }]">
              <el-input v-model="form.lxr" maxlength="100" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业类型" prop="isTest" :rules="[{ required: true, message: '请选择企业类型', trigger: 'blur' }]">
              <el-select v-model="form.isTest" placeholder="请选择企业类型" style="width:100%">
                <el-option label="正式企业" :value="0" />
                <el-option label="测试企业" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel" :rules="[{ required: true, message: '请输入手机号', trigger: 'blur'}]">
              <el-input v-model="form.tel" maxlength="11" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="lxdh" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
              <el-input v-model="form.lxdh" maxlength="13" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="是否启用">
              <el-switch v-model="form.isEnable" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公司地址" prop="dz" :rules="[{ required: true, message: '请输入公司地址', trigger: 'blur' }]">
          <el-input v-model="form.dz" maxlength="100" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.bz" type="textarea" placeholder="请输入备注" maxlength="200" />
        </el-form-item>
        <el-row type="flex" justify="start">
          <el-form-item>
            <el-button type="primary" @click="submit()">保存</el-button>
            <el-button @click="showForm = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- </div>
	</el-dialog> -->

  </div>
</template>

<script>
import {
  company_list,
  company_save,
  company_delete
} from '@/api/enterprise'
export default {
  data() {
    return {
      showForm: false,
      companys: [],
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '正式企业'
      }, {
        value: '1',
        label: '试用企业'
      }],
      optionsIS: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      optionsN: [{
        value: 'asc',
        label: '正序'
      }, {
        value: 'desc',
        label: '倒序'
      }],
      screenWidth: '',
      searchdialogVisible: false,
      adddialogVisible: false,
      updatedialogVisible: false,
      delDialogVisible: false,
      // 新增企业信息
      form: {
        access_token: localStorage.getItem('accessToken'),
        id: '',
        action: 'save',
        companyName: '',
        isTest: 0,
        dz: '',
        lxr: '',
        lxdh: '',
        isEnable: '',
        tel: '',
        bz: ''
      },
      pcsearchenterPriseInfo: {
        name: '',
        type: '',
        address: '',
        contactPerper: '',
        phone: '',
        isUser: '',
        queryOrder: ''// 顺序
      },
      minisearchenterPriseInfo: {
        name: '',
        type: '',
        address: '',
        contactPerper: '',
        phone: '',
        isUser: '',
        time: '',
        sort: ''
      },
      start: 0,
      currentPage: 1,
      pageSize: 20,
      total: 0

    }
  },
  created() {
    this.companyList()
  },
  methods: {
    // 删除数据
    handleDelete(index, row) {
      this.$confirm('是否确认删除企业[' + row.companyName + ']?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return company_delete({
          access_token: localStorage.getItem('accessToken'),
          id: row.id
        })
      }).then(() => {
        this.companyList()()
        this.$message.success('删除成功')
      }).catch(function() {})
    },
    // 控制表单
    controlForm(type, row) {
      // 如果是修改
      if (type === 'update') {
        this.form = JSON.parse(JSON.stringify(row))
      } else {
        this.form = {
          id: '',
          companyName: '',
          isTest: 0,
          dz: '',
          lxr: '',
          lxdh: '',
          isEnable: '',
          tel: '',
          bz: ''
        }
      }
      this.form.action = type
      this.form.access_token = localStorage.getItem('accessToken')
      this.showForm = true
    },
    // 查询列表
    companyList() {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth > 1100) {
        /* 表示pc端，弹窗隐藏*/
        this.searchdialogVisible = false
      } else {
        /* 表示平板端,弹窗显示*/
        this.searchdialogVisible = true
      }
      const query = {
        access_token: localStorage.getItem('accessToken'),
        start: this.currentPage - 1,
        length: this.pageSize,
        queryName: this.pcsearchenterPriseInfo.name,
        queryOrder: this.pcsearchenterPriseInfo.queryOrder,
		queryIsTest:this.pcsearchenterPriseInfo.type,
		queryIsEnable:this.pcsearchenterPriseInfo.isUser
      }
      company_list(query).then(res => {
        this.companys = res.data
        this.total = res.recordsTotal
      })
    },
    // 修改或保存企业
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          company_save(this.form).then(res => {
            this.$message.success(this.form.action === 'save' ? '添加成功' : '修改成功')
            this.companyList()
            this.showForm = false
          })
        } else {
          return false
        }
      })
    },
    searchDo() {

    },
    current_change(currentPage) {
      this.currentPage = currentPage
      this.companyList()
    }
  }

}
</script>

<style>
	/* 	* {
		font-family: Microsoft Yahei;
		padding: 0rem;
		margin: 0rem;
	} */

	.searchH {
		width: 100%;
		display: flex;

		color: gray;
		margin-top: -10px;
		margin-left: 70px;
	}

	.searchText {
		margin-left: 0.2rem;
		margin-right: 0.1rem;
	}

	.update-dialog-1 {
		width: 20%;
	}

	.qiyecreattime {
		width: 100px;
	}

	.box-card {
		width: 18%;
		color: gray;
		margin: 8px;

	}

	.el-card__body {
		padding: 10px;
	}

	.card_text {
		padding: 5px 0px 5px 8px;

	}

	.div_number_bg {
		background-image: url(../../assets/img/number_bg.png);
		background-repeat: no-repeat;
		background-size: auto;
		width: 15px;
		height: 25px;
		text-align: center;
		font-size: 12px;
		color: #FFFFFF;
	}

	.enterpriseCard {
		margin: 10px 20px 20px 60px;
		display: flex;
		flex-wrap: wrap;
	}

	@media screen and (max-width: 1024px) {

		* {
			font-size: 14px;
			font-family: Microsoft Yahei;
			padding: 0;
			margin: 0;

		}

		/* 隐藏pc的搜索条件*/
		.searchT {
			display: none;
		}

		.searchH {
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: gray;

			margin-left: 30px;

		}

		.enterpriseCard {
			margin: 5px 20px 20px 20px;
			display: flex;
			flex-wrap: wrap;
		}

		.enterpriseInput {
			width: 21%;
			padding: 0rem;
			margin: 0rem;
		}

		.qiyetypeselect {
			width: 20%;
		}

		.qiyecreattime {
			width: 5%;
		}

		.box-card {
			width: 30%;
			color: gray;
			margin: 8px;

		}

		.el-card__body {
			padding: 10px;
		}

		.card_text {
			padding: 5px 0px 5px 12px;

		}

		.div_number_bg {
			background-image: url(../../assets/img/number_bg.png);
			background-repeat: no-repeat;
			background-size: auto;
			width: 15px;
			height: 25px;
			text-align: center;
			font-size: 12px;
			color: #FFFFFF;
		}
	}
</style>
