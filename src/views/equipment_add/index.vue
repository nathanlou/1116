<template>
  <div class="overview_container ">
    <h2 style="text-align: center;center;margin-left: -8%; margin-bottom: 5%;">添加设备</h2>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
      <div style="display: flex;" size="mini">
        <el-form-item label="企业" prop="companyId" size="mini" style="width: 40%;margin-right: 8%;">
          <el-select v-model="ruleForm.companyId" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in companyName" :key="item.value" :label="item.companyName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号" prop="bh" size="mini" style="width: 40%;margin-right: 8%;">

          <el-input v-model="ruleForm.bh" />

        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="内部编号" prop="companyBh" style="width: 40%;margin-right: 8%;" size="mini">

          <el-input v-model="ruleForm.companyBh" />

        </el-form-item>
        <el-form-item label="SIM卡号" prop="sim" style="width: 40%;" size="mini">
          <el-input v-model="ruleForm.sim" />
        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="设备种类" prop="sblxId" style="width: 40%;margin-right: 8%;" size="mini">
          <el-select v-model="ruleForm.sblxId" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in sbzl_list" :key="item.value" :label="item.sblx" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="sbxh" style="width: 40%;" size="mini">
          <el-select v-model="ruleForm.sbxh" placeholder="请选择" style="width: 100%;">
            <el-option label="1型" value="1" />
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="工地负责人" prop="gdfzr" style="width: 40%;margin-right: 8%;" size="mini">
          <el-input v-model="ruleForm.gdfzr" />
        </el-form-item>
        <el-form-item label="手机号码" prop="gdfzrsj" style="width: 40%;" size="mini">
          <el-input v-model="ruleForm.gdfzrsj" />
        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="安装日期" required style="width: 40%;margin-right: 8%;" size="mini">
          <el-form-item prop="azrq" size="mini">
            <el-date-picker v-model="ruleForm.azrq" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-form-item>
        <el-form-item label="有效日期" required style="width: 40%;" size="mini">
          <el-form-item prop="yxrq" size="mini">
            <el-date-picker v-model="ruleForm.yxrq" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-form-item>
      </div>
      <div style="display: flex; margin-top: -1rem;">
        <el-form-item label="当前地址" prop="dqdz" style="width: 40%;margin-right: 8%;" size="mini">
          <el-input v-model="ruleForm.dqdz" />
        </el-form-item>
        <el-form-item label="生产企业" prop="scqy" style="width: 40%;" size="mini">
          <el-input v-model="ruleForm.scqy" />
        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="工地名称" prop="gdmc" style="width: 40%;margin-right: 8%;" size="mini">
          <el-input v-model="ruleForm.gdmc" />
        </el-form-item>
        <el-form-item label="控制器生产企业" prop="kzqScqy" style="width: 40%;" size="mini">
          <el-input v-model="ruleForm.kzqScqy" />
        </el-form-item>
      </div>
      <el-form-item style="text-align: center;margin-left: -10%;margin-top: 4%;">
        <el-button type="primary" :plain="true" size="mini" round @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button type="success" size="mini" round @click="resetForm('ruleForm')">重置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  company_listData,
  equipment_add,
  deviceType_listData
} from '@/api/getlist'
export default {
  data() {
    var cart = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('sim卡号不能为空'))
      }
      setTimeout(() => {
        if (Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value.length !== 13) {
            callback(new Error('必须13位'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    // 此处自定义校验手机号码js逻辑
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      companyName: '',
      ruleForm: {
        access_token: localStorage.getItem('accessToken'),
        action: 'save',
        companyId: '',
        bh: '',
        companyBh: '',
        sim: '',
        sblxId: '',
        sbxh: '',
        gdfzr: '',
        gdfzrsj: '',
        azrq: '',
        yxrq: '',
        dqdz: '',
        scqy: '',
        gdmc: '',
        kzqScqy: ''
      },
      rules: {
        bh: [{
          required: true,
          message: '该项为必填项',
          trigger: 'blur'
        }],
        companyBh: [{
          required: true,
          message: '该项为必填项',
          trigger: 'blur'
        }],
        gdfzr: [{
          required: true,
          message: '该项为必填项',
          trigger: 'blur'
        }],
        gdfzrsj: [{
          required: true,
          trigger: 'blur',
          validator: validatePhone
        }],
        sim: [{
          required: true,
          trigger: 'blur',
          validator: cart
        }],
        companyId: [{
          required: true,
          message: '该项为必填项',
          trigger: 'change'
        }],
        sblxId: [{
          required: true,
          message: '该项为必填项',
          trigger: 'change'
        }],
        sbxh: [{
          required: true,
          message: '该项为必填项',
          trigger: 'change'
        }],
        azrq: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        yxrq: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }]
      },
      sbzl_list: '',
      loading: false
    }
  },
  created() {
    var query = {
      access_token: localStorage.getItem('accessToken'),
      start: 0,
      length: '2000'
    }
    company_listData(query).then(res => {
      this.companyName = res.data
    })
    deviceType_listData(query).then(res => {
      this.sbzl_list = res.data
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const that = this
          equipment_add(that.ruleForm).then(res => {
            this.loading = false
            this.$message({
              message: '添加设备成功',
              type: 'success'
            })
            this.$router.push({
              path: ''
            })
            this.goback()
          })
            .catch(res => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goback() {
      this.$router.go(-1)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
	.overview_container {
		width: 90%;
		margin-left: 4%;
		margin-top: -2%;
		margin-right: 4%;
		color: gray;

	}
</style>
