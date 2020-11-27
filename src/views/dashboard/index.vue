<template>
  <div class="dashboard-container">
    <!-- 总览版块开始 -->
    <div class="overview_container">
      <div class="overview" @click="all()">
        <div class="left_img">
          <img src="../../assets/img/device.png">
        </div>
        <div class="right_text">
          <div class="title">总设备数量</div>
          <div class="num">{{ overviews.all }}</div>
        </div>
      </div>
      <div class="overview" @click="all('online')">
        <div class="left_img">
          <img src="../../assets/img/online.png">
        </div>
        <div class="right_text">
          <div class="title">在线设备</div>
          <div class="num">{{ overviews.online }}</div>
        </div>
      </div>
      <div class="overview" @click="all('online')">
        <div class="left_img">
          <img src="../../assets/img/in_use.png">
        </div>
        <div class="right_text">
          <div class="title">在用设备</div>
          <div class="num">0</div>
        </div>
      </div>
      <div class="overview" @click="all('offline')">
        <div class="left_img">
          <img src="../../assets/img/noonline.png">
        </div>
        <div class="right_text">
          <div class="title">离线设备</div>
          <div class="num">{{ overviews.offline }}</div>
        </div>
      </div>
      <div class="overview" @click="warning">
        <div class="left_img">
          <img src="../../assets/img/yujing.png">
        </div>
        <div class="right_text">
          <div class="title">今日预警</div>
          <div class="num">{{ overviews.todayAlarm }}</div>
        </div>
      </div>
      <!-- <div class="overview">
        <div class="left_img">
          <img src="../../assets/img/time.png">
        </div>
        <div class="right_text">
          <div class="title">累计运行时间</div>
          <div class="num">{{ overviews.sumRunTime }}</div>
        </div>
      </div> -->
    </div>
    <!-- 总览版块开始 -->
    <!-- 设备运行统计图开始 -->
    <div class="chart-container">
      <chart height="100%" width="98%" style="margin-left: 1%;margin-top: 1.5%;" />
    </div>
    <!-- 设备运行统计图结束 -->

    <div style="width: 98%;margin-left: 1%;display: flex;margin-top: 0.5rem;">
      <!-- 地图开始 -->
      <div
        style="width: 34%;background-color: white;
      padding: 1%;margin-bottom: 1%;
      box-shadow: 5px 3px 5px 0px rgba(100,94,94,0.15);
       border-radius: 0.6rem;
      "
        @click="map"
      >
        <Keyboard />
      </div>
      <!-- 地图结束 -->
      <!-- 饼状图开始 -->
      <div
        style="width: 34%;background-color: white;padding: 1%;margin-bottom: 1%;
      margin-left: 1%;box-shadow: 5px 3px 5px 0px rgba(100,94,94,0.15);
       border-radius: 0.6rem;
      "
      >
        <LineMarker />
      </div>
      <!-- 饼状图结束 -->

      <!-- 通告信息开始 -->
      <div
        style="width: 30%;background-color: white;
      border-radius: 0.6rem;
      padding: 1%;margin-bottom: 1%;margin-left: 1%;
      box-shadow: 5px 3px 5px 0px rgba(100,94,94,0.15);"
      >
        <div class="tonggao">
          <div style="font-size: 1rem;color: gray;font-weight: 700;display:flex;align-items: center;">
            <img src="../../assets/img/notice.png">
            <div style="margin-left: 0.4rem;margin-top: 0.2rem;">通告信息</div>

          </div>
          <ul v-for="(item,index) in announcement" :key="index">
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
import {
  indexdata
} from '@/api/globaldata'
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
      overviews: '',
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
      }

      ]
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      const query = {
        access_token: localStorage.getItem('accessToken')
      }
      indexdata(query).then(res => {
        this.overviews = res.data.statBean
      })
    },
    all(data) {
      this.$router.push({
        path: '/equipment_list',
        query: {
          status: data
        }
      })
    },
    warning() {
      this.$router.push({
        path: '/warning'
      })
    },
    map() {
      this.$router.push({
        path: '/statistics'
      })
    }
  }
}
</script>
<style scoped="scoped">
	body {
		background-color: #f9f9f9;
		color: gray;
	}

	.dashboard-container {
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
		cursor: pointer;
		display: flex;
		color: gray;
		margin-right: 0.3rem;
		height: 25%;
		padding: 1.5%;
		margin-top: 1%;
		background-color: white;
		box-shadow: 5px 3px 5px 0px rgba(100, 94, 94, 0.25);
		-webkit-box-shadow: 5px 3px 5px 0px rgba(100, 94, 94, 0.25);
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
		margin-left: 1.3rem;
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
