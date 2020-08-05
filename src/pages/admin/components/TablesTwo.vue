<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    :height="tableHeight + 'px'"
    class="box">
    <el-table-column prop="isSuccess" label="导入状态" width="80">
      <template slot-scope="scope">
        <span v-show="scope.row.isSuccess === 0">失败</span>
        <span v-show="scope.row.isSuccess === 1">成功</span>
      </template>
    </el-table-column>
    <el-table-column prop="failedPosition" label="行数" width="120"></el-table-column>
    <el-table-column prop="operaName" label="姓名" width="120"></el-table-column>
    <el-table-column prop="operaType" label="导入用户" width="120"></el-table-column>
    <el-table-column prop="createTime" label="时间"></el-table-column>
    <el-table-column prop="remark" label="备注" :show-overflow-tooltip='true'>
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
    }
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
