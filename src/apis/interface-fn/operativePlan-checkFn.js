// 作业计划审核接口函数
import {INFO_SHOW} from '../interface.js' // 接口调用文件

export default {
  async getSelectList (_this, formData) { // 获取下拉列表接口
    let res = await INFO_SHOW(formData)
    const data = res.data
    if (data.code === '200') {
      // 给表单赋值
      let planInfoBean = data.data.planInfoBean
      _this.ruleForm = planInfoBean
      console.log(planInfoBean.voltageLevelType)
      if (planInfoBean.voltageLevelType === true) {
        _this.ruleForm.voltageLevelType = '是'
        _this.ruleForm.voltageLevel = '±' + planInfoBean.voltageLevel
      } else {
        _this.ruleForm.voltageLevelType = '否'
        _this.ruleForm.voltageLevel = planInfoBean.voltageLevel
      }
    }
  }
}
