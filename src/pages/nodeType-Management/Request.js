import NodeTypeManagement from '@/apis/interface-fn/NodeType-ManagementFn.js' // 接口调用文件
export default {
  getInfo (_this) { // 节点类型初始化
    NodeTypeManagement.findSysUserList(_this)
  },
  onSubmit (_this) { // 创建、修改节点类型函数
    _this.$refs.ruleForm.validate((valid) => {
      if (valid) { // 表单验证通过
        let formData = {
          nodeTypeId: _this.ruleForm.id, // id
          nodeTypeName: _this.ruleForm.nodeTypeName, // 节点类型名称
          nodeTypeVal: _this.ruleForm.nodeTypeVal // 节点类型
        }
        NodeTypeManagement.saveOrUpdateSysUser(_this, formData)
      } else {
        return false // 表单验证不通过
      }
    })
  },
  deleteUser (_this, id) { // 删除节点类型函数
    _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let formData = {
        nodeTypeId: id // id
      }
      NodeTypeManagement.deleteSysUser(_this, formData)
    }).catch(() => {
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}
