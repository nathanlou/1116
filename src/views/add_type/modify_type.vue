<template>
  <div class="overview_container">
    <h2 style="text-align: center;center;margin-left: -8%; margin-bottom: 2%;">修改种类信息</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="设备类型" prop="sblx" size="small">
        <el-input v-model="form.sblx" style="width: 18.75rem;" />
      </el-form-item>
      <el-form-item label="设备型号" prop="sbxh" size="small">
        <el-input v-model="form.sbxh" style="width: 18.75rem;" />
      </el-form-item>
      <el-form-item label="设备识别号" size="small" prop="sbxlh">
        <el-input v-model="form.sbxlh" style="width: 18.75rem;" />
      </el-form-item>
      <el-form-item label="类型 ID" prop="id" size="small">
        <el-input v-model="form.id" style="width: 18.75rem;" />
      </el-form-item>
      <el-form-item label="设备图片" size="small">
        <el-upload
          multiple
          accept="image/png,image/jpg,image/gif,image/jpeg"
          action="#"
          list-type="picture-card"
          :file-list="imgList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :http-request="uploadFile"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="form.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="设备描述" size="small">
        <el-input v-model="form.ms" type="textarea" :rows="2" placeholder="请输入内容" style="width: 18.75rem;" />
      </el-form-item>
      <el-form-item style="margin-left: 30%;">
        <el-button type="primary" size="medium" :loading="loading" @click="add('form')">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addtype
} from '@/api/sys'
import {
  deviceTypeGetDetail
} from '@/api/deviceSetUp'

import request from '@/utils/request'

export default {
  data() {
    return {
      imgList: [],
      fileList: [],
      disabled: false,
      loading: false,
      form: {},
      rules: {
        sblx: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        sbxh: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        id: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }],
        sbxlh: [{
          required: true,
          message: '此项为必填项',
          trigger: 'blur'
        }]
      },
      dialogVisible: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.form = JSON.parse(to.query.rowData)
      deviceTypeGetDetail({
        id: vm.form.id,
        'access_token': localStorage.getItem('accessToken')
      }).then(res => {
        const arr = res.data.imgList
        arr.forEach(item => {
          item.url = process.env.VUE_APP_BASE_API + item.filePath
        })
        vm.imgList = arr
      })
    })
  },
  created: function() {
    /*  */
  },
  methods: {
    add(formName) {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        action: 'update',
        sblx: this.form.sblx,
        sbxh: this.form.sbxh,
        id: this.form.id,
        ms: this.form.ms,
        sbxlh: this.form.sbxlh
        // dialogImageUrl: '',
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addtype(query).then(res => {
            this.loading = false
            this.$router.go(-1)
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    uploadFile(param) {
      const formData = new FormData()
      formData.append('access_token', localStorage.getItem('accessToken'))
      formData.append('busiType', 'deviceCategory')
      formData.append('busiInType', 'deviceCategoryList')
      formData.append('refId', this.form.id)
      formData.append('file', param.file)
      // 新增图片
      const that = this
      this.$http({
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/common/commonLog_upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function(res) {
        if (res.status === 200) {
          const arr = that.imgList
          const item = res.data.data[0]
          item.url = process.env.VUE_APP_BASE_API + item.filePath
          arr.push(item)
          that.imgList = arr
        }
      })
    },
    handleRemove(file, fileList) {
      request({
        url: '/common/commonFile_delete',
        method: 'post',
        params: {
          access_token: localStorage.getItem('accessToken'),
          id: file.id
        }
      }).then(res => {
        console.log(res)
      })
    },
    handlePictureCardPreview(file) {
      this.form.dialogImageUrl = file.url
      this.dialogVisible = true
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
