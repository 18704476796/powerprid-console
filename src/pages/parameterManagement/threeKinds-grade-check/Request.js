import ThreeKindsConsole from '@/apis/interface-fn/ThreeKinds-ConsoleFn.js' // 接口调用文件
import ThreeKindsGradeCheck from '@/apis/interface-fn/ThreeKinds-Grade-CheckFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 三种人扣分审核管理初始化
    ThreeKindsGradeCheck.findSysUserList(_this, formData)
  },
  getAllGwList (_this, type) { // 获取全部岗位下拉列表
    let formData = {
      type: 4 // 4全部
    }
    ThreeKindsConsole.getAllGwList(_this, formData)
  },
  getSelectList (_this, type) { // 获取下拉列表函数
    let formData = {
      type: type // 1回显2添加
    }
    ThreeKindsConsole.getSelectList(_this, formData)
  },
  onSubmitEdit (_this, type) { // 提交审核结果接口
    let formData = {
      auditStatus: type, // 1通过2驳回
      ledgerFractionIds: _this.ids, // id集合
      auditReason: _this.ruleForm.reason // 审核理由
    }
    ThreeKindsGradeCheck.submitCheck(_this, formData)
  }
}
