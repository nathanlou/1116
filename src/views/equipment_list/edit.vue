<template>
  <div class="overview_container">
    <h2 style="text-align: center;center;margin-left: -8%; margin-bottom: 2%;">修改设备信息</h2>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" label-position="right" class="demo-ruleForm">
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="企业" prop="company" size="mini" style="color: gray;">
          <el-input v-model="ruleForm.companyName" disabled />
        </el-form-item>
        <el-form-item label="设备编号" prop="bh" style="width: 45%;">
          <el-input v-model="ruleForm.bh" />
        </el-form-item>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="内部编号" prop="companyBh" style="width: 45%;">
          <el-input v-model="ruleForm.companyBh" />
        </el-form-item>
        <el-form-item label="SIM卡号" prop="sim" style="width: 45%;">
          <el-input v-model="ruleForm.sim" />
        </el-form-item>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="设备种类" prop="sblxId" style="width: 45%;">
          <el-select v-model="ruleForm.sblxId" placeholder="请选择">
            <el-option v-for="item in sbzl_list" :key="item.value" :label="item.sblx" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="sbxh" style="width: 45%;">
          <el-select v-model="ruleForm.sbxh" placeholder="请选择">
            <el-option label="1型" value="1" />
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="工地负责人" prop="gdfzr" style="width: 45%;">
          <el-input v-model="ruleForm.gdfzr" />
        </el-form-item>
        <el-form-item label="手机号码" prop="gdfzrsj" style="width: 45%;">
          <el-input v-model="ruleForm.gdfzrsj" />
        </el-form-item>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="安装日期" style="width: 45%;">
          <el-form-item prop="azrq">
            <el-date-picker v-model="ruleForm.azrq" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-form-item>
        <el-form-item label="有效日期" style="width: 45%;">
          <el-form-item prop="yxrq">
            <el-date-picker v-model="ruleForm.yxrq" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-form-item>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="当前地址" prop="dqdz" style="width: 45%;">
          <el-input v-model="ruleForm.dqdz" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="scqy" style="width: 45%;">
          <el-input v-model="ruleForm.scqy" />
        </el-form-item>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <el-form-item label="工地名称" prop="gdmc" style="width: 45%;">
          <el-input v-model="ruleForm.gdmc" />
        </el-form-item>
        <el-form-item label="控制器生产企业" prop="kzqScqy" style="width: 45%;">
          <el-input v-model="ruleForm.kzqScqy" />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  equipment_add,
  equipment_msg,
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
      loading: false,
      ruleForm: {
        company: '',
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
        sblxId: [{
          required: true,
          message: '该项为必填项',
          trigger: 'change'
        }],
        sbxh: [{
          required: true,
          message: '该项为必填项',
          trigger: 'change'
        }]
      },
      sbzl_list: ''
    }
  },
  created: function() {
    var query = {
      access_token: localStorage.getItem('accessToken'),
      start: 0,
      length: '2000'
    }
    this.equipment_msg()
    deviceType_listData(query).then(res => {
      this.sbzl_list = res.data
    })
  },
  methods: {
    equipment_msg() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        id: localStorage.getItem('id')
      }
      equipment_msg(query).then(res => {
        console.log(res)
        this.ruleForm = res.data
      })
    },
    submitForm(formName) {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        action: 'update',
        id: this.ruleForm.id,
        companyId: this.ruleForm.companyId,
        bh: this.ruleForm.bh,
        companyBh: this.ruleForm.companyBh,
        sim: this.ruleForm.sim,
        gdmc: this.ruleForm.gdmc,
        gdfzr: this.ruleForm.gdfzr,
        gdfzrsj: this.ruleForm.gdfzrsj,
        scqy: this.ruleForm.scqy,
        kzqScqy: this.ruleForm.kzqScqy,
        sbxh: this.ruleForm.sbxh,
        sblxId: this.ruleForm.sblxId,
        yxrq: this.ruleForm.yxrq,
        dqdz: this.ruleForm.dqdz,
        azrq: this.ruleForm.azrq
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          equipment_add(query).then(res => {
            this.loading = false
            this.goback()
          })
            .catch(() => {
              this.goback()
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          this.loading = false
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
		width: 95%;
		margin-left: 2%;
		color: gray;
		margin-top: 1%;
	}
</style>
