<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    tooltip-effect="dark"
    ref="multipleTable"
    border
    @selection-change="handleSelectionChange"
    class="box">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="序号"
      type="index"
      width="55">
    </el-table-column>
    <el-table-column prop="orgName" label="单位" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="realName" label="姓名" width="160"></el-table-column>
    <el-table-column prop="idCard" label="身份证号" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="groupName" label="班组"></el-table-column>
    <el-table-column prop="postName" label="岗位"></el-table-column>
    <el-table-column prop="professionName" label="专业" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="jobTypeName" label="类别" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="pointsDeductedCount" label="分数"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Tables',
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
