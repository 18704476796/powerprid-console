import ProcessManagement from '@/apis/interface-fn/Process-ManagementFn.js' // 接口调用文件
export default {
  getInfo (_this) { // 流程管理初始化
    ProcessManagement.findSysUserList(_this)
  },
  nodeTypeList (_this) { // 获取节点类型列表
    ProcessManagement.nodeTypeList(_this)
  },
  onSubmit (_this) { // 新建、编辑流程
    let formData = {
      processId: _this.ruleForm.id,
      processName: _this.ruleForm.processName // 名称
    }
    ProcessManagement.saveOrUpdateSysUser(_this, formData)
  },
  onSubmitNode (_this) { // 新建流程节点
    let formData = {
      processId: _this.processId, // 流程id
      nodeName: _this.nodeForm.nodeName, // 节点名称
      nodeTypeVal: _this.nodeForm.nodeTypeVal, // 节点类型
      nodeSort: _this.nodeForm.nodeSort // 节点排序
    }
    ProcessManagement.onSubmitNode(_this, formData)
  },
  onSubmitEditNode (_this) { // 编辑流程节点
    let formData = {
      processId: _this.processId, // 流程id
      id: _this.nodeForm.id, // 流程节点id
      nodeName: _this.nodeForm.nodeName, // 节点名称
      nodeTypeVal: _this.nodeForm.nodeTypeVal, // 节点类型
      nodeSort: _this.nodeForm.nodeSort // 节点排序
    }
    ProcessManagement.onSubmitEditNode(_this, formData)
  },
  lookPro (_this, id) { // 查看流程
    let formData = {
      processId: id
    }
    ProcessManagement.lookPro(_this, formData)
  },
  lookNodeChid (_this, id) { // 流程节点查看详情
    let formData = {
      planNodeId: id
    }
    ProcessManagement.lookNodeChid(_this, formData)
  },
  onSubmitPlan (_this) { // 新建节点按钮
    let arry = _this.planForm.orgCodes
    let table = []
    for (let i = 0; i < arry.length; i++) {
      table = table.concat(arry[i].pop())
    }
    table = table.join(',')
    let formData = {
      planNodeId: _this.planNodeId, // 流程节点id
      guideName: _this.planForm.guideName, // 导向节点名称
      guideNodeId: _this.planForm.guideNodeId, // 导向节点id
      nodeTypeVal: _this.planForm.nodeTypeVal, // 节点排序
      orgIds: table, // 提交至部门编码
      remark: _this.planForm.remark // 备注
    }
    ProcessManagement.onSubmitPlan(_this, formData)
  },
  onSubmitEditPlan (_this) { // 编辑节点按钮
    let ids = ''
    if (_this.planForm.orgCodes === _this.orgCodes) {
      ids = _this.orgIds
    } else {
      let arry = _this.planForm.orgCodes
      let table = []
      for (let i = 0; i < arry.length; i++) {
        table = table.concat(arry[i].pop())
      }
      ids = table.join(',')
    }
    let formData = {
      planNodeId: _this.planNodeId, // 流程节点id
      id: _this.planForm.id,
      guideName: _this.planForm.guideName, // 导向节点名称
      guideNodeId: _this.planForm.guideNodeId, // 导向节点id
      nodeTypeVal: _this.planForm.nodeTypeVal, // 节点排序
      orgIds: ids, // 提交至部门编码
      remark: _this.planForm.remark // 备注
    }
    ProcessManagement.onSubmitEditPlan(_this, formData)
  },
  loadGetInfo (_this, node, resolve) { // 组织机构列表
    let formData = {
      parentId: node.value
    }
    ProcessManagement.loadFindSysUserList(_this, formData, node, resolve)
  }
}
