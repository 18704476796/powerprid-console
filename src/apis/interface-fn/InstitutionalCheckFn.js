// 组织机构接口函数
import {DEPART_TREE, DEPART_ADD, DEPART_UPDATA_STATUS_BYID, DEPART_DELETE} from '../interface.js' // 接口调用文件

export default {
  async findSysUserList (_this, formData) { // 组织结构初始化接口
    let res = await DEPART_TREE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.tableData = data.data.list
    }
  },
  async loadFindSysUserList (_this, formData, tree, treeNode, resolve) { // 组织结构懒加载化接口
    let res = await DEPART_TREE(formData)
    const data = res.data
    if (data.code === '200') {
      let newData = data.data.list
      if (newData === [] || newData === null || newData === undefined || newData === '' || newData.length === 0) {
        let datas = []
        resolve(datas)
        _this.$confirm('数据已更新，部分数据需要刷新浏览器方可生效，是否刷新？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: false
        }).then(() => {
          location.reload() // 刷新浏览器
        }).catch(() => {
          this.findSysUserList(_this)
        })
      } else {
        resolve(data.data.list)
      }
    }
  },
  async updateSysUserStatus (_this, formData) { // 修改状态接口
    let res = await DEPART_UPDATA_STATUS_BYID(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        showClose: true,
        message: '状态值修改成功',
        type: 'success'
      })
    }
  },
  async saveOrUpdateSysUser (_this, formData) { // 新增或修改组织机构接口
    let res = await DEPART_ADD(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      // 懒加载刷新当前级
      if (_this.addData.id && _this.maps.get(_this.addData.id)) {
        const {tree, treeNode, resolve} = _this.maps.get(_this.addData.id)
        let formDatas = {
          parentId: _this.addData.id
        }
        this.loadFindSysUserList(_this, formDatas, tree, treeNode, resolve)
      }
      // 懒加载刷新父级
      const parentId = _this.addData.parentId
      if (parentId && _this.maps.get(parentId)) {
        const {tree, treeNode, resolve} = _this.maps.get(parentId)
        let formDatas = {
          parentId: _this.addData.parentId
        }
        this.loadFindSysUserList(_this, formDatas, tree, treeNode, resolve)
      }
    }
  },
  async deleteSysUser (_this, formData) { // 删除信息接口
    let res = await DEPART_DELETE(formData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '删除成功',
        type: 'success'
      })
      // this.findSysUserList()
      // const { pid } = obj
      // const {tree, treeNode, resolve} = _this.maps.get(_this.addData.id)
      // _this.$set(thiss.$refs.table.store.states.lazyTreeNodeMap, pid, []) //将对应节点下的数据清空，从而实现数据的重新加载
      // let formDatas = {
      //     parentId: _this.addData.id
      //   }
      //  this.loadFindSysUserList(_this, formDatas, tree, treeNode, resolve)
      // 懒加载刷新当前级
      // if (_this.addData.id && _this.maps.get(_this.addData.id)) {
      //   const {tree, treeNode, resolve} = _this.maps.get(_this.addData.id)
      //   let formDatas = {
      //     parentId: _this.addData.id
      //   }
      //   this.loadFindSysUserList(_this, formDatas, tree, treeNode, resolve)
      // }
      // 懒加载刷新父级
      const parentId = _this.addData.parentId
      if (parentId && _this.maps.get(parentId)) {
        const {tree, treeNode, resolve} = _this.maps.get(parentId)
        let formDatas = {
          parentId: _this.addData.parentId
        }
        this.loadFindSysUserList(_this, formDatas, tree, treeNode, resolve)
      }
    }
  }
}
