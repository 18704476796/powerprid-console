// 岗位管理接口函数
import {FIND_POSITION_LIST, SAVE_UPDATE_POSITION, DELETE_POSITION} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 组织结构初始化接口
    let res = await FIND_POSITION_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 新增或修改岗位管理接口
    let res = await SAVE_UPDATE_POSITION(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    }
  },
  async deleteSysUser (_this, formData) { // 删除岗位信息接口
    let res = await DELETE_POSITION(formData)
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
