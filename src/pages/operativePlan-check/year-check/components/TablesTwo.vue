<!-- 自动校核返回表格 -->
<template>
  <el-table
    :data="tableData"
    :header-cell-style="{background:'#fff',color:'#409EFF'}"
    style="width: 100%"
    :align='center'
    border
    class="box">
    <el-table-column prop="month" label="月份"></el-table-column>
    <el-table-column prop="planningData" label="计划数"></el-table-column>
    <el-table-column prop="threshold" label="阈值"></el-table-column>
    <el-table-column prop="result" label="结果">
      <template slot-scope="scope">
        <span v-if='scope.row.locked'></span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TablesTwo',
  props: {
    tableData: Array
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
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
    display: table-cell !important
</style>
