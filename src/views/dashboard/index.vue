<template>
  <div class="dashboard-container">
    <!-- 总览版块开始 -->
    <div class="overview_container">
      <div v-for="(item,index) in overviews" :key="index" class="overview">
        <div class="left_img">
          <img :src="item.img">
        </div>
        <div class="right_text">
          <div class="title">{{ item.title }}</div>
          <div class="num">{{ item.num }}</div>
          <div class="text">
             <img :src="item.numimg" style="width: 1.25rem;height: 1.25rem;">
             <div> 同比上个月{{ item.increase }}%</div>
            </div>
        </div>
      </div>
    </div>
    <!-- 总览版块开始 -->
    <!-- 设备运行统计图开始 -->
    <div class="chart-container">
      <chart height="100%" width="98%" style="margin-left: 1%;margin-top: 1.5%;" />
    </div>
    <!-- 设备运行统计图结束 -->

    <div style="width: 98%;margin-left: 1%;display: flex;margin-top: -1.5rem;">
      <!-- 地图开始 -->
      <div style="width: 34%;background-color: white;
      padding: 1%;margin-bottom: 1%;
      box-shadow: 5px 3px 5px 0px rgba(100,94,94,0.15);
       border-radius: 0.6rem;
      ">
        <Keyboard />
      </div>
      <!-- 地图结束 -->
      <!-- 饼状图开始 -->
      <div style="width: 34%;background-color: white;padding: 1%;margin-bottom: 1%;
      margin-left: 1%;box-shadow: 5px 3px 5px 0px rgba(100,94,94,0.15);
       border-radius: 0.6rem;
      ">
        <LineMarker />
      </div>
      <!-- 饼状图结束 -->

      <!-- 通告信息开始 -->
      <div style="width: 30%;background-color: white;
      border-radius: 0.6rem;
      padding: 1%;margin-bottom: 1%;margin-left: 1%;
      box-shadow: 5px 3px 5px 0px rgba(100,94,94,0.15);">
        <div class="tonggao">
          <div style='font-size: 1rem;color: gray;font-weight: 700;display:flex;align-items: center;'>
            <img src="../../assets/img/notice.png">
            <div style="margin-left: 0.4rem;margin-top: 0.2rem;">通告信息</div>

            </div>
          <ul v-for="(item,index) in announcement" :key="index" >
            <li class="text">
              <span style="color: #399EF4;margin-right: 0.4rem;"> [{{ item.time }}]</span>
              <span style="">{{ item.msg }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 通告信息结束 -->
    </div>
  </div>
</template>

<script>
  import Chart from '@/components/Charts/MixChart'
  import Keyboard from '@/components/Charts/Keyboard'
  import LineMarker from '@/components/Charts/LineMarker'
  export default {
    name: 'Dashboard',
    components: {
      Chart,
      Keyboard,
      LineMarker
    },
    data() {
      return {
        overviews: [{
            title: '总监控设备',
            num: '5800',
            increase: '32',
            img: require('../../assets/img/device.png'),
            numimg:require('../../assets/img/up.png'),
            bgcolor: '#a771c7'
          },
          {
            title: '在线设备',
            num: '5800',
            increase: '32',
            img: require('../../assets/img/online.png'),
              numimg:require('../../assets/img/up.png'),
            bgcolor: '#46b99c'
          },
          {
            title: '离线设备',
            num: '5800',
            increase: '32',
            img: require('../../assets/img/noonline.png'),
              numimg:require('../../assets/img/down.png'),
            bgcolor: '#a1ca46'
          },
          {
            title: '今日预警',
            num: '5800',
            increase: '32',
            img: require('../../assets/img/yujing.png'),
              numimg:require('../../assets/img/up.png'),
            bgcolor: '#f87e3d'
          },
          {
            title: '累计运行时间',
            num: '5800',
            increase: '32',
            img: require('../../assets/img/time.png'),
              numimg:require('../../assets/img/down.png'),
            bgcolor: '#00acee'
          }
        ],
        announcement: [{
            time: '2020-10-23 08:29',
            msg: '管理员通知,A1002设备标定异常，请及时关注'
          },
          {
            time: '2020-10-23 08:29',
            msg: '管理员通知,A1002设备标定异常，请及时关注'
          },
          {
            time: '2020-10-23 08:29',
            msg: '管理员通知,A1002设备标定异常，请及时关注'
          },
          {
            time: '2020-10-23 08:29',
            msg: '管理员通知,A1002设备标定异常，请及时关注'
          },
          {
            time: '2020-10-23 08:29',
            msg: '管理员通知,A1002设备标定异常，请及时关注'
          },
          
        ]
      }
    },
    computed: {

    },
    mounted() {},
    created() {},
    methods: {}
  }
</script>
<style scoped="scoped">
  body {
    background-color: #f9f9f9;
    color: gray;
  }
  .dashboard-container{
	  margin-top: -2.125rem;
  }
  .overview_container {
    width: 98%;
    margin-left: 1%;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;


  }

  .overview {
    width: 24%;
    display: flex;
    color: gray;
    margin-right: 0.3rem;
    height: 25%;
    padding: 1.5%;
    margin-top: 1%;
    background-color: white;
    box-shadow: 5px 3px 5px 0px rgba(100, 94, 94, 0.25);
    -webkit-box-shadow:  5px 3px 5px 0px  rgba(100, 94, 94, 0.25);
    -moz-box-shadow: 5px 3px 5px 0px rgba(100, 94, 94, 0.25);
  }

  .left_img {
    width: 2.5rem;
    display: table-cell;
  }

  .left_img img {
    width: 100%;
  }

  .right_text {
    margin-left: 0.3rem;
    text-align: right;
    line-height: 1.5;
  }

  .chart-container {
    position: relative;
    width: 100%;
    height: 22rem;
  }

  .num {
    color: #399EF4;
    font-weight: 700;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

  }
  .text {
    display: flex;


    margin-left: -2rem;
    font-size: 0.8rem;
    color: gray;
  }

  @media screen and (max-width: 1024px) {
    .right_text {

      line-height: 1;
      text-align: right;
    }

    .title {
      font-size: 0.875rem;
    }

    .num {
      font-size: 0.9rem;
    }

    .text {
       display: flex;

       margin-left: -2rem;
       font-size: 0.65rem;
       color: gray;
    }
    .chart-container {
      position: relative;
      width: 100%;
      height: 18.5rem;
    }
  }
</style>
