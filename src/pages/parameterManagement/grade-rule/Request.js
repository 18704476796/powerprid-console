import GradeRule from '@/apis/interface-fn/Grade-RuleFn.js' // 接口调用文件
export default {
  getInfo (_this) { // 用户管理初始化
    GradeRule.findSysUserList(_this)
  },
  onSubmit (_this) { // 创建、修改扣分规则函数
    _this.$refs.ruleForm.validate((valid) => {
      if (valid) { // 表单验证通过
        let formData = {
          id: _this.ruleForm.id, // 帐号
          fractionName: _this.ruleForm.fractionName, // 名称
          fraction: _this.ruleForm.fraction, // 扣除分数
          description: _this.ruleForm.description // 扣分原因
        }
        GradeRule.saveOrUpdateSysUser(_this, formData)
      } else {
        return false // 表单验证不通过
      }
    })
  },
  deleteUser (_this, id) { // 删除乘客用户函数
    _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let formData = {
        fractionItemId: id // id
      }
      GradeRule.deleteSysUser(_this, formData)
    }).catch(() => {
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}
