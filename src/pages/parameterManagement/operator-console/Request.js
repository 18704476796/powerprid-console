import ThreeKindsConsole from '@/apis/interface-fn/ThreeKinds-ConsoleFn.js' // 接口调用文件
import OperativePlan from '@/apis/interface-fn/OperativePlanFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 三种人管理初始化
    ThreeKindsConsole.findSysUserList(_this, formData)
  },
  addGetInfoTable (_this, pageSizeTwo, currentPageTwo) { // 获取新增列表
    let formData = {
      currentPage: currentPageTwo,
      pageSize: pageSizeTwo
    }
    ThreeKindsConsole.addGetInfoTable(_this, formData)
  },
  addKinds (_this, ids) { // 提交新增列表
    let para = JSON.stringify(ids)
    let formData = {
      userIds: para
    }
    ThreeKindsConsole.addKinds(_this, formData)
  },
  dataDerive (_this) { // 导出
    ThreeKindsConsole.dataDerive(_this)
  },
  getDanweiList (_this, type) { // 获取单位下拉列表
    let formData = {
      type: type
    }
    ThreeKindsConsole.getDanweiList(_this, formData)
  },
  getBmList (_this, parentId) { // 获取部门下拉列表
    let formData = {
      parentId: parentId
    }
    ThreeKindsConsole.getBmList(_this, formData)
  },
  getBzList (_this, parentId) { // 获取班组下拉列表
    let formData = {
      parentId: parentId
    }
    ThreeKindsConsole.getBzList(_this, formData)
  },
  getGwList (_this, parentId) { // 获取岗位下拉列表
    let numReg = /^[0-9]*$/
    let numRe = new RegExp(numReg)
    if (!numRe.test(parentId)) {
      _this.gWiList = []
    } else {
      let formData = {
        parentId: parentId
      }
      ThreeKindsConsole.getGwList(_this, formData)
    }
  },
  getSelectList (_this, type, id) { // 获取下拉列表函数
    let formData = {
      type: type, // 1回显2添加
      id: id
    }
    ThreeKindsConsole.getSelectList(_this, formData)
  },
  onSubmit (_this) { // 编辑三种人管理函数
    _this.$refs.ruleForm.validate((valid) => {
      if (valid) { // 表单验证通过
        let numReg = /^[0-9]*$/
        let numRe = new RegExp(numReg)
        let groupId = ''
        let addGroupName = ''
        if (!numRe.test(_this.ruleForm.groupId)) {
          addGroupName = _this.ruleForm.groupId
          groupId = null
        } else {
          groupId = _this.ruleForm.groupId
          addGroupName = ''
        }
        let postId = ''
        let addPostName = ''
        if (!numRe.test(_this.ruleForm.postId)) {
          addPostName = _this.ruleForm.postId
          postId = null
        } else {
          postId = _this.ruleForm.postId
          addPostName = ''
        }
        let formData = {
          id: _this.ruleForm.id,
          userId: _this.ruleForm.userId, // 用户id
          orgId: _this.ruleForm.orgId, // 单位id
          deptId: _this.ruleForm.deptId, // 部门id
          realName: _this.ruleForm.realName, // 姓名
          idCard: _this.ruleForm.idCard, // 身份证号
          groupId: groupId, // 班组
          addGroupName: addGroupName, // 新增班组名称
          postId: postId, // 岗位id
          addPostName: addPostName, // 新增岗位名称
          professionId: _this.ruleForm.professionId, // 专业id
          jobTypeId: _this.ruleForm.jobTypeId, // 类别id
          pointsDeductedCount: _this.ruleForm.pointsDeductedCount // 分数
        }
        ThreeKindsConsole.saveOrUpdateSysUser(_this, formData)
      } else {
        return false // 表单验证不通过
      }
    })
  },
  deleteUser (_this, id) { // 删除人员管理函数
    _this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let para = JSON.stringify(id)
      let formData = {
        userIds: para // id
      }
      ThreeKindsConsole.deleteSysUser(_this, formData)
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
