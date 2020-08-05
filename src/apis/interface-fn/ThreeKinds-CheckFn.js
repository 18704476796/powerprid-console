// 三种人审核接口函数
import {SYS_USER_LEDGER_TODO_TASKS_LIST, SYS_USER_LEDGER_AUDIT} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 三种人审核初始化接口
    let res = await SYS_USER_LEDGER_TODO_TASKS_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.taskList // 作业计划列表
      _this.guideList = data.data.guideList // 按钮
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async submitCheck (_this, formData) { // 提交审核接口
    let res = await SYS_USER_LEDGER_AUDIT(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '提交成功',
        type: 'success'
      })
      _this.ids = ''
      this.findSysUserList(_this, _this.formData)
    }
  }
}
