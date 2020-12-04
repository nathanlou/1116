<template>
  <div style="width: 95%;margin-left: 2%;color: gray;font-size: 0.8rem;" class="container">

    <div class="screen">
      <span> 企业：</span>
      <el-select v-model="company_value" placeholder="请选择" class="select" size="mini">
        <el-option v-for="item in company_list" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <span>类型：</span>
      <el-select v-model="style_value" placeholder="请选择" class="select" size="mini">
        <el-option v-for="item in style_list" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <span>型号：</span>
      <el-select v-model="xh_value" placeholder="请选择" class="select" size="mini">
        <el-option v-for="item in xh_list" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span style="float: right;padding: 1%;">
        <el-button type="primary" size="mini" round @click="add20()">增加20行</el-button>
        <el-button type="success" size="mini" round @click="zz(0)">设备编号自增</el-button>
        <el-button type="warning" size="mini" round @click="zz(1)">内部编号自增</el-button>
        <el-button type="danger" size="mini" round @click="zz(2)">SIM卡号自增</el-button>
      </span>
      <div style="clear: both;" />
    </div>

    <div id="example" class="noScroll-y col-xs-12" />
    <div style="color: red;margin-top: 1%;margin-bottom: 1%;">
      注意：带*号为必填项,相同项可以通过复制，或者下拉边框进行填充。
    </div>
    <div style="width: 100%;text-align: center;margin-top: 2%;margin-bottom: 2%;">
      <el-button class="btns" type="primary" size="medium" @click="submit">添加设备</el-button>
    </div>
  </div>
</template>

<script>
import 'handsontable-pro/dist/handsontable.full.css'
import Handsontable from 'handsontable-pro'

import {
  companyListCom
} from '@/api/companyManager.js'
import {
  deviceTypeListCom
} from '@/api/deviceSetUp.js'

import {
  deviceInforSaveMore
} from '@/api/deviceSetUp'

export default {
  data() {
    return {
      company_value: '',
      style_value: '',
      xh_value: '',
      company_list: [],
      style_list: [],
      xh_list: [
        {
          value: '1',
          label: '1型'
        }, {
          value: '2',
          label: '2型'
        }
      ],
      myData: [],
      hot: ''
      // data : [
      // 	{dtu: '',nbbh:'',sim:'',sbdz:'',gdmc:'',azrq:'',dqrq:'',lxr:'',lxdh:''},
      // ],

    }
  },
  mounted() {
    this.saveData()
  },
  created() {
    companyListCom().then(res => {
      this.company_list = res.data
    })
    deviceTypeListCom().then(res => {
      this.style_list = res.data
    })
  },
  methods: {
    // 保存数据
    submit() {
      if (!this.company_value) {
        this.$message.warning('请选择企业')
        return
      }
      if (!this.style_value) {
        this.$message.warning('请选择设备类型')
        return
      }
      const rows = this.hot.getData()
      const dataArry = []
      // 数组 ['设备类型ID','编号(*)'，"内部编号(*)","SIM卡号(*)","设备地址","工地名称","安装日期","续费到期日期","工地负责人","手机号"]
      for (const i in rows) {
        let hasData = false
        for (const n in rows[i]) {
          // 如果一行里已经有了数据
          if (rows[i][n]) {
            hasData = true
          }
          if (hasData && !rows[i][n]) {
            const r = i * 1 + 1
            const l = n * 1 + 1
            this.$message.warning('第' + r + '行第' + l + '列数据异常')
            return
          }
          if (hasData && !rows[i][0]) {
            const r = i * 1 + 1
            this.$message.warning('第' + r + '行第1列数据异常')
            return
          }
        }
        if (!hasData) {
          continue
        }
        const rowArr = [this.style_value, rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4], rows[i][5], rows[i][6], rows[i][7], rows[i][8]]
        dataArry.push(rowArr)
      }
      if (dataArry.length === 0) {
        this.$message.warning('未输入任何设备信息')
        return
      }
      deviceInforSaveMore({
        'access_token': localStorage.getItem('accessToken'),
        'companyId': this.company_value,
        'dataArry': { data: dataArry }
      }).then(res => {
        if (res.status === 200) {
          this.$message.warning('成功添加' + dataArry.length + '条记录')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      })
    },
    add20() {
      var c = this.hot.countRows()
      if (c < 200) {
        this.hot.alter('insert_row', c, 20)
      } else {
        alert('您插入的已经超过200行，200行以上会影响性能，建议分批插入。')
      }
    },
    getMaxRow(rows, col) {
      var pos = { r: -1, v: 0 }
      for (var i = 0; i < rows; i++) {
        var a = this.hot.getDataAtCell(i, col)
        if (a !== null && a !== '') {
          pos.r = i
          pos.v = a
          continue
        } else {
          return pos
        }
      }
      return pos
    },
    isRealNum(val) {
      val = val.toString()
      const len = val.length
      const res = { pos: 0, tv: 0, zm: '' }
      for (let i = len - 1; i >= 0; i--) {
        const temp = val.substring(i, len)
        if (this.isNum(temp)) {
          res.tv = parseInt(temp)
          res.pos = i
          res.zm = val.substring(0, i)
          continue
        } else {
          return res
        }
      }
      res.pos = len - res.pos
      return res
    },
    isNum(val) {
      if (val === '' || val == null) {
        return false
      }
      if (!isNaN(val)) {
        return true
      } else {
        return false
      }
    },
    zz(index) {
      var allLenth = this.hot.countRows()
      var col = index
      var currentPos = this.getMaxRow(allLenth, col)
      var cur_row = currentPos.r
      var cur_val = currentPos.v
      if (cur_row === -1) {
        alert('"提示","递增第一行不能为空，且后半部分为数字"')
        return
      }
      var alyObj = this.isRealNum(cur_val)
      let v = alyObj.tv
      for (var i = cur_row + 1; i <= cur_row + 20; i++) {
        ++v
        if (cur_row > allLenth) {
          break
        }
        const iv = alyObj.zm + v.toString()
        if (iv.length === cur_val.toString().length) {
          this.hot.setDataAtCell(i, col, iv)
        } else {
          const z = new Array(cur_val.toString().length - v.toString().length - alyObj.zm.length).fill(0)
          this.hot.setDataAtCell(i, col, alyObj.zm + z.join('') + v.toString())
        }
      }
    },
    saveData() {
      var myData = Handsontable.helper.createSpreadsheetData(20)
      var container = document.getElementById('example')
      this.hot = new Handsontable(container, {
        data: myData,
        rowHeaders: true,
        colHeaders: ['设备编号(*)', '内部编号(*)', 'SIM卡号(*)', '当前地址(*)', '工地名称(*)', '安装日期(*)', '缴费日期(*)', '工地负责人(*)',
          '手机号(*)'
        ],
        contextMenu: true,
        manualRowResize: true,
        manualColumnResize: true,
        manualColumnMove: true,
        manualColumnFreeze: true,
        correctFormat: true,
        colWidths: 100,
        rowHeights: 30,
        stretchH: 'all',
        autoWrapRow: true,
        height: 650,
        maxRows: 200,
        manualRowMove: true,
        copyPaste: true,
        wordWrap: true,
        columns: [{
          data: 'dtu',
          type: 'text'
        },
        {
          data: 'nbbh',
          type: 'text'
        },
        {
          data: 'sim',
          type: 'text'
        },
        {
          data: 'sbdz',
          type: 'text'
        },
        {
          data: 'gdmc',
          type: 'text'
        },
        {
          data: 'azrq',
          type: 'date',
          dateFormat: 'YYYY-MM-DD'
        },
        {
          data: 'dqrq',
          type: 'date',
          dateFormat: 'YYYY-MM-DD'
        },
        {
          data: 'lxr',
          type: 'text'
        },
        {
          data: 'lxdh',
          type: 'text'
        }
        ],
        afterCreateRow: function(index, amount, source) {
          var that = this
          var rowAr = []

          for (let i = 0; i < that.countRows(); i++) {
            rowAr.push(that.getRowHeight(i) || 23)
          }
          rowAr[index] = rowAr.splice(index + 1, 1, rowAr[index])[0]

          var $moveArr = that.getPlugin('ManualRowMove').rowsMapper.__arrayMap
          for (let i = 0; i < $moveArr.length; i++) {
            if ($moveArr[i] >= index) {
              $moveArr[i] += 1
            }
          }
          $moveArr.splice(index, 0, index)

          var r = that.getPlugin('ManualRowResize')
          for (var j = 0; j < rowAr.length; j++) {
            r.setManualSize(j, rowAr[j])
          }
          that.updateSettings({
            rowHeights: rowAr
          })
        },
        afterRemoveRow: function(index, amount, source) {
          var that = this
          var rowAr = []
          for (var i = 0; i < that.countRows(); i++) {
            rowAr.push(that.getRowHeight(i) || 23)
          }

          var r = that.getPlugin('ManualRowResize')
          rowAr.splice(index, 1)
          var $moveArr = that.getPlugin('ManualRowMove').rowsMapper.__arrayMap
          for (let i = 0; i < $moveArr.length; i++) {
            if ($moveArr[i] > $moveArr[index]) {
              $moveArr[i] -= 1
            }
          }
          $moveArr.splice(index, 1)

          for (let i = 0; i < rowAr.length; i++) {
            r.setManualSize(i, rowAr[i])
          }
          that.updateSettings({
            rowHeights: rowAr
          })
        },
        afterCreateCol: function(index, amount, source) {
          var that = this
          var colAr = []

          for (let i = 0; i < that.countCols(); i++) {
            colAr.push(that.getColWidth(i) || 50)
          }
          colAr[index] = colAr.splice(index + 1, 1, colAr[index])[0]

          var $moveArr = that.getPlugin('ManualColumnMove').columnsMapper.__arrayMap
          for (let i = 0; i < $moveArr.length; i++) {
            if ($moveArr[i] >= index) {
              $moveArr[i] += 1
            }
          }
          $moveArr.splice(index, 0, index)

          var r = that.getPlugin('ManualColumnResize')
          for (var j = 0; j < colAr.length; j++) {
            r.setManualSize(j, colAr[j])
          }
          that.updateSettings({
            colWidths: colAr
          })
        },
        afterRemoveCol: function(index, amount) {
          var that = this
          var colAr = []

          for (let i = 0; i <= that.countCols(); i++) {
            colAr.push(that.getColWidth(i) || 50)
          }

          colAr.splice(index, 1)
          var $moveArr = that.getPlugin('ManualColumnMove').columnsMapper.__arrayMap
          for (let i = 0; i < $moveArr.length; i++) {
            if ($moveArr[i] > $moveArr[index]) {
              $moveArr[i] -= 1
            }
          }
          $moveArr.splice(index, 1)
          var r = that.getPlugin('ManualColumnResize')
          for (var j = 0; j < colAr.length; j++) {
            r.setManualSize(j, colAr[j])
          }
          that.updateSettings({
            colWidths: colAr
          })
        },
        beforeRowMove: function(rows, target) {
          var that = this
          var rowAr = []
          for (var i = 0; i < that.countRows(); i++) {
            rowAr.push(that.getRowHeight(i) || 23)
          }
          if (rows > target) {
            rowAr[rows] = rowAr.splice(target, 1, rowAr[rows])[0]
          } else {
            rowAr[rows] = rowAr.splice(target - 1, 1, rowAr[rows])[0]
          }

          var r = that.getPlugin('ManualRowResize')
          for (var j = 0; j < rowAr.length; j++) {
            r.setManualSize(j, rowAr[j])
          }
          that.updateSettings({
            rowHeights: rowAr
          })
        },
        afterRowMove: function(rows, target) {
          var that = this
          var rowAr = []
          rowAr = that.getSettings().rowHeights.concat()

          var r = that.getPlugin('ManualRowResize')
          for (var j = 0; j < rowAr.length; j++) {
            r.setManualSize(j, rowAr[j])
          }
          this.tableRender(that)
        },
        beforeColMove: function(cols, target) {
          var that = this
          var colAr = []
          for (var i = 0; i < that.countCols(); i++) {
            colAr.push(that.getColWidth(i) || 50)
          }
          if (cols > target) {
            colAr[cols] = colAr.splice(target, 1, colAr[cols])[0]
          } else {
            colAr[cols] = colAr.splice(target - 1, 1, colAr[cols])[0]
          }

          var r = that.getPlugin('ManualColumnResize')
          for (var j = 0; j < colAr.length; j++) {
            r.setManualSize(j, colAr[j])
          }
          that.updateSettings({
            colWidths: colAr
          })
        },
        afterColMove: function(cols, target) {
          var that = this
          var colAr = []
          // var $move = that.getPlugin('ManualColumnMove')
          colAr = that.getSettings().rowHeights.concat()

          var r = that.getPlugin('ManualColumnResize')
          for (var j = 0; j < colAr.length; j++) {
            r.setManualSize(j, colAr[j])
          }
          this.tableRender(that)
        }
      })
    },
    tableRender(hot) {
      var that = hot
      that.forceFullRender = true
      that.view.render()
      that.view.wt.wtOverlays.adjustElementsSize(true)
    }
  }
}
</script>

<style scoped="scopeds">
	.select {
		width: 8rem;
		margin-right: 2rem;
	}

	.btns {
		margin-bottom: 2%;
	}
	@media screen and (max-width: 1024px) {
		.container{
			margin-top: -1.5% !important;
		}
	}
</style>
