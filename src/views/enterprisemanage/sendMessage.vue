<template>
 <div class="containD">
      <div class="" style="margin-top: 0.625rem;">
        <span style="width:6rem;">选择企业：</span>
         <el-select v-model="enterpriseName" placeholder="请选择"  size='small'>
            <el-option
              v-for="item in optionsEnterPN"
              :key="item.value"
              :label="item.label"
              :value="item.value"
               size='small'
              >
            </el-option>
          </el-select>
      </div>
      <div style="display: flex;margin-top: 0.625rem;">
        <span style="width:5rem;">发送内容：</span>
         <el-input
           type="textarea"
           :rows="7"
           style="width: 30rem"
           placeholder="请输入内容"
           v-model="message">
         </el-input>
      </div>

     <div style="margin-top:2.5rem;margin-left:5.5rem;">  <el-button type="primary"   size='small'>发送通知</el-button></div>
 </div>


</template>

<script>
  export default {
     data() {
       return {

         optionsEnterPN: [{
           value: '潜合自动化',
           label: '潜合自动化'
         }, {
           value: '领先环保',
           label: '领先环保'
         }, {
           value: '山西日化',
           label: '山西日化'
         }, {
           value: '日新化工',
           label: '日新化工'
         }, {
           value: '鸿泰电器',
           label: '鸿泰电器'
         }],
         optionsrole: [{
           value: '超级管理员',
           label: '超级管理员'
         }, {
           value: '系统管理员',
           label: '系统管理员'
         }, {
           value: '管理员',
           label: '管理员'
         }, {
           value: '资料员',
           label: '资料员'
         },],
          enterpriseName:'',
          message:"",
       }
     },
     methods:{
           addAccountInfo(){
             console.log(this.userInfo)
           },
     }


   }
</script>

<style>
  .containD{
      margin-top: 0rem;
      margin-left: 2rem;
      color: gray;
  }
</style>
