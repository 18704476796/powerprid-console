// 资源管理页面接口函数
import {
  FIND_MENU_ALL,
  SAVE_UPDATE_MENU,
  DELETE_MENU
} from '../interface.js' // 接口调用文件
export default {
  async findMenuAll (_this) { // 资源管理表格数据
    let res = await FIND_MENU_ALL()
    const data = res.data
    if (data.code === '200') {
      _this.parentMenuList = data.data.parentMenuList
    } else if (data.code === '8888') {
      _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
    } else if (data.code === '8889') {
      _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
    } else if (data.code === '8890') {
      _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
    }
  },
  async saveOrUpdateMenu (_this, FormData) { // 资源管理新增，修改，保存数据
    let res = await SAVE_UPDATE_MENU(FormData)
    const data = res.data
    if (data.code === '200') {
      _this.$confirm('数据已更新，部分数据需要刷新浏览器方可生效，是否刷新？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        location.reload() // 刷新浏览器
      }).catch(() => {
        this.findMenuAll(_this)
      })
    } else if (data.code === '8888') {
      _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
    } else if (data.code === '8889') {
      _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
    } else if (data.code === '8890') {
      _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
    } else if (data.code === '8891') {
      _this.$message({showClose: true, message: '保存异常', type: 'error'})
    }
  },
  async deleteMenu (_this, FormData) { // 资源管理删除数据
    let res = await DELETE_MENU(FormData)
    const data = res.data
    if (data.code === '200') {
      _this.$message({
        message: '资源成功删除',
        type: 'success'
      })
      _this.$confirm('数据已更新，部分数据需要刷新浏览器方可生效，是否刷新？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        location.reload() // 刷新浏览器
      }).catch(() => {
        this.findMenuAll(_this)
      })
    } else if (data.code === '8888') {
      _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
    } else if (data.code === '8889') {
      _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
    } else if (data.code === '8890') {
      _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
    } else if (data.code === '8891') {
      _this.$message({showClose: true, message: '保存异常', type: 'error'})
    } else if (data.code === '8892') {
      _this.$message({showClose: true, message: '删除异常', type: 'error'})
    } else if (data.code === '8893') {
      _this.$message({showClose: true, message: '名字重复', type: 'error'})
    } else if (data.code === '9999') {
      _this.$message({showClose: true, message: '服务器未知异常', type: 'error'})
    }
  }
}
