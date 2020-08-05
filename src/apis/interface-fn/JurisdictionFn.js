// 权限管理接口函数
import {FIND_ROLE_CONTROL, JURISDICTION_PRESERVATION_MODIFY} from '../interface.js' // 接口调用文件
export default {
  async findRoleControl (_this, formData) { // 权限管理初始化接口
    let res = await FIND_ROLE_CONTROL(formData)
    const data = res.data
    if (data.code === '200') {
      _this.roleList = data.data.roleList // 角色列表
      _this.roleSelection = Number(data.data.roleId) // 选中的角色
      _this.unauthorized = data.data.menuList // 所有权限（包含未拥有权限）
      _this.hasPermission = data.data.idList
    } else if (data.code === '8888') {
      _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
    } else if (data.code === '8889') {
      _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
    } else if (data.code === '8890') {
      _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
    }
  },
  async saveOrUpdateRoleControl (_this, formData) { // 权限管理，权限变化更新函数
    let res = await JURISDICTION_PRESERVATION_MODIFY(formData)
    const data = res.data
    if (data.status === '1000') {
      _this.$message({
        type: 'success',
        message: '操作成功！'
      })
    }
  }
}
