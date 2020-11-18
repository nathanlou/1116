<template>
	<div class="titles">
		<div class="bigtitle" style="color: #1890ff;">添加设备种类</div>
		<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
			<el-tab-pane label="基础信息" name="first"  >
				<el-form ref="form" :model="form" label-width="85px">
					<el-form-item label="设备类型" size='small'>
						<el-input v-model="form.sblx" style="width: 18.75rem;"></el-input>
					</el-form-item>
					<el-form-item label="设备型号" size='small'>
						<el-input v-model="form.sblx" style="width: 18.75rem;"></el-input>
					</el-form-item>
					<el-form-item label="设备识别号" size='small'>
						<el-input v-model="form.xlh" style="width: 18.75rem;"></el-input>
					</el-form-item>
					<el-form-item label="设备图片" size='small'>
						<el-upload action="#" list-type="picture-card" :auto-upload="false" :limit='1' ref='upload'>
							<i slot="default" class="el-icon-plus"></i>
							<div slot="file" slot-scope="{file}">
								<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
								<span class="el-upload-list__item-actions">
									<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
										<i class="el-icon-zoom-in"></i>
									</span>
									<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file, fileList)">
										<i class="el-icon-delete"></i>
									</span>
								</span>
							</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="form.dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="设备描述" size='small'>
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.sbms" style="width: 18.75rem;" ></el-input>
					</el-form-item>
					<el-form-item label="设备属性" size='small'>
						<div style="display: flex;flex-wrap: wrap;">
							<el-form-item label="属性1" size='small' >
							    <el-input v-model="form.sx1" placeholder="例如(风力)"></el-input>
							  </el-form-item>
							  <el-form-item label="属性2"  size='small'>
							      <el-input v-model="form.sx2" placeholder="例如(压力)"></el-input>
							    </el-form-item>
							<el-form-item label="属性3" size='small'>
							    <el-input v-model="form.sx3" placeholder="例如(温度)"></el-input>
							 </el-form-item>
							 <el-form-item label="属性4" size='small'>
							     <el-input v-model="form.sx4" placeholder="例如(湿度)"></el-input>
							  </el-form-item>
							<el-form-item label="属性5" size='small'>
							    <el-input v-model="form.sx5"></el-input>
							  </el-form-item>
							  <el-form-item label="属性6" size='small'>
							      <el-input v-model="form.sx6"></el-input>
							    </el-form-item>
							<el-form-item label="属性7" size='small'>
							    <el-input v-model="form.sx7"></el-input>
							 </el-form-item>
							 <el-form-item label="属性8" size='small'>
							     <el-input v-model="form.sx8"></el-input>
							  </el-form-item>
							<el-form-item label="属性9" size='small'>
							    <el-input v-model="form.sx9" placeholder=""></el-input>
							  </el-form-item>
							  <el-form-item label="属性10" size='small'>
							      <el-input v-model="form.sx10" placeholder=""></el-input>
							    </el-form-item>
							<el-form-item label="属性11" size='small'>
							    <el-input v-model="form.sx11" placeholder=""></el-input>
							 </el-form-item>
							 <el-form-item label="属性12" size='small'>
							     <el-input v-model="form.sx12" placeholder=""></el-input>
							  </el-form-item>
						</div>
					</el-form-item>
					<el-form-item style="margin-left: 30%;">
						<el-button type="primary" size="medium" @click="onSubmit">立即创建</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="设备参数" name="second" >
				<el-form ref="form" :model="form" label-width="60px" size='small'>
					<el-form-item  size='small'>
            <span style="font-weight: 700;font-size: 1rem;">设备参数名称</span>
						<div style="display: flex;flex-wrap: wrap;">
							<el-form-item label="名称1" size='small' class='labelcolor'>
							    <el-input v-model="form2.sx1" placeholder="例如(脉冲间隔)" size='small'  ></el-input>
							  </el-form-item>
							  <el-form-item label="名称2" size='small'  class='deviderLeft'>
							      <el-input v-model="form2.sx2" placeholder="例如(室间隔)"></el-input>
							    </el-form-item>
							<el-form-item label="名称3" size='small'>
							    <el-input v-model="form2.sx3" placeholder="例如(周期间隔)"></el-input>
							 </el-form-item>
							 <el-form-item label="名称4" size='small' class='deviderLeft'>
							     <el-input v-model="form2.sx4" placeholder="例如(心跳间隔)"></el-input>
							  </el-form-item>
							<el-form-item label="名称5" size='small'>
							    <el-input v-model="form2.sx5"></el-input>
							  </el-form-item>
							  <el-form-item label="名称6" size='small' class='deviderLeft'>
							      <el-input v-model="form2.sx6"></el-input>
							    </el-form-item>
							<el-form-item label="名称7" size='small'>
							    <el-input v-model="form2.sx7"></el-input>
							 </el-form-item>
							 <el-form-item label="名称8" size='small' class='deviderLeft'>
							     <el-input v-model="form2.sx8"></el-input>
							  </el-form-item>
							<el-form-item label="名称9" size='small'>
							    <el-input v-model="form2.sx9" placeholder=""></el-input>
							  </el-form-item>
							  <el-form-item label="名称10" size='small' class='deviderLeft'>
							      <el-input v-model="form2.sx10" placeholder=""></el-input>
							    </el-form-item>
							<el-form-item label="名称11" size='small'>
							    <el-input v-model="form2.sx11" placeholder=""></el-input>
							 </el-form-item>
							 <el-form-item label="名称12" size='small' class='deviderLeft'>
							     <el-input v-model="form2.sx12" placeholder=""></el-input>
							  </el-form-item>
						</div>
					</el-form-item>
					<el-form-item style="margin-left: 30%;" size='small'>
						<el-button type="primary" size="small" @click="onSubmit2" >立即创建</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'first',
				dialogVisible: false,
				disabled: false,
				form: {
					sblx: '',
					sbxh: '',
					xlh: '',
					dialogImageUrl: '',
					sbms: '',
					sx1:'',
					sx2:'',
					sx3:'',
					sx4:'',
					sx5:'',
					sx6:'',
					sx7:'',
					sx8:'',
					sx9:'',
					sx10:'',
					sx11:'',
					sx12:'',
				},
				form2: {
					sx1:'',
					sx2:'',
					sx3:'',
					sx4:'',
					sx5:'',
					sx6:'',
					sx7:'',
					sx8:'',
					sx9:'',
					sx10:'',
					sx11:'',
					sx12:'',
				}
			};
		},
		methods: {
			handleClick(tab, event) {

			},
			onSubmit() {
				console.log('submit!');
			},
			onSubmit2() {
				console.log('submit!');
			},
			handleRemove(file) {
				this.$refs.upload.clearFiles()
			},
			handlePictureCardPreview(file) {
				this.form.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
		}
	};
</script>

<style>

  .titles {
  	width: 96%;
  	margin-left: 2%;

  	height: 100%;
  	margin-bottom: 1.25rem;
  	font-size: 0.875rem;
    color: gray;
  }
	.el-form-item .el-form-item {
	    margin-bottom: 6px;
	}
  .el-form-item__label{
    color: gray;
    font-weight: 500;
  }
  .deviderLeft{
    margin-left: 2%;
  }

  	@media screen and (max-width: 1024px) {
         .titles {
         	width: 99%;
         	margin-left: 2%;
          margin-top: -1.5%;
         	margin-bottom: 1.25rem;
         	font-size: 0.875rem;

         }
    }
</style>
