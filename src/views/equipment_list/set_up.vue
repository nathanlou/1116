<template>
  <div style="width: 95%;margin-left: 2.5%;margin-top: 2%;color: gray;">

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
          <div style="margin-left: 0.9375rem;">{{ msg.dqrq }}</div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;width: 50%;">
          <div class="label">当前地址：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.dqdz }}</div>
        </div>
        <div style="display: flex;width: 50%;">
          <div class="label">通讯时间：</div>
          <div style="margin-left: 0.9375rem;">{{ msg.lastDateStr }}</div>
        </div>
      </div>
    </div>
    <div class="msg_con" style="margin-top: 2%;">
      <div style="display: flex;width: 50%;" />
      <div class="bigtitle" style="text-align: center;">设备操作</div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;">
          <div class="label">基本操作：</div>
          <div style="margin-left: 0.9375rem;">
            <!-- <el-button type="warning">控制设置</el-button> -->
            <el-button type="success" round plain size="mini" @click="transfer()">迁移设备</el-button>
            <el-button type="warning" round plain size="mini" @click="edit()">编辑设备</el-button>
            <el-button type="danger" round plain size="mini" @click="deletes()">删除设备</el-button>
            <el-button type="primary" round plain size="mini" @click="showMap()">设备定位</el-button>
          </div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;">
          <div class="label">远程操作：</div>
          <div style="margin-left: 0.9375rem;">
            <el-button v-if="msg.isEnable!=1" type="success" round plain size="mini" @click="on(&quot;kj&quot;)">远程开机</el-button>
            <el-button v-if="msg.isEnable==1" type="warning" round plain size="mini" @click="on(&quot;gj&quot;)">远程关机</el-button>
            <el-button type="danger" round plain size="mini" @click="on(&quot;cq&quot;)">重启设备</el-button>
          </div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;">
          <div class="label">特殊设置：</div>
          <div style="margin-left: 0.9375rem;">
            <el-button type="success" round plain size="mini" @click="xtjg = true">心跳间隔</el-button>
            <el-button type="warning" round plain size="mini" @click="ipdz = true">IP地址</el-button>
          </div>
        </div>
      </div>
      <div style="display: flex;height: 2.8rem;line-height: 2.8rem;border: 0.04rem solid #f4f4f4;">
        <div style="display: flex;">
          <div class="label">参数设置：</div>
          <div style="margin-left: 0.9375rem;">
            <el-button type="success" round plain size="mini" @click="parameters()">参数设置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container_table">
      <div class="table_headr">操作记录</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        style="width: 100%;font-size: 13px;color: gray;"
        :default-sort="{prop: 'date', order: 'descending'}"
        size="mini"
      >
        <el-table-column prop="createUserName" label="操作人" align="center" size="mini" />
        <el-table-column prop="czlx" sortable label="操作类型" align="center" size="mini" />
        <el-table-column prop="cznr" label="操作内容" align="center" size="mini" />
        <el-table-column prop="createTime" label="操作时间" align="center" width="180" size="mini" />
      </el-table>
      <el-pagination
        class="fy"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next"
        :total="totalCount"
        background
        @current-change="current_change"
      />
    </div>
    <!-- 地图定位 -->
    <el-dialog title="地图定位" :visible.sync="showMapFlg" width="80%">
      <div class="amap-page-container" style="width: 100%;height: 500px;">
        <el-amap
          ref="map"
          :zoom="zoom"
          vid="amapDemo"
          :center="center"
          expand-zoom-range="true"
          :plugin="plugin"
          :pitch="66"
        >
          <el-amap-marker :position="center" />
        </el-amap>
      </div>
    </el-dialog>
    <!-- 迁移 -->
    <el-dialog title="迁移" :visible.sync="dialogVisible" width="55%">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="设备编号">
            <el-input v-model="msg.bh" disabled />
          </el-form-item>
          <el-form-item label="迁移企业">
            <el-select v-model="qyvalue" placeholder="请选择">
              <el-option v-for="item in qycompany" :key="item.id" :label="item.companyName" :value="item.id" />
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
    <!-- 提醒 -->
    <el-dialog title="提示" :visible.sync="tx" width="35%">
      <div>谨慎操作！您确定要操作吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tx = false">取 消</el-button>
        <el-button type="primary" @click="txs()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提醒 -->
    <!-- 心跳间隔 -->
    <el-dialog title="心跳间隔" :visible.sync="xtjg" width="50%">
      <div>
        <el-form label-width="150px">
          <el-form-item label="功能">
            心跳间隔设置,单位s 值范围(1~3600)
          </el-form-item>
          <el-form-item label="心跳间隔">
            <el-input v-model="xtvalue" style="width: 60%;" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xtjg = false">取 消</el-button>
        <el-button type="primary" @click="xtclick()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 心跳间隔 -->
    <!-- IP地址 -->
    <el-dialog title="IP地址" :visible.sync="ipdz" width="50%">
      <div>
        <el-form label-width="150px">
          <el-form-item label="功能">
            修改服务器IP地址指令;例如:10.78.183.12:9090
          </el-form-item>
          <el-form-item label="IP地址以及端口">
            <el-input v-model="ipvalue" style="width: 60%;" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ipdz = false">取 消</el-button>
        <el-button type="primary" @click="ipclick()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- IP地址 -->
  </div>
</template>

<script>
import {
  equipment_del,
  equipment_msg,
  company_listData
} from '@/api/getlist'
import {
  deviceTransferSave,
  deviceOpLogListData
} from '@/api/deviceSetUp.js'
import {
  parseTime
} from '@/utils/index.js'
export default {
  data() {
    return {
      showMapFlg: false,
      deviceMoveNote: '',
      ipdz: false,
      xtjg: false,
      tx: false,
      msg: '',
      qyvalue: '',
      qycompany: [],
      dialogVisible: false,
      cs: '',
      xtvalue: '',
      ipvalue: '',
      istag: true,
      queryLog: {
        access_token: localStorage.getItem('accessToken'),
        start: 0,
        length: 10,
        queryDeviceId: localStorage.getItem('id')
      },
      form: {},
      currentPage: 1, // 当前页面
      pageSize: 10, // 每页几条
      totalCount: 0, // 总数
      tableData: [],

      // 地图
      zoom: 10,
      center: [113.860114, 35.305989],
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
              console.log(status, result)
              console.log(result.formattedAddress)
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
    this.getOptLogList()
  },
  methods: {
    // 查询所有企业列表
    getAllCompany() {
      const query = {
        access_token: localStorage.getItem('accessToken'),
        start: '0',
        length: '1000'
      }
      company_listData(query).then(res => {
        if (res.status === 200) {
          this.qycompany = res.data
        } else {
          this.$message.error('加载企业列表失败')
        }
      })
    },
    // 查询操作日志
    getOptLogList() {
      this.queryLog.start = this.currentPage - 1
      this.queryLog.length = this.pageSize
      deviceOpLogListData(this.queryLog).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
          this.totalCount = res.recordsTotal
        } else {
          this.$message.error('加载操作日志列表失败')
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
    parameters() {
      this.$router.push({
        path: '/equipment_list/parameter_msg'
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
    on(res) {
      this.tx = true
      this.cs = res
    },
    txs(res) {
      this.tx = false
    },
    transfer() {
      this.dialogVisible = true
    },
    xtclick() {
      this.xtjg = false
    },
    ipclick() {
      this.ipdz = false
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
      console.log(this.msg)
      if (this.msg.jd && this.msg.wd) {
        this.center = [this.msg.jd, this.msg.wd]
        this.showMapFlg = true
      } else {
        this.$message.error('未能获取到当前设备地址')
      }
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
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
</style>
