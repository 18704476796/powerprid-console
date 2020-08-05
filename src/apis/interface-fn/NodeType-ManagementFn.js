// 节点类型管理接口函数
import {FIND_OLAN_NODE_TYPE_LIST, SAVE_UPDATE_PLAN_NODE_TYPE, DELETE_PLAN_NODE_TYPE} from '../interface.js' // 接口调用文件
export default {
  async findSysUserList (_this) { // 节点类型管理初始化接口
    let res = await FIND_OLAN_NODE_TYPE_LIST()
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 扣分规则数据列表
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 新增或修改节点类型管理接口
    let res = await SAVE_UPDATE_PLAN_NODE_TYPE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    } else {
      _this.$message({
        message: '节点类型重复！',
        type: 'error'
      })
    }
  },
  async deleteSysUser (_this, formData) { // 删除节点类型接口
    let res = await DELETE_PLAN_NODE_TYPE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    }
  }
}
