<template>
  <div style="width: 95%;margin-left: 2.5%;">
    <div style="display: flex;width: 80%;">
      <div v-for="(item,index) in typeList" :key="index" class="head_con" style="display: flex;">
        <div class="cp_img">
          <img :src="item.img">
        </div>
        <div>
          <div style="text-align: left;">{{ item.key }}</div>
          <div style="text-align: left;margin-top: -0.5rem;">{{ item.value }}台</div>
        </div>
      </div>
    </div>
    <div style="width: 100%;align-items: center;display: flex;text-align: right;margin-right: 5%;color: gray;margin-top: 2%;">
      <div style="padding-right: 20px;">
        日期：
      </div>
      <el-date-picker
        v-model="dateInput"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        style="width:16rem;"
        @change="currentDateChange"
      />
    </div>
    <chart v-if="listCurveCom" height="100%" width="100%" style="margin-top: 1.5%;" :data-arr="listCurveCom" />
    <div class="enterpriseCard">
      <el-card v-for="(item,index) in companyList " :key="index" class="box-card">
        <div style="display: flex;justify-content: space-between;">
          <el-button round size="small" style="background-color: #55C2DD;color: #FFFFFF;">{{ item.isTest === 0 ? '正式企业' :'测试企业' }}&nbsp;|&nbsp;{{ item.isEnable === 1 ? '启用' : '停用' }}</el-button>
          <div class="div_number_bg">{{ index+1 }}</div>
        </div>
        <div class="card_text">{{ item.companyName }}</div>
        <div class="card_text"><span>负责人：</span><span>{{ item.lxr }}</span></div>
        <div class="card_text"><span>电&nbsp;话:</span><span>{{ item.tel }}</span></div>
        <div class="card_text">地址：{{ item.dz }}</div>
        <div class="card_text">创建时间：{{ item.createTime }}</div>
        <div style="background-color: #F0F2F5;height: 1px;margin: 3px 3px 3px 3px;" />
        <div class="card_text">总设备：{{ item.deviceNum }}台</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixCharttwo'

import {
  tjfxGetFltj,
  tjfxGetCompanyCurve
} from '@/api/statistics.js'

export default {
  components: {
    Chart
  },
  data() {
    return {
      typeList: [],
      listCurveCom: null, // 统计图信息
      companyList: [], // 企业信息列表
      dateInput: [new Date(new Date().getFullYear() + '-01-01 00:00:00'), new Date(new Date().getFullYear() +
          '-12-31 23:59:59')],
      queryData: {
        startDate: '',
        endDate: '',
        access_token: ''
      },
      head_arr: [{
        img: require('../../assets/img/yptkzy.png'),
        name: '云平台控制仪',
        value: '1526'
      },
      {
        img: require('../../assets/img/ssflj.png'),
        name: '砂石分离机',
        value: '1526'
      },
      {
        img: require('../../assets/img/xicheji.png'),
        name: '洗车机',
        value: '1526'
      },
      {
        img: require('../../assets/img/wupaoche.png'),
        name: '雾炮车',
        value: '1526'
      }
      ]
    }
  },
  created: function() {
    this.queryData.startDate = this.getThisYearFirstDay()
    this.queryData.endDate = this.getThisYearEndDay()
    this.queryData.access_token = localStorage.getItem('accessToken')
    this.selectData()
    this.selectType()
  },
  methods: {
    currentDateChange(timeArr) {
      if (timeArr.length === 2) {
        this.queryData.startDate = timeArr[0]
        this.queryData.endDate = timeArr[1]
        this.selectData()
      }
    },
    getThisYearFirstDay() {
      const date = new Date()
      return new Date(date.getFullYear() + '-01-01 00:00:00')
    },
    getThisYearEndDay() {
      const date = new Date()
      return new Date(date.getFullYear() + '-12-31 23:59:59')
    },
    getThisMonthFirstDay() {
      const date = new Date()
      date.setDate(1)
      return date
    },
    getThisMonthEndDay() {
      const date = new Date()
      let currentMonth = date.getMonth()
      const nextMonth = ++currentMonth
      const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      const oneDay = 1000 * 60 * 60 * 24
      return new Date(nextMonthFirstDay - oneDay)
    },
    selectType() {
      tjfxGetFltj(this.queryData).then(res => {
        const list = res.data
        for (var i in list) {
          list[i].img = require('../../assets/img/yptkzy.png')
        }
        this.typeList = list
      })
    },
    selectData() {
      tjfxGetCompanyCurve(this.queryData).then(res => {
        this.companyList = res.data.companyTop
        this.listCurveCom = res.data.listCurveCom
      })
    }
  }
}
</script>

<style scoped="scoped">
  .head_con {
    width: 25%;
    height: 3.125rem;
    line-height: 2;
    text-align: center;
    color: gray;
    font-weight: 700;
  }

  .cp_img {
    margin-right: 2%;
  }

  .cp_img img {
    width: 90%;
  }

  .enterpriseCard {
    margin: -25px 20px 20px 20px;
    display: flex;
    flex-wrap: wrap;

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

  .box-card {
    width: 18%;
    color: gray;
    margin: 8px;
  }

  .card_text {
    padding: 5px 0px 5px 12px;
  }

  @media screen and (max-width: 1024px) {
    .enterpriseCard {
      margin: -35px 20px 20px 20px;
      display: flex;
      flex-wrap: wrap;
      font-size: 0.8rem;

    }

    .box-card {
      width: 30%;
      color: gray;
      margin: 8px;

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
