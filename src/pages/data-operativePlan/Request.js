import OperativePlan from '@/apis/interface-fn/OperativePlanFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 年作业计划初始化
    OperativePlan.findSysUserList(_this, formData)
  },
  downLoad (_this) { // 下载模板
    OperativePlan.downLoad(_this)
  },
  dataDerive (_this) { // 导出
    OperativePlan.dataDerive(_this)
  },
  impExcel (_this, file) { // 导入函数
    let params = new FormData()
    params.append('file', file)
    OperativePlan.impExcel(_this, params) // 1年计划2月计划3半月计划4周计划5日计划
  },
  getSelectList (_this, type, id) { // 获取下拉列表函数
    let formData = {
      type: type, // 1回显2添加
      id: id
    }
    OperativePlan.getSelectList(_this, formData)
  },
  onSubmit (_this, type) { // 新增，编辑作业计划编制函数
    _this.$refs.ruleForm.validate((valid) => {
      if (valid) { // 表单验证通过
        let formData = {
          planCreateType: 1, // 计划创建类型(1计划创建2补充创建)
          planCycleType: 5, // 1年计划2月计划3半月计划4周计划5日计划
          id: _this.ruleForm.id,
          planName: _this.ruleForm.planName, // 任务名称
          planContent: _this.ruleForm.planContent, // 工作内容
          planNatureId: _this.ruleForm.planNature, // 计划性质
          jobTypeId: _this.ruleForm.jobType, // 工作类型
          professionId: _this.ruleForm.profession, // 专业
          teamName: _this.ruleForm.teamName, // 工作班组
          planAddress: _this.ruleForm.planAddress, // 工作地点
          planStartTime: _this.ruleForm.planStartTime, // 开始时间
          planEndTime: _this.ruleForm.planEndTime, // 结束时间
          jobWay: _this.ruleForm.jobWay, // 工作方式
          voltageLevelType: _this.ruleForm.voltageLevelType, // 电压等级是否包含范围(是否包含"±" )
          voltageLevelId: _this.ruleForm.voltageLevel, // 电压等级
          planPrincipal: _this.ruleForm.planPrincipal, // 作业责任单位/责任人姓名(格式：责任单位XX,责任人XX,联系方式XX)
          planConstructor: _this.ruleForm.planConstructor, // 施工 工作单位/工作负责人姓名(格式：责任单位XX,责任人XX)
          hazardLevel: _this.ruleForm.hazardLevel, // 风险等级
          controlLevel: _this.ruleForm.controLevel, // 管控层级
          planModelFileCodes: _this.ruleForm.selectionWork.join(','), // 作业文件 多选','分隔(文件code)
          planHouseNum: _this.ruleForm.powerNumber, // 停电户数
          dispatchType: _this.ruleForm.operation, // 执行调度
          deviceName: _this.ruleForm.equipment, // 操作设备名称
          deviceJointName: _this.ruleForm.associatedPower, // 关联停电设备
          description: _this.ruleForm.remark, // 备注
          planAssistOrgs: _this.ruleForm.apply // 配合作业需求申请
        }
        if (type === 1) { // 1新增, 2编辑
          OperativePlan.saveOrUpdateSysUser(_this, formData)
        } else { // 编辑
          OperativePlan.updateSysUser(_this, formData)
        }
      } else {
        return false // 表单验证不通过
      }
    })
  },
  deleteUser (_this, id) { // 删除作业计划编制函数
    _this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let formData = {
        ids: id // id
      }
      OperativePlan.deleteSysUser(_this, formData)
    }).catch(() => {
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  },
  submitCheck (_this, id) { // 作业计划编制提交审核函数
    let formData = {
      ids: id // id
    }
    OperativePlan.submitCheck(_this, formData)
  }
}
