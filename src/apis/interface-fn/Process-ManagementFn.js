// 流程管理接口函数
import {FIND_PLAN_PROCESS_LIST, SAVE_UPDATE_PLAN_PROCESS, NODE_LIST, FIND_PLAN_NODE_TYPE_SELECT_LIST, NODE_ADD, NODE_UPDATE, GUIDE_LIST, GUIDE_ADD, GUIDE_UPDATE, DEPART_TREE} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this) { // 流程管理初始化接口
    let res = await FIND_PLAN_PROCESS_LIST()
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 流程管理初始化列表
    }
  },
  async nodeTypeList (_this) { // 获取节点类型列表接口
    let res = await FIND_PLAN_NODE_TYPE_SELECT_LIST()
    const data = res.data
    if (data.code === '200') {
      _this.nodeTypeList = data.data.list // 节点类型列表
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 添加、修改流程接口
    let res = await SAVE_UPDATE_PLAN_PROCESS(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    }
  },
  async lookPro (_this, formData) { // 流程查看流程节点详情接口
    let res = await NODE_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.nodeTable = data.data.list // 流程节点列表
    }
  },
  async onSubmitNode (_this, formData) { // 添加流程节点接口
    let res = await NODE_ADD(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '添加成功',
        type: 'success'
      })
      let formDatas = {
        processId: _this.processId
      }
      this.lookPro(_this, formDatas)
    }
  },
  async onSubmitEditNode (_this, formData) { // 编辑流程节点接口
    let res = await NODE_UPDATE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '编辑成功',
        type: 'success'
      })
      let formDatas = {
        processId: _this.processId
      }
      this.lookPro(_this, formDatas)
    }
  },
  async lookNodeChid (_this, formData) { // 流程节点查看详情接口
    let res = await GUIDE_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.nodeChildTable = data.data.list // 流程节点列表
    }
  },
  async onSubmitPlan (_this, formData) { // 添加节点按钮接口
    let res = await GUIDE_ADD(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '添加成功',
        type: 'success'
      })
      let formDatas = {
        planNodeId: _this.planNodeId
      }
      this.lookNodeChid(_this, formDatas)
    }
  },
  async onSubmitEditPlan (_this, formData) { // 编辑节点按钮接口
    let res = await GUIDE_UPDATE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '编辑成功',
        type: 'success'
      })
      let formDatas = {
        planNodeId: _this.planNodeId
      }
      this.lookNodeChid(_this, formDatas)
    }
  },
  async loadFindSysUserList (_this, formData, node, resolve) { // 组织结构懒加载化接口
    let res = await DEPART_TREE(formData)
    const data = res.data
    if (data.code === '200') {
      const nodes = data.data.list.map((item, i) => ({
        value: item.id,
        label: item.name
      }))
      resolve(nodes)
    }
  },
  async deleteSysUser (_this, formData) { // 删除接口
    let res = await USER_DELETE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  }
}
