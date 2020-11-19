<template>
  <div>
    <div class="topcardbg_baseinfo">
      <div style="display: flex;">
        <div style="width: ;">
          <img src="../../assets/img/shashifenliji.png" class="leftimg">
        </div>
        <div class="centerText">
          <div><span>设备类型：</span><span>{{ rowData.sblx }}</span>
            <span v-if="rowData.deviceState == 1" class="bg_online">在线</span>
            <span class="bg_unline">离线</span>
          </div>
          <div style="margin:0.9rem 0 ;"><span>所属企业：</span><span>{{ rowData.companyName ? rowData.companyName : "-" }}</span></div>
          <div><span>当前地址：</span><span>{{ rowData.rl ? rowData.rl : "-" }}</span></div>
        </div>
      </div>

      <div v-if="typeKey != 'modbus_xwz'" style="margin-left: 1.2rem;margin-top: 1rem;margin-right: 1rem;">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <div class="msg_con">
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">企业：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.companyName ? rowData.companyName :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">设备编号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.bh ? rowData.bh :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">内部编号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.companyBh ? rowData.companyBh :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">SIM卡号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.sim ? rowData.sim :'-' }} <span style="color: dodgerblue;">
                    正常</span></div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">负责人：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.gdfzr ? rowData.gdfzr :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">联系电话：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.gdfzrsj ? rowData.gdfzrsj :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">设备种类：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.sblx ? rowData.sblx :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">设备型号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.sbxh ? rowData.sbxh :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">安装日期：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.azrq ? rowData.azrq :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">到期日期：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.yxrq ? rowData.yxrq :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">当前地址：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.dqdz ? rowData.dqdz :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">通讯时间：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.companyName ? rowData.companyName :'-' }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="参数信息">
            <div class="msg_con">
              <div style="display: flex;flex-wrap: wrap; line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div v-for="(item,index) in deviceDataList" :key="index" style="display: flex;width: 50%;">
                  <!-- <div class="label">{{ keyMapDetail[item.jcqdz]?keyMapDetail[item.jcqdz]:'未定义的参数' }}</div>
                  <div style="margin-left: 0.9375rem;">30</div> -->
                  <div class="label">{{ item.csmc }}</div>
                  <div style="margin-left: 0.9375rem;display: flex;">
                    <div v-if="!deviceDataVals[item.jcqdz] || deviceDataVals[item.jcqdz].length == 0">-</div>
                    <div v-else-if="item.cd == 1">{{ deviceDataVals[item.jcqdz] }}</div>
                    <div v-for="(itemv,indexv) in deviceDataVals[item.jcqdz]" v-else :key="indexv">{{ itemv?itemv:'-' }}<span
                      v-if="indexv < deviceDataVals[item.jcqdz].length-1"
                    >-</span></div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="参数设置">
            <div class="msg_con">
              <div style="display: flex;flex-wrap: wrap;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div v-for="(item,index) in deviceDataList" :key="index" style="display: flex;width: 50%;">
                  <div class="label">{{ item.csmc }}</div>
                  <div style="padding-left: 0.9375rem;display: flex;width:calc(100% - 6rem)">
                    <div v-if="item.cd <= 1">
                      <el-input v-model="deviceDataVals[item.jcqdz]" :placeholder="item.cd" size="small" class="inputW" @blur="resetValue(item)" />
                    </div>
                    <div v-for="(itemv,indexv) in deviceDataVals[item.jcqdz]" v-else :key="indexv" :style="'padding-right:20px;width:'+(74/deviceDataVals[item.jcqdz].length)+'%;'">
                      <el-input v-model="deviceDataVals[item.jcqdz][indexv]" size="small" @blur="resetValue(item)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 小雾桩单独处理 -->
      <div v-if="typeKey == 'modbus_xwz' " style="margin-left: 1.2rem;margin-top: 1rem;margin-right: 1rem;">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <div class="msg_con">
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">企业：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.companyName ? rowData.companyName :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">设备编号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.bh ? rowData.bh :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">内部编号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.companyBh ? rowData.companyBh :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">SIM卡号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.sim ? rowData.sim :'-' }} <span style="color: dodgerblue;">
                    正常</span></div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">负责人：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.gdfzr ? rowData.gdfzr :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">联系电话：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.gdfzrsj ? rowData.gdfzrsj :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">设备种类：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.sblx ? rowData.sblx :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">设备型号：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.sbxh ? rowData.sbxh :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">安装日期：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.azrq ? rowData.azrq :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">到期日期：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.yxrq ? rowData.yxrq :'-' }}</div>
                </div>
              </div>
              <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div style="display: flex;width: 50%;">
                  <div class="label">当前地址：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.dqdz ? rowData.dqdz :'-' }}</div>
                </div>
                <div style="display: flex;width: 50%;">
                  <div class="label">通讯时间：</div>
                  <div style="margin-left: 0.9375rem;">{{ rowData.companyName ? rowData.companyName :'-' }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="参数信息">
            <div class="msg_con" style="padding-bottom: 20px;">
              <div style="width: 100%;font-size: .85rem;color:#333333;padding-bottom: 12px; font-weight:bold;">公共参数</div>
              <div style="display: flex;flex-wrap: wrap; line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div v-for="(item,index) in deviceDataList" :key="index" style="display: flex;width: 50%;">
                  <!-- <div class="label">{{ keyMapDetail[item.jcqdz]?keyMapDetail[item.jcqdz]:'未定义的参数' }}</div>
                  <div style="margin-left: 0.9375rem;">30</div> -->
                  <div class="label">{{ item.csmc }}</div>
                  <div style="margin-left: 0.9375rem;display: flex;">
                    <div v-if="!deviceDataVals[item.jcqdz] || deviceDataVals[item.jcqdz].length == 0">-</div>
                    <div v-else-if="item.cd == 1">{{ deviceDataVals[item.jcqdz] }}</div>
                    <div v-for="(itemv,indexv) in deviceDataVals[item.jcqdz]" v-else :key="indexv">{{ itemv?itemv:'-' }}<span
                      v-if="indexv < deviceDataVals[item.jcqdz].length-1"
                    >-</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 100%;font-size: .85rem;color:#333333;padding-bottom: 12px; font-weight:bold;">每周参数</div>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane
                v-for="(week,indexWeek) in xwzDeviceDataList"
                :key="indexWeek"
                :label="numberToWeek(indexWeek+1)"
                :name="numberToWeek(indexWeek+1)"
              >
                <div style="display: flex;flex-wrap: wrap; line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                  <div v-for="(item,index) in week[numberToWeek(indexWeek+1)]" :key="index" style="display: flex;width: 50%;">
                    <!-- <div class="label">{{ keyMapDetail[item.jcqdz]?keyMapDetail[item.jcqdz]:'未定义的参数' }}</div>
                    <div style="margin-left: 0.9375rem;">30</div> -->
                    <div class="label-xwz">{{ item.csmc }}</div>
                    <div style="margin-left: 0.9375rem;display: flex;">
                      <div v-if="!deviceDataVals[item.jcqdz] || deviceDataVals[item.jcqdz].length == 0">-</div>
                      <div v-else-if="item.cd == 1">{{ deviceDataVals[item.jcqdz] }}</div>
                      <div v-for="(itemv,indexv) in deviceDataVals[item.jcqdz]" v-else :key="indexv">{{ itemv?itemv:'-' }}<span
                        v-if="indexv < deviceDataVals[item.jcqdz].length-1"
                      >-</span></div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="参数设置">
            <div class="msg_con" style="padding-bottom: 20px;">
              <div style="width: 100%;font-size: .85rem;color:#333333;padding-bottom: 12px; font-weight:bold;">公共参数</div>
              <div style="display: flex;flex-wrap: wrap;line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                <div v-for="(item,index) in deviceDataList" :key="index" style="display: flex;width: 50%;">
                  <div class="label">{{ item.csmc }}</div>
                  <div style="padding-left: 0.9375rem;display: flex;width:calc(100% - 6rem)">
                    <div v-if="item.cd <= 1">
                      <el-input v-model="deviceDataVals[item.jcqdz]" size="small" class="inputW" @blur="resetValue(item)" />
                    </div>
                    <div v-for="(itemv,indexv) in deviceDataVals[item.jcqdz]" v-else :key="indexv" :style="'padding-right:20px;width:'+(87/deviceDataVals[item.jcqdz].length)+'%;'">
                      <el-input v-model="deviceDataVals[item.jcqdz][indexv]" size="small" @blur="resetValue(item)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 100%;font-size: .85rem;color:#333333;padding-bottom: 12px; font-weight:bold;">每周参数</div>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane
                v-for="(week,indexWeek) in xwzDeviceDataList"
                :key="indexWeek"
                :label="numberToWeek(indexWeek+1)"
                :name="numberToWeek(indexWeek+1)"
              >
                <div style="display: flex;flex-wrap: wrap; line-height: 2.8rem;border: 0.00rem solid #f4f4f4;">
                  <div v-for="(item,index) in week[numberToWeek(indexWeek+1)]" :key="index" style="display: flex;width: 50%;">
                    <!-- <div class="label">{{ keyMapDetail[item.jcqdz]?keyMapDetail[item.jcqdz]:'未定义的参数' }}</div>
                    <div style="margin-left: 0.9375rem;">30</div> -->
                    <div class="label-xwz">{{ item.csmc }}</div>
                    <div style="margin-left: 0.9375rem;display: flex;">
                      <div v-if="item.cd <= 1">
                        <el-input v-model="deviceDataVals[item.jcqdz]" size="small" class="inputW" @blur="resetValue(item)" />
                      </div>
                      <div v-for="(itemv,indexv) in deviceDataVals[item.jcqdz]" v-else :key="indexv" :style="'padding-right:20px;width:'+(64/deviceDataVals[item.jcqdz].length)+'%;'">
                        <el-input v-model="deviceDataVals[item.jcqdz][indexv]" size="small" @blur="resetValue(item)" />
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>

  </div>
  </div>

</template>

<script>
import {
  readVal,
  getDetailsByDeviceTypeId,
  deviceInforSetAddessVal
} from '@/api/monitor'

import {
  jsons
} from '../../../mock/deviceCodeJson.js'

export default {

  data() {
    return {
      websock: null,
      // 标签对应表
      keyMapDetail: jsons,
      rowData: {},
      // 设备参数列表
      deviceDataList: [],
      // 设备参数值列表 key:jcqid value:vals[]
      deviceDataVals: {},
      // 小雾庄的处理
      xwzDeviceDataList: [],
      idKey: '',
      typeKey: '', // 根据分类显示不同的菜单
      activeName: '星期一', // 默认显示的星期
      msg: '',
      id: ''
    }
  },
  created: function() {
    this.idKey = this.$route.query.rowData.id
    this.typeKey = this.$route.query.rowData.sblxId
    this.rowData = this.$route.query.rowData
    if (this.idKey) {
      // 发起soket
      this.initWebSocket()
      // 查询设备类型ID
      this.getTypeDetails()
    } else {
      this.$alert('无法获取设备信息', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.go(-1)
        }
      })
    }
  },
  methods: {
    resetValue(item) {
      const data = this.deviceDataVals[item.jcqdz]
      const paramData = item.cd > 1 ? data.join(',') : data

      const param = {
        'address1': item.jcqdz,
        'length': item.cd,
        'data': paramData,
        'deviceId': this.rowData.id,
        'typeId': this.rowData.sblxId,
        'access_token': localStorage.getItem('accessToken')
      }
      deviceInforSetAddessVal(param).then(res => {
        if (res.status !== 200) {
          this.$alert('修改设备参数失败', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        } else {
          console.log(res.msg)
        }
      })
    },
    numberToWeek(num) {
      if (num === 1) {
        return '星期一'
      } else if (num === 2) {
        return '星期二'
      } else if (num === 3) {
        return '星期三'
      } else if (num === 4) {
        return '星期四'
      } else if (num === 5) {
        return '星期五'
      } else if (num === 6) {
        return '星期六'
      } else if (num === 7) {
        return '星期日'
      } else {
        return '错误'
      }
    },
    // 获取设备类型ID
    getTypeDetails() {
      const query = {
        'start': 0,
        'length': 10000,
        'typeId': this.rowData.sblxId,
        'access_token': localStorage.getItem('accessToken')
      }
      getDetailsByDeviceTypeId(query).then(res => {
        // 不是小雾桩
        if (this.rowData.sblxId !== 'modbus_xwz') {
          for (const i in res.data) {
            res.data[i].jcqdz = res.data[i].jcqdz.toUpperCase()
            if (res.data[i].cd > 1) {
              this.$set(this.deviceDataVals, res.data[i].jcqdz, new Array(res.data[i].cd).fill(''))
            } else if (res.data[i].cd === 1) {
              this.$set(this.deviceDataVals, res.data[i].jcqdz, '')
            }
          }
          this.deviceDataList = res.data
        } else {
          // 小雾桩单独处理

          const dataArr = []
          const publisDataArr = []
          for (let i = 1; i <= 7; i++) {
            const obj = {}
            obj[this.numberToWeek(i)] = []
            dataArr.push(obj)
          }
          for (const i in res.data) {
            const item = res.data[i]
            item.jcqdz = item.jcqdz.toUpperCase()
            if (item.cd > 1) {
              this.$set(this.deviceDataVals, item.jcqdz, new Array(item.cd).fill(''))
            } else if (res.data[i].cd === 1) {
              this.$set(this.deviceDataVals, res.data[i].jcqdz, '')
            }
            if (item.week > 0) {
              dataArr[item.week - 1][this.numberToWeek(item.week)].push(item)
            } else {
              publisDataArr.push(item)
            }
            this.deviceDataList = publisDataArr
          }
          this.xwzDeviceDataList = dataArr
        }
      })
    },
    doSelect() {
      const query = {
        'deviceId': this.idKey,
        'access_token': localStorage.getItem('accessToken')
      }
      readVal(query).then(res => {
        console.log(res)
      })
    },
    threadPoxi() { // 实际调用的方法
      // 参数
      const agentData = 'mymessage'
      // 若是ws开启状态
      if (this.websock.readyState === this.websock.OPEN) {
        this.websocketsend(agentData)
      } else if (this.websock.readyState === this.websock.CONNECTING) {
        // 若是 正在开启状态，则等待300毫秒
        const that = this // 保存当前对象this
        setTimeout(function() {
          that.websocketsend(agentData)
        }, 300)
      } else {
        // 若未开启 ，则等待500毫秒
        this.initWebSocket()
        const that = this // 保存当前对象this
        setTimeout(function() {
          that.websocketsend(agentData)
        }, 500)
      }
    },
    initWebSocket() { // 初始化weosocket
      // ws地址
      const wsuri = process.env.VUE_APP_WS_API + '?id=' + this.idKey
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonmessage(e) { // 数据接收
      if (e.data === 'hello') {
        // soket初始化完毕就开始调用
        this.doSelect()
      } else {
        const redata = JSON.parse(e.data)
        this.$set(this.deviceDataVals, redata.cont.jcqdz.toUpperCase(), redata.cont.cd > 1 ? redata.cont.vals.split(',') : redata.cont.vals)
      }
      console.log('soket:' + e.data)
      // const redata = JSON.parse(e.data)
      // console.log(redata.value)
    },
    websocketsend(agentData) { // 数据发送
      this.websock.send(agentData)
    },
    websocketclose(e) { // 关闭
      console.log('connection closed (' + e.code + ')')
    },

    tableRowClassName({
      row,
      rowIndex
    }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    //
    handleClick() {

    }
  }
}
</script>

<style scoped="scoped">
  .label {
    width: 11.875rem;
    text-align: center;
    background-color: #E8F4FF;
    color: gray;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .label-xwz {
    width: 11.875rem;
    text-align: center;
    background-color: #E8F4FF;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .topcardbg_baseinfo {
    margin: 0 auto;
    border-radius: 1rem;
    background-color: white;
    width: 96%;
    height: 500px;

    margin-top: -0.5rem;
  }

  .msg_con {
    width: 60%;

    font-size: 1.0rem;
    color: gray;
    font-size: 0.9rem;
  }

  .leftimg {
    padding: 0.3125rem;
    width: 120px;
    height: 90px;
    margin-left: 1.2rem;
    margin-top: 1.2rem;
  }

  .centerText {
    width: 50%;
    margin-top: 1.2rem;
    margin-left: 1.2rem;
    color: gray;
  }

  .bg_online {
    background-color: #1890FF;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    border-radius: 2rem;
    color: white;
    margin-left: 1.2rem;
  }

  .bg_unline {
    background-color: #ff0000;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    border-radius: 2rem;
    color: white;
    margin-left: 1.2rem;
  }

  .inputW {
    width: 15rem;
  }

  @media screen and (max-width: 1024px) {
    .leftimg {
      padding: 0.3125rem;
      width: 6rem;
      height: 5rem;
      margin-left: 1.2rem;
      margin-top: 1.2rem;
    }

    .centerText {
      width: 50%;
      margin-top: 1.5rem;
      margin-left: 1.2rem;
      font-size: 0.9rem;
    }

    .msg_con {
      width: 80%;

      font-size: 1.0rem;
      color: gray;
      font-size: 0.8rem;
    }

    .label {
      width: 6rem;
      text-align: center;
      background-color: #E8F4FF;
    }

    .inputW {
      width: 10rem;
    }

  }
</style>
