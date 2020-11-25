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
        <el-upload ref="upload" action="#" list-type="picture-card" :auto-upload="false" :limit="1">
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="(file)">
                <i class="el-icon-zoom-in" />
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file, fileList)">
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
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
export default {
  data() {
    return {
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
    })
  },
  created: function() {

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
    handleRemove(file) {
      this.$refs.upload.clearFiles()
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
