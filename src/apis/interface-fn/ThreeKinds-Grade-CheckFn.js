// 三种人扣分审核接口函数
import {FIND_LEDGER_FRACTION_AUDIT_LIST, LEDGER_FRACTION_AUDIT} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 三种人扣分审核初始化接口
    let res = await FIND_LEDGER_FRACTION_AUDIT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 作业计划列表
      _this.guideList = data.data.guideList // 创建台账步骤
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async submitCheck (_this, formData) { // 提交审核接口
    let res = await LEDGER_FRACTION_AUDIT(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '提交成功',
        type: 'success'
      })
      _this.addDrawer = false
      _this.drawer = false
      this.findSysUserList(_this, _this.formData)
    }
  }
}
