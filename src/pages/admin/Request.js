import Admin from '@/apis/interface-fn/AdminFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 用户管理初始化
    Admin.findSysUserList(_this, formData)
  },
  loadGetInfo (_this, node, resolve) { // 组织机构列表
    let formData = {
      parentId: node.value
    }
    Admin.loadFindSysUserList(_this, formData, node, resolve)
  },
  getRoleList (_this) { // 获取角色列表
    Admin.getRoleList(_this)
  },
  dataDerive (_this, formDatas) { // 导出
    let formData = {
      keyWord: formDatas.keyWord,
      keyValue: formDatas.keyValue,
      userStatus: formDatas.userStatus,
      orgBureauId: formDatas.orgBureauId, // 分局id
      orgDepartId: formDatas.orgDepartId, // 部门id
      orgTeamId: formDatas.orgTeamId // 班组id
    }
    Admin.dataDerive(_this, formData)
  },
  downLoad (_this) { // 下载模板
    Admin.downLoad(_this)
  },
  impExcel (_this, file) { // 导入函数
    let params = new FormData()
    params.append('file', file)
    Admin.impExcel(_this, params)
  },
  onSubmit (_this) { // 新建、编辑用户
    let formData = {
      id: _this.ruleForm.id,
      userStatus: _this.ruleForm.userStatus, // 状态
      userName: _this.ruleForm.userName, // 帐号
      realName: _this.ruleForm.realName, // 姓名
      orgBureauId: _this.ruleForm.department[0], // 分局id
      orgDepartId: _this.ruleForm.department[1], // 部门id
      orgTeamId: _this.ruleForm.department[2], // 班组id
      phoneNum: _this.ruleForm.phoneNum, // 手机号
      positionId: _this.ruleForm.positionId, // 角色id
      userType: _this.ruleForm.userType, // 资质
      password: _this.ruleForm.pass // 密码
    }
    Admin.saveOrUpdateSysUser(_this, formData)
  },
  deleteUser (_this, id) { // 删除用户函数
    let formData = {
      ids: id // 用户id
    }
    Admin.deleteSysUser(_this, formData)
  },
  lookLoad (_this, formData) { // 查看导入记录
    Admin.lookLoad(_this, formData)
  }
}
