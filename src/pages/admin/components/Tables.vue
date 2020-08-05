<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    :height="tableHeight + 'px'"
    class="box">
    <el-table-column prop="userStatus" label="状态" width="80">
      <template slot-scope="scope">
        <span v-show="scope.row.userStatus === 1">启用</span>
        <span v-show="scope.row.userStatus === 2">暂未启用</span>
        <span v-show="scope.row.userStatus === 3">用户锁定</span>
      </template>
    </el-table-column>
    <el-table-column prop="userName" label="账号"></el-table-column>
    <el-table-column prop="realName" label="姓名" width="100"></el-table-column>
    <el-table-column prop="orgBureauName" label="分局" width="100"></el-table-column>
    <el-table-column prop="orgDepartName" label="部门" width="200"></el-table-column>
    <el-table-column prop="orgTeamName" label="班组"></el-table-column>
    <el-table-column prop="phoneNum" label="手机号"></el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column prop="positionName" label="岗位"></el-table-column>
    <el-table-column prop="userType" label="资质" width="80">
      <template slot-scope="scope">
        <span v-show="scope.row.userType === 1">两种人</span>
        <span v-show="scope.row.userType === 2">三种人</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="80">
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
    edit (obj) { // 编辑
      this.$emit('edit', obj)
    },
    deleteUser (userName) {
      this.$emit('deleteUser', userName)
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
