<template>
  <div class="containD">
    <el-form ref="form" enctype="multipart/form-data" :model="form" label-width="100px">
      <el-form-item label="选择企业" prop="companyId" :rules="[{ required: true, message: '请选择企业', trigger: 'blur' }]">
        <el-select v-model="form.companyId" placeholder="请选择" style="width: 50%;">
          <el-option v-for="item in optionsEnterPN" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择Logo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">只能上传.png文件，且不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">上传保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  companyListCom
} from '@/api/companyManager.js'

export default {
  data() {
    return {
      imageUrl: '',
      fileList: [],
      form: {
        access_token: localStorage.getItem('accessToken'),
        companyId: '',
        file: ''
      },
      formData: new FormData(),
      optionsEnterPN: [],
      enterpriseName: ''
    }
  },
  created() {
    // 加载企业下拉框
    companyListCom().then(res => {
      this.optionsEnterPN = res.data
    })
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2M!')
      }
      this.formData.append('file', file) // 文件对象
      this.form.file = file.name
      return isPNG && isLt2M
    },
    addAccountInfo() {
      console.log(this.userInfo)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formData.append('access_token', this.form.access_token)
          this.formData.append('companyId', this.form.companyId)
          const that = this
          this.$http({
            method: 'post',
            url: process.env.VUE_APP_BASE_API + '/qygl/company_updateLogo',
            data: this.formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function(res) {
            console.log(res)
            if (res.data.status === 200) {
              that.$message.success('上传成功')
            }
          })
        } else {
          return false
        }
      })
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

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
