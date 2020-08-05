<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    class="box">
    <el-table-column
      label="序号"
      type="index"
      width="55">
    </el-table-column>
    <el-table-column prop="userName" label="姓名" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="description" label="扣分原因" width="160"></el-table-column>
    <el-table-column prop="fraction" label="扣除分数" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="createTime" label="时间"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TablesThree',
  props: {
    tableData: Array
  },
  data () {
    return {
      multipleSelection: [] // 多选id集合
    }
  },
  methods: {
    handleSelectionChange (val) { // 添加三种人
      let table = []
      for (let i = 0; i < val.length; i++) {
        table = table.concat(val[i].userId)
      }
      // this.multipleSelection = table
      this.$emit('addKinds', table) // 像父组件传用户id集合
    }
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
