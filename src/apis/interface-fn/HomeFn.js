// home页面接口函数
import {NAV_ONE, NAV_LEFT_CONTENT} from '../interface.js' // 接口调用文件
export default {
  async getIndex (_this, formData) { // 登录成功初始化页眉接口函数
    let res = await NAV_ONE(formData)
    const data = res.data
    switch (data.code) {
      case '200':
        _this.headerData = data.data.data
        let formData = {menuId: 6, roleId: _this.$store.state.radioRole}
        this.getMenuList(_this, formData)
        break
      case '8888':
        _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
        break
      case '8889':
        _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
        break
      case '8890':
        _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
        break
      case '1002':
        _this.$message({showClose: true, message: '请重新登录', type: 'info'})
        _this.$store.dispatch('changeToken', '')
        _this.$store.dispatch('changeRadioRole', '')
        _this.$router.push('/login')
        break
      default:
        _this.$message({showClose: true, message: '登录页面图片未知错误，请联系网站管理员。', type: 'error'})
        break
    }
  },
  async getMenuList (_this, formData) { // 左侧导航及右侧内容接口
    let res = await NAV_LEFT_CONTENT(formData)
    const data = res.data
    switch (data.code) {
      case '200':
        _this.asideData = data.data.data.asideHomeNav // 左侧导航接口数据
        _this.contentData = data.data.data.userInfo // 内容区域接口数据
        break
      case '8888':
        _this.$message({showClose: true, message: '必填参数为空', type: 'error'})
        break
      case '8889':
        _this.$message({showClose: true, message: 'ip地址验证失败', type: 'error'})
        break
      case '8890':
        _this.$message({showClose: true, message: 'token验证失败', type: 'error'})
        break
      default:
        _this.$message({showClose: true, message: '请联系系统管理员，错误码：未知，地址：NAV_LEFT_CONTENT', type: 'error'})
        break
    }
  }
}
