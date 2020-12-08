<template>
  <div style="width: 95%;margin-left: 2.5%;margin-top: 2%;color: gray;">
<el-page-header style="margin-left: 2.5%;" content="详情页面" @back="goback" />
    <div class="msg_con">
      <div style="display: flex;width: 100%;height: 1.5rem;font-weight: 700;justify-content: center;">设备信息</div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">企业：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.companyName }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">设备编号：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.bh }}</div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">内部编号：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.companyBh }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">SIM卡号：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.sim }} <span style="color: dodgerblue;"> 正常</span></div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">负责人：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.gdfzr }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">联系电话：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.gdfzrsj }}</div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">设备种类：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.sbxh }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">设备型号：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.sblx }}</div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">安装日期：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.azrq }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">到期日期：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.yxrq }}</div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">当前地址：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.dqdz }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">通讯时间：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.lastTime | dateFilter("yyyy-mm-dd hh:mm:ss") }}</div>
        </div>
      </div>
	  <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
	    <div style="display: flex;width: 100%;">
	      <div class="label">基本操作：</div>
	      <div style="margin-left: 0.9375rem;">
			  <el-button type="success" round plain size="mini" @click="transfer()">迁移设备</el-button>
			  <el-button type="warning" round plain size="mini" @click="edit()">编辑设备</el-button>
			  <el-button type="danger" round plain size="mini" @click="deletes()">删除设备</el-button>
			  <el-button type="primary" round plain size="mini" @click="showMap()">设备定位</el-button>
		  </div>
	    </div>
	  </div>
    </div>
	<!-- 地图定位 -->
	<el-dialog title="地图定位" :visible.sync="showMapFlg" width="80%" style="box-sizing: border-box;">
	  <div class="amap-page-container">
	    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" />
	    <el-amap
	      ref="map"
	      class="map"
	      :zoom="12"
	      vid="amapDemo"
	      :center="center"
	      expand-zoom-range="true"
	      :plugin="plugin"
	      :pitch="66"
	      :events="events"
	    >
	      <el-amap-marker :position="center" />
	      <div style="display: flex;">
	        <div class="toolbar">position: {{ lng }}, {{ lat }} address: {{ address }}</div>
	        <div style="width: 20%;display: flex;justify-content: flex-end; align-items: center;height: 50px;">
	          <el-button type="primary" round size="small" @click="confirThisAddress()">确认选择</el-button>
	        </div>
	      </div>
	    </el-amap>
	  </div>
	</el-dialog>
	<!-- 迁移 -->
	<el-dialog title="迁移" :visible.sync="dialogVisible" width="55%">
	  <div>
	    <el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="当前企业">
				  {{msg.companyName}}
				</el-form-item>
	      <el-form-item label="设备编号">
			   {{msg.bh}}
	      </el-form-item>
	      <el-form-item label="迁移企业">
	        <el-select v-model="qyvalue" placeholder="请选择">
	          <el-option v-for="item in qycompany" :key="item.key" :label="item.value" :value="item.key" />
	        </el-select>
	      </el-form-item>
	      <el-form-item label="备注">
	        <el-input v-model="deviceMoveNote" type="textarea" placeholder="请输入备注" />
	      </el-form-item>
	    </el-form>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="deviceMove">确 定</el-button>
	  </span>
	</el-dialog>
    <!-- 迁移 -->
  </div>
</template>

<script>
import {
  equipment_del,
  equipment_msg
} from '@/api/getlist'
import {
  companyListCom
} from '@/api/companyManager.js'
import {
  deviceTransferSave,
  deviceOpLogListData,
  deviceInforUpdateZb
} from '@/api/deviceSetUp.js'
import {
  parseTime
} from '@/utils/index.js'
export default {
  filters: {
    dateFilter(data, format = '') {
      var dt = new Date(data)
      var y = dt.getFullYear()
      var m = (dt.getMonth() + 1).toString().padStart(2, '0')
      var d = dt.getDate().toString().padStart(2, '0')
      var h = dt.getHours().toString().padStart(2, '0')
      var mm = dt.getMinutes().toString().padStart(2, '0')
      var s = dt.getSeconds().toString().padStart(2, '0')
      if (format.toLocaleLowerCase() === 'yyyy-mm-dd' ||
					format.toLocaleLowerCase() === '') {
        return `${y}-${m}-${d}`
      } else if (format.toLocaleLowerCase() === 'yyyy/mm/dd') {
        return `${y}/${m}/${d}`
      } else if (format.toLocaleLowerCase() === 'yyyy-mm-dd hh:mm:ss') {
        return `${y}-${m}-${d} ${h}:${mm}:${s}`
      } else if (format.toLocaleLowerCase() === 'yyyy/mm/dd hh:mm:ss') {
        return `${y}/${m}/${d} ${h}:${mm}:${s}`
      } else {
        return `时间格式有误`
      }
    }
  },
  data() {
    const self = this
    return {
      address: '',
      markers: [],
      searchOption: '',
      showMapFlg: false,
      deviceMoveNote: '',
      msg: '',
      qyvalue: '',
      qycompany: [],
      dialogVisible: false,
      queryLog: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 10,
        queryDeviceId: localStorage.getItem('id')
      },
      form: {},
      // 地图
      events: {
        click(e) {
          const {
            lng,
            lat
          } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.center = [lng, lat]
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                // self.$nextTick()
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0,
      zoom: 6,
      center: [0, 0],
      //  自动定位到当前位置
      plugin: [{
        timeout: 100, // 超过10秒后停止定位，默认：无穷大
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        pName: 'Geolocation',
        events: {
          click(e) {
            alert(1)
          },
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.address = result.formattedAddress
                self.lng = result.position.lng
                self.lat = result.position.lat
                self.center = [self.lng, self.lat]
                self.loaded = true
                self.$nextTick()
              }
            })
          }
        }
      },
      {
        // 地图工具条
        pName: 'ToolBar',
        init(o) {}
      },
      {
        // 左下角缩略图插件 比例尺
        pName: 'Scale',
        init(o) {}
      }
      ]
    }
  },
  created: function() {
    // this.msg = this.$route.query.key
    this.equipment_msg()
    this.getAllCompany()
  },
  methods: {
    // 查询所有企业列表
    getAllCompany() {
      companyListCom().then(res => {
        if (res.status === 200) {
          this.qycompany = res.data
        } else {
          this.$message.error('加载企业列表失败')
        }
      })
    },
    // 迁移设备
    deviceMove() {
      // 参数列表
      const param = {
        access_token: localStorage.getItem('accessToken'),
        action: 'save',
        qylx: '正常迁移',
        qyrq: parseTime(new Date(), '{y}-{m}-{d}'),
        qyhqyId: this.qyvalue,
        deviceId: this.msg.id,
        bz: this.deviceMoveNote
      }
      if (!param.deviceId) {
        this.$message.error('设备信息缺失')
        return
      }
      if (!param.qyhqyId) {
        this.$message.error('请选择要迁移的企业')
        return
      }
      deviceTransferSave(param).then(res => {
        if (res.status === 200) {
          this.$message.success('迁移成功')
          // 刷新本页面
          const that = this
          setTimeout(function() {
            that.$router.go(0)
          }, 1000)
        } else {
          this.$message.err('迁移失败')
        }
      })
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
      // 重新查询
      this.getOptLogList()
    },
    equipment_msg() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        id: localStorage.getItem('id')
      }
      equipment_msg(query).then(res => {
        this.msg = res.data
      })
    },
    edit() {
      this.$router.push({
        path: '/equipment_list/edit',
        query: {
          key: localStorage.getItem('id')
        }
      })
    },
    transfer() {
      this.dialogVisible = true
    },
    deletes() {
      var mymessage = confirm('您确定删除该设备吗?')
      if (mymessage === true) {
        const query = {
          access_token: localStorage.getItem('accessToken'),
          id: this.msg.id
        }
        equipment_del(query).then(res => {
          this.goback()
        }).catch(() => {
          this.goback()
        })
        // this.$message({
        // 	message: '删除成功',
        // 	type: 'warning'
        // });
      }
    },
    // 显示地图
    showMap() {
      this.showMapFlg = true
    },
    goback() {
      this.$router.go(-1)
    },
    onSearchResult(res) {
      const arr = res
      const markers = []

      for (const i in arr) {
        this.center = [arr[i].lng, arr[i].lat]
        console.log(this.center)
        markers.push({
          position: [arr[i].lng, arr[i].lat]
        })
        break
      }
      this.markers = markers
    },
    // 设置经纬度
    confirThisAddress() {
      const lng = this.center[0]
      const lat = this.center[1]
      if (!lat || !lng) {
        this.$message.error('请在地图上标记地点')
        return
      }
      deviceInforUpdateZb({
        access_token: localStorage.getItem('accessToken'),
        id: this.msg.id,
        jd: lng,
        wd: lat
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('设置成功')
          this.showMapFlg = false
        }
      })
    }
  }
}
</script>

<style scoped="scoped">
	.label {
		width: 6.875rem;
		text-align: center;
		background-color: #E8F4FF;

	}

	.table_headr {
		height: 2rem;
		line-height: 2rem;
		color: white;
		background-color: #409EFF;
	}

	.msg_con {
		width: 80%;
		margin-left: 10%;
		font-size: 1.0rem;
	}

	.container_table {
		margin-top: 1%;
	}

	.fy {
		margin-top: 1%;
		margin-bottom: 1%;
		text-align: right;
	}

	@media screen and (max-width: 1024px) {
		.msg_con {
			width: 80%;
			margin-left: 0;
			font-size: 0.9rem;
		}

	}

	.search-box {
		position: absolute;
		top: 25px;
		left: 70px;
	}

	.amap-page-container {
		position: relative;
		width: 100%;
		height: 600px;
		box-sizing: border-box;
	}

	.map {
		width: 100%;
		height: 100%;
		position: absolute;
		top: -20px;
		left: 0;
	}

	.toolbar {
		width: 80%;
		height: auto;
		color: red;
		margin-top: 15px;
	}
</style>
