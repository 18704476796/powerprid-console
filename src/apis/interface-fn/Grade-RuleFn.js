// 扣分规则接口函数
import {FIND_FRACTION_ITEM_LIST, SAVE_UPDATE_FRACTION_ITEM, DELETE_FRACTION_ITEM} from '../interface.js' // 接口调用文件
export default {
  async findSysUserList (_this) { // 扣分规则初始化接口
    let res = await FIND_FRACTION_ITEM_LIST()
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.fractionItemList // 扣分规则数据列表
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 新增或修改扣分规则接口
    let res = await SAVE_UPDATE_FRACTION_ITEM(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    }
  },
  async deleteSysUser (_this, formData) { // 删除扣分规则接口
    let res = await DELETE_FRACTION_ITEM(formData)
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
