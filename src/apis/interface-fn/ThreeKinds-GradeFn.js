// 三种人扣分管理接口函数
import {FIND_SYS_USER_LEDGER, FIND_FRACTION_ITEM_LIST, SAVE_UPDATE_LEDGER_FRACTION} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 三种人扣分管理初始化接口
    let res = await FIND_SYS_USER_LEDGER(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 作业计划列表
      _this.guideList = data.data.guideList // 创建台账步骤
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async getFractionList (_this) { // 获取扣分原因列表接口
    let res = await FIND_FRACTION_ITEM_LIST()
    const data = res.data
    if (data.code === '200') {
      _this.fractionList = data.data.fractionItemList
    }
  },
  async submitCheck (_this, formData) { // 提交审核接口
    let res = await SAVE_UPDATE_LEDGER_FRACTION(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '提交成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  }
}
