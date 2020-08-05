<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    tooltip-effect="dark"
    ref="multipleTable"
    border
    @selection-change="handleSelectionChange"
    :header-cell-style="{background:'#409EFF',color:'#fff'}"
    :header-cell-class-name="addClass"
    :height="tableHeight + 'px'"
    class="box">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="(item, index) in headertable" :key="index" :label="item.label" :prop="item.prop" :render-header='headerfixed' :fixed='item.fixed' :width="item.width" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="" label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-view" @click="lookInfo(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Tables',
  props: {
    tableData: Array,
    tableHeight: Number
  },
  data () {
    return {
      multipleSelection: '', // 多选id集合
      headertable: [{
        fixed: false,
        label: '序号',
        prop: 'rowNum',
        width: '80'
      }, {
        fixed: false,
        label: '修改前开始日期',
        prop: '',
        width: '200'
      }, {
        fixed: false,
        label: '修改前结束日期',
        prop: '',
        width: '200'
      }, {
        fixed: false,
        label: '修改后开始日期',
        prop: '',
        width: '200'
      }, {
        fixed: false,
        label: '修改后结束日期',
        prop: '',
        width: '200'
      }, {
        fixed: false,
        label: '工作任务',
        prop: 'planName',
        width: '200'
      }, {
        fixed: false,
        label: '工作内容',
        prop: 'planContent',
        width: '200'
      }, {
        fixed: false,
        label: '计划性质',
        prop: 'planNature',
        width: '120'
      }, {
        fixed: false,
        label: '工作类型',
        prop: 'jobType',
        width: '120'
      }, {
        fixed: false,
        label: '专业',
        prop: 'profession',
        width: '160'
      }, {
        fixed: false,
        label: '工作班组',
        prop: 'teamName',
        width: '200'
      }, {
        fixed: false,
        label: '工作地点',
        prop: 'planAddress',
        width: '200'
      }, {
        fixed: false,
        label: '计划开始日期',
        prop: 'planStartTime',
        width: '200'
      }, {
        fixed: false,
        label: '计划结束日期',
        prop: 'planEndTime',
        width: '200'
      }, {
        fixed: false,
        label: '工作方式',
        prop: 'jobWay',
        width: '100'
      }, {
        fixed: false,
        label: '电压等级',
        prop: 'voltageLevel',
        width: '120'
      }, {
        fixed: false,
        label: '作业责任单位/责任人',
        prop: 'planPrincipal',
        width: '200'
      }, {
        fixed: false,
        label: '工作单位',
        prop: 'planConstructor',
        width: '200'
      }, {
        fixed: false,
        label: '风险等级',
        prop: 'hazardLevel',
        width: '100'
      }]
    }
  },
  methods: {
    handleSelectionChange (val) { // 全选
      console.log(val)
      let table = []
      for (let i = 0; i < val.length; i++) {
        table = table.concat(val[i].id)
      }
      this.multipleSelection = table.join(',')
      // this.$emit('addIds', this.multipleSelection) // 像父组件传id集合
    },
    headerfixed (h, { column, $index }) {
      return h(
        'span', [
          h('i', {
            class: column.fixed === false ? 'el-icon-unlock' : 'el-icon-lock',
            on: {
              click: () => {
                for (let i = 0; i < this.headertable.length; i++) {
                  if (column.property === this.headertable[i].prop) {
                    console.log(this.headertable[i].prop)
                    this.headertable[i].fixed = !this.headertable[i].fixed
                  } else {
                  }
                }
              }
            }
          }),
          h('span', column.label)
        ]
      )
    },
    lookInfo (obj) { // 查看详情
      this.$emit('lookInfo', obj)
    },
    addClass ({row, column, rowIndex, columnIndex}) {
      if (column.label === '修改前开始日期' || column.label === '修改前结束日期') {
        return 'cell-yellow'
      } else if (column.label === '修改后开始日期' || column.label === '修改后结束日期') {
        return 'cell-red'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box >>> .cell-yellow
    background: #e6a23c !important
  .box >>> .cell-red
    background: #dd6161 !important
  .inputSort
    width: 30px
  .inputSort >>> input
    padding: 0 10px
    height: 30px
    line-height: 30px
  .inputAll >>> input
    padding: 0 10px
    height: 30px
    line-height: 30px
  .el-button
    padding: 8px
    font-size: 12px
  .box >>> td, .box >>> th
    padding: 6px 0

</style>
