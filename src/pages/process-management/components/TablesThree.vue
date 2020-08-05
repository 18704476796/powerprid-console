<!-- 流程节点详情列表 -->
<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    :height="tableHeight + 'px'"
    class="box">
    <el-table-column prop="guideName" label="导向按钮名称" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="guideNodeName" label="导向节点名称" :show-overflow-tooltip='true'>
    </el-table-column>
    <el-table-column prop="nodeTypeName" label="节点类型" :show-overflow-tooltip='true'></el-table-column>
    <el-table-column prop="orgCodes" label="提交至部门编码" :show-overflow-tooltip='true'>
    </el-table-column>
    <el-table-column prop="remark" label="备注" :show-overflow-tooltip='true'>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-dropdown>
          <el-button type="primary">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native='edit(scope.row)'><i class="el-icon-edit-outline"></i>编辑</el-dropdown-item>
            <el-dropdown-item @click.native = 'deleteUser(scope.row.id)'><i class="el-icon-delete"></i>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TablesThree',
  props: {
    tableData: Array,
    tableHeight: Number
  },
  data () {
    return {
    }
  },
  methods: {
    edit (obj) { // 编辑
      this.$emit('editPlan', obj)
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
