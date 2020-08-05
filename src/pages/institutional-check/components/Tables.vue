<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    ref="table"
    :default-expand-all="false"
    row-key="id"
    border
    :height="tableHeight + 'px'"
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'isParent'}">
    class="box">
    <el-table-column prop="name" label="部门名称"></el-table-column>
    <el-table-column prop="sort" label="排序" width="80"></el-table-column>
    <el-table-column prop="status" label="状态" width="100">
      <el-switch
        slot-scope="scope"
        v-model="scope.row.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="1"
        :inactive-value="0"
        active-text="启用"
        inactive-text="锁定"
        @change="onlocked(scope.row.status, scope.row.id)">
      </el-switch>
    </el-table-column>
    <el-table-column prop="orgType" label="类型">
      <template slot-scope="scope">
          <span v-if='scope.row.orgType === 1'>总部供电区</span>
          <span v-else>区县供电局</span>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-dropdown>
          <el-button type="primary">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native='edit(scope.row)'><i class="el-icon-edit-outline"></i>编辑</el-dropdown-item>
            <el-dropdown-item @click.native='addInfo(scope.row)'><i class="el-icon-plus"></i>新增</el-dropdown-item>
            <el-dropdown-item @click.native = 'deleteUser(scope.row)'><i class="el-icon-delete"></i>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    }
  },
  methods: {
    load (tree, treeNode, resolve) {
      this.$emit('load', tree, treeNode, resolve)
    },
    onlocked (locked, id) {
      this.$emit('onlocked', locked, id)
    },
    edit (obj) { // 编辑
      this.$emit('edit', obj)
    },
    addInfo (obj) { // 新增
      this.$emit('addInfo', obj)
    },
    deleteUser (obj) { // 删除
      // const { pid } = obj
      // let lazyTreeNodeMap = this.$refs.table.store.states.lazyTreeNodeMap
      // let objs = this.$set(this.$refs.table.store.states.lazyTreeNodeMap, pid, []) //将对应节点下的数据清空，从而实现数据的重新加载
      // console.log(objs)
      this.$emit('deleteUser', obj, this)
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
</style>
