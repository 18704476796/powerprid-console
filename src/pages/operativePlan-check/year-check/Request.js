import OperativePlan from '@/apis/interface-fn/OperativePlanFn.js' // 作业计划编制接口调用文件
import OperativePlanCheckFn from '@/apis/interface-fn/operativePlan-checkFn.js' // 作业计划审核接口调用文件
export default {
  getInfo (_this, formData) { // 年作业计划初始化
    OperativePlan.findSysUserList(_this, formData)
  },
  getSelectList (_this, type, id) { // 获取下拉列表函数
    let formData = {
      type: type, // 1回显2添加
      id: id
    }
    OperativePlanCheckFn.getSelectList(_this, formData)
  },
  submitCheck (_this, id) { // 作业计划编制提交审核函数
    let formData = {
      ids: id // id
    }
    OperativePlan.submitCheck(_this, formData)
  }
}
