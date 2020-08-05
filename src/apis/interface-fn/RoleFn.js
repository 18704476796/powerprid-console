// 角色管理接口函数
import {FIND_ROLE_LIST, SAVE_UPDATE_ROLE, DELETE_ROLE} from '../interface.js' // 接口调用文件
export default {
  async findRoleList (_this, formData) { // 角色列表接口函数
    let res = await FIND_ROLE_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.formData = data.data.list
    }
  },
  async saveOrUpdateRoleControl (_this, formData) { // 创建编辑角色接口函数
    let res = await SAVE_UPDATE_ROLE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findRoleList(_this) // 重加载角色列表
      _this.drawer = false // 将创建角色弹层收回
    } else if (data.code === '8888') {
      _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
    } else if (data.code === '8889') {
      _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
    } else if (data.code === '8890') {
      _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
    }
  },
  async deleteRole (_this, formData) { // 删除角色接口函数
    let res = await DELETE_ROLE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '角色删除成功',
        type: 'success'
      })
      let formData = {
        keyword: _this.searchTypeVal.type,
        keywordValue: _this.searchTypeVal.val
      }
      this.findRoleList(_this, formData)
    }
  }
}
