import ThreeKindsConsole from '@/apis/interface-fn/ThreeKinds-ConsoleFn.js' // 接口调用文件
import ThreeKindsCheck from '@/apis/interface-fn/ThreeKinds-CheckFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 三种人审核初始化
    ThreeKindsCheck.findSysUserList(_this, formData)
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
  submitCheck (_this, guideNodeId) { // 三种人审核提交函数
    let formData = {
      taskIds: _this.ids, // id
      guideNodeId: guideNodeId, // 审核步骤id
      description: _this.ruleForm.reason // 理由
    }
    ThreeKindsCheck.submitCheck(_this, formData)
  }
}
