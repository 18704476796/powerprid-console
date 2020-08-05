import PostCheck from '@/apis/interface-fn/PostCheckFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 岗位管理初始化
    PostCheck.findSysUserList(_this, formData)
  },
  onSubmit (_this) { // 新增、修改岗位函数
    let formData = {
      positionId: _this.ruleForm.id, // id
      positionName: _this.ruleForm.positionName, // 姓名
      isStatus: _this.ruleForm.isStatus, // 状态
      sort: _this.ruleForm.sort // 排序
    }
    PostCheck.saveOrUpdateSysUser(_this, formData)
  },
  deleteUser (_this, id) { // 删除岗位函数
    let formData = {
      positionId: id // 用户帐号
    }
    PostCheck.deleteSysUser(_this, formData)
  }
}
