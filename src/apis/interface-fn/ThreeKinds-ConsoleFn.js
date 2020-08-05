// 三种人管理接口函数
import {FIND_SYS_USER_LEDGER, IMPORT_SYS_USER_LEDGER, FIND_SYS_USER_LIST, SAVE_SYS_USER_LEDGER, DELETE_SYS_USER_LEDGER, FIND_SYS_ORG_DEPART_SELECT_LIST, INFO_SHOW, UPDATE_SYS_USER_LEDGER, FIND_LEDGER_FRACTION_LIST} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 三种人管理初始化接口
    let res = await FIND_SYS_USER_LEDGER(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list // 作业计划列表
      _this.guideList = data.data.guideList // 创建台账步骤
      _this.totalRows = data.data.nav.allRows // 总条数
      _this.formData.pageSize = data.data.nav.pageSize // 每页显示条数
    }
  },
  async addGetInfoTable (_this, formData) { // 新增三种人管理初始化列表接口
    let res = await FIND_SYS_USER_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.addTableData = data.data.list // 作业计划列表
      _this.totalRowsTwo = data.data.nav.allRows // 总条数
      _this.pageSizeTwo = data.data.nav.pageSize // 每页显示条数
    }
  },
  async addKinds (_this, formData) { // 提交新增三种人管理列表接口
    let res = await SAVE_SYS_USER_LEDGER(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '新增成功',
        type: 'success'
      })
      _this.addDrawer = false
      this.findSysUserList(_this, _this.formData)
    }
  },
  async dataDerive (_this) { // 导出接口
    let res = await IMPORT_SYS_USER_LEDGER()
    // 处理接收的数据流
    const link = document.createElement('a')
    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    let num = ''
    for (let i = 0; i < 10; i++) {
      num += Math.ceil(Math.random() * 10)
    }
    link.setAttribute('download', '三种人管理列表' + num + '.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  async getDanweiList (_this, formData) { // 获取单位下拉列表接口
    let res = await FIND_SYS_ORG_DEPART_SELECT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.danWeiList = data.data.list // 单位下拉列表
    }
  },
  async getAllGwList (_this, formData) { // 获取全部岗位下拉列表接口
    let res = await FIND_SYS_ORG_DEPART_SELECT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.postList = data.data.list // 全部岗位下拉列表
    }
  },
  async getBmList (_this, formData) { // 获取部门下拉列表接口
    let res = await FIND_SYS_ORG_DEPART_SELECT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.bMList = data.data.list // 部门下拉列表
    }
  },
  async getBzList (_this, formData) { // 获取班组下拉列表接口
    let res = await FIND_SYS_ORG_DEPART_SELECT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.teamNameList = data.data.list // 部门下拉列表
    }
  },
  async getGwList (_this, formData) { // 获取岗位下拉列表接口
    let res = await FIND_SYS_ORG_DEPART_SELECT_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.gWiList = data.data.list // 岗位下拉列表
    }
  },
  async getSelectList (_this, formData) { // 获取下拉列表接口
    let res = await INFO_SHOW(formData)
    const data = res.data
    if (data.code === '200') {
      _this.jobTypeList = data.data.jobTypes // 工作类型下拉列表
      _this.professionList = data.data.professions // 专业名称下拉列表
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 编辑三种人管理函数接口
    let res = await UPDATE_SYS_USER_LEDGER(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '新增成功',
        type: 'success'
      })
      this.findSysUserList(_this, _this.formData)
    }
  },
  async deleteSysUser (_this, formData) { // 删除接口
    let res = await DELETE_SYS_USER_LEDGER(formData)
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
  },
  async lookGrade (_this, formData) { // 查看分数
    let res = await FIND_LEDGER_FRACTION_LIST(formData)
    const data = res.data
    if (data.code === '200') {
      _this.gradeTable = data.data.list
    }
  }
}
