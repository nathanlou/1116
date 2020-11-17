<template>
  <div>
    <h1>dd</h1>　　<!--通过 ：settings="hotSettings" 来定义结构，数据，以及属性等-->
    <hot-table  :settings="hotSettings"></hot-table>
  </div>
</template>

<script>
  import { HotTable } from '@handsontable/vue';
  import 'handsontable/dist/handsontable.full.css';
  export default {
    data(){
      return{
        hotSettings:{　　　　　　//定义数据
          data: [
            ["2016", 10, 11, 12,],
            ["2017", 20, 11, 14,],
            ["2018", 30, 15, 12,]
          ],　　　　　　//定义表结构
          colHeaders:[
            "问题序号","问题类型","定性法规","问题金额"
          ],　　　　　　//定义属性
          columns:[
            {},
            {},
            {},
            {
              colHeaders:'问题金额',
              type:'numeric', //定义值的类型为数字类型
            }
          ],
		  fillHandle: true,
        },

      }
    },
    components: {
      HotTable
    }
  }
</script>