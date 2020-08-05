// 作业计划编制接口函数
import {PLAN_LIST, IMP_EXCEL, DOWNLOAD_PLAN_INFO_TEMLATE, IMPROT_PLAN_INFO, INFO_SHOW, INFO_ADD, INFO_DELETE, INFO_UPDATE, UPDATE_PLAN_STATUS} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 作业计划编制管理初始化接口
    let res = await PLAN_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 作业计划列表
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async downLoad (_this) { // 下载模板接口
    let res = await DOWNLOAD_PLAN_INFO_TEMLATE()
    const link = document.createElement('a')
    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    let num = ''
    for (let i = 0; i < 10; i++) {
      num += Math.ceil(Math.random() * 10)
    }
    link.setAttribute('download', '计划编制列表模板' + num + '.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  async dataDerive (_this) { // 导出接口
    let res = await IMPROT_PLAN_INFO()
    // 处理接收的数据流
    const link = document.createElement('a')
    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    let num = ''
    for (let i = 0; i < 10; i++) {
      num += Math.ceil(Math.random() * 10)
    }
    link.setAttribute('download', '计划编制列表' + num + '.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  async impExcel (_this, formData) { // 导入接口
    let res = await IMP_EXCEL(formData)
    const data = res.data
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
  async getSelectList (_this, formData) { // 获取下拉列表接口
    let res = await INFO_SHOW(formData)
    const data = res.data
    if (data.code === '200') {
      _this.planNatureList = data.data.planNatures // 计划性质下拉列表
      _this.jobTypeList = data.data.jobTypes // 工作类型下拉列表
      _this.professionList = data.data.professions // 专业名称下拉列表
      _this.voltageLevelList = data.data.voltageLevels // 电压等级下拉列表
      _this.selectionWorkList = data.data.planModelFile // 关选用作业文件下拉列表
      let teamNameList = data.data.orgList
      for (let i = 0; i < teamNameList.length; i++) { // 去空格
        teamNameList[i].name = teamNameList[i].name.trim()
      }
      _this.teamNameList = teamNameList // 工作班组
      _this.associatedPowerList = data.data.planDevice // 设备列表
      _this.applyList = data.data.planAssistOrgs // 配合作业需求申请列表
      // 给表单赋值
      let planInfoBean = data.data.planInfoBean
      _this.ruleForm.id = planInfoBean.id
      _this.ruleForm.planName = planInfoBean.planName // 任务名称
      _this.ruleForm.planContent = planInfoBean.planContent // 工作内容
      _this.ruleForm.planNature = planInfoBean.planNatureId // 计划性质
      _this.ruleForm.jobType = planInfoBean.jobTypeId // 工作类型
      _this.ruleForm.profession = planInfoBean.professionId // 专业
      _this.ruleForm.teamName = planInfoBean.teamName // 工作班组
      _this.ruleForm.planAddress = planInfoBean.planAddress // 工作地点
      _this.ruleForm.planStartTime = planInfoBean.planStartTime // 开始时间
      _this.ruleForm.planEndTime = planInfoBean.planEndTime // 结束时间
      _this.ruleForm.jobWay = planInfoBean.jobWay // 工作方式
      _this.ruleForm.voltageLevelType = planInfoBean.voltageLevelType // 电压等级是否包含范围(是否包含"±" )
      if (planInfoBean.voltageLevelType === true) {
        _this.fanTrue = true
      } else {
        _this.fanTrue = false
      }
      _this.ruleForm.voltageLevel = planInfoBean.voltageLevelId // 电压等级
      _this.ruleForm.planPrincipal = planInfoBean.planPrincipal // 作业责任单位/责任人姓名(格式：责任单位XX,责任人XX,联系方式XX)
      _this.ruleForm.planConstructor = planInfoBean.planConstructor // 施工 工作单位/工作负责人姓名(格式：责任单位XX,责任人XX)
      _this.ruleForm.hazardLevel = planInfoBean.hazardLevel // 风险等级
      _this.ruleForm.controLevel = planInfoBean.controlLevel // 管控层级
      _this.ruleForm.selectionWork = planInfoBean.planModelFileCodes.split(',') // 作业文件 多选','分隔(文件code)
      _this.ruleForm.powerNumber = planInfoBean.planHouseNum // 停电户数
      _this.ruleForm.operation = planInfoBean.dispatchType // 执行调度
      _this.ruleForm.equipment = planInfoBean.deviceName // 操作设备名称
      _this.ruleForm.associatedPower = planInfoBean.deviceJointName // 关联停电设备
      _this.ruleForm.remark = planInfoBean.description // 备注
      _this.ruleForm.apply = planInfoBean.cooperating// 配合作业需求申请
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 新增作业计划编制接口
    let res = await INFO_ADD(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '新增成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  },
  async updateSysUser (_this, formData) { // 编辑作业计划编制接口
    let res = await INFO_UPDATE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  },
  async deleteSysUser (_this, formData) { // 删除接口
    let res = await INFO_DELETE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '删除成功',
        type: 'success'
      })
      _this.ids = ''
      this.findSysUserList(_this, _this.formData)
    }
  },
  async submitCheck (_this, formData) { // 提交审核接口
    let res = await UPDATE_PLAN_STATUS(formData)
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
