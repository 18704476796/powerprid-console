// 用户管理接口函数
import {USER_LIST, DEPART_TREE, FIND_POSITION_SELECT_LIST, SAVE_OR_UPDATE, USER_DELETE, USER_EXPEXCEL, USER_IMPEXCELL, IMPEXCEL_TEMPLATE, FIND_CLIENT_IMPORT_LIST} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 用户管理初始化接口
    let res = await USER_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 用户列表
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async lookLoad (_this, formData) { // 导入记录查询接口
    let res = await FIND_CLIENT_IMPORT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.inportData = data.data.list // 用户列表
      _this.inportTotalRows = data.data.nav.allRows // 总条数
      _this.lookLoadData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async loadFindSysUserList (_this, formData, node, resolve) { // 组织结构懒加载化接口
    let res = await DEPART_TREE(formData)
    const data = res.data
    if (data.code === '200') {
      const nodes = data.data.list.map((item, i) => ({
        value: item.id,
        label: item.name
      }))
      resolve(nodes)
    }
  },
  async getRoleList (_this) { // 获取角色列表
    let res = await FIND_POSITION_SELECT_LIST()
    const data = res.data
    if (data.code === '200') {
      _this.roleList = data.data.list
    }
  },
  async downLoad (_this) { // 下载模板接口
    let res = await IMPEXCEL_TEMPLATE()
    const link = document.createElement('a')
    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    let num = ''
    for (let i = 0; i < 10; i++) {
      num += Math.ceil(Math.random() * 10)
    }
    link.setAttribute('download', '用户列表模板' + num + '.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  async dataDerive (_this) { // 导出接口
    let res = await USER_EXPEXCEL()
    // 处理接收的数据流
    const link = document.createElement('a')
    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    let num = ''
    for (let i = 0; i < 10; i++) {
      num += Math.ceil(Math.random() * 10)
    }
    link.setAttribute('download', '用户列表' + num + '.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  async impExcel (_this, formData) { // 导入接口
    let res = await USER_IMPEXCELL(formData)
    const data = res.data
    console.log(data)
    if (data.code === '200') {
      _this.$message({
        showClose: true,
        message: '数据导入成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    } else if (data.code === '10108') {
      _this.$message({
        showClose: true,
        message: '数据导入失败',
        type: 'error'
      })
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 添加、修改用户接口
    let res = await SAVE_OR_UPDATE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  },
  async deleteSysUser (_this, formData) { // 删除接口
    let res = await USER_DELETE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  }
}
