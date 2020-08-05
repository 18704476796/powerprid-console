import InstitutionalCheck from '@/apis/interface-fn/InstitutionalCheckFn.js' // 接口调用文件
export default {
  getInfo (_this) { // 组织机构初始化
    let formData = {
    }
    InstitutionalCheck.findSysUserList(_this, formData)
  },
  loadGetInfo (_this, tree, treeNode, resolve) { // 组织机构初始化
    let formData = {
      parentId: tree.id
    }
    InstitutionalCheck.loadFindSysUserList(_this, formData, tree, treeNode, resolve)
  },
  onlocked (_this, locked, id) { // 修改状态函数
    let formData = {
      status: locked,
      id: id
    }
    InstitutionalCheck.updateSysUserStatus(_this, formData)
  },
  onSubmit (_this) { // 创建管理员函数
    let formData = {
      parentId: _this.ruleForm.parentId, // 父类id
      id: _this.ruleForm.id, // 自己id
      code: _this.ruleForm.code, // code
      name: _this.ruleForm.name, // 部门名称
      orgType: _this.ruleForm.orgType, // 类型
      sort: _this.ruleForm.sort, // 排序
      status: _this.ruleForm.status // 状态
    }
    InstitutionalCheck.saveOrUpdateSysUser(_this, formData)
  },
  deleteUser (_this, id, thiss) { // 删除函数
    let formData = {
      ids: id // 用户帐号
    }
    InstitutionalCheck.deleteSysUser(_this, formData, thiss)
  }
}
