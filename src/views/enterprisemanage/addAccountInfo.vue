<template>
   <div style="margin: 2%; color: gray;margin-left: 10%;">
     <h2 style="color: #1890FF;margin-bottom: 2rem;" >添加企业用户</h2>
      <div class="accountinfoD">
        <span class="accountinfoSpan">用户账号：</span>
        <el-input class="accountinfoinput" v-model="userInfo.account" placeholder="请输入用户账号"  ></el-input>
      </div>

      <div class="accountinfoD" style="margin-top: 0.625rem;">
        <span class="accountinfoSpan">用户密码：</span>
        <el-input class="accountinfoinput" v-model="userInfo.password" placeholder="请输入用户密码"  ></el-input>
      </div>

      <div class="accountinfoD" style="margin-top: 0.625rem;">
        <span class="accountinfoSpan">企业名称：</span>
         <el-select v-model="userInfo.enterpriseName" placeholder="请选择">
            <el-option
              v-for="item in optionsEnterPN"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>

      <div class="accountinfoD" style="margin-top: 0.625rem;">
        <span class="accountinfoSpan">管理角色：</span>
         <el-select v-model="userInfo.role" placeholder="请选择">
            <el-option
              v-for="item in optionsrole"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>

      <div class="accountinfoD" style="margin-top: 0.625rem;">
        <span class="accountinfoSpan">启用状态：</span>
         <el-select v-model="userInfo.isUser" placeholder="请选择">
            <el-option
              v-for="item in optionsisUser"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>

      <div class="accountinfoD"  style="margin-top: 0.625rem;">
        <span class="accountinfoSpan">联 系 人：</span>
        <el-input class="accountinfoinput" v-model="userInfo.contactPersion" placeholder="请输入联系人"  ></el-input>
      </div>

      <div class="accountinfoD"  style="margin-top: 0.625rem;">
        <span class="accountinfoSpan">联系电话：</span>
        <el-input class="accountinfoinput" v-model="userInfo.accountphone" placeholder="请输入联系电话"  ></el-input>
      </div>

      <div>

        <el-button type="primary" icon="el-icon-edit" style="margin-top: 2rem;margin-left: 6rem;" @click="addAccountInfo">添加新用户</el-button>
      </div>


   </div>
</template>

<script>
   export default {
      data() {
        return {
          userInfo: {
            account:'',
            password:'',
            enterpriseName:'',
            contactPersion:'',
            accountphone:"",
            isUser:'',
            role:'',
          },
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
          optionsisUser: [{
            value: '是',
            label: '是'
          }, {
            value: '否',
            label: '否'
          }, ],
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
 
  .accountinfoD{
    display: flex;
    align-items: center;

  }
  .accountinfoSpan{
    width: 5.5rem;
  }
  .accountinfoinput{
    width: 15rem;
  }
</style>
