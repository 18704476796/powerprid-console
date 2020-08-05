export default {
  changeToken (state, token) { // token存储
    state.token = token
    try {
      localStorage.token = token
    } catch (e) {}
  },
  changeRadioRole (state, radioRole) { // 多用户角色id存储
    state.radioRole = radioRole
    try {
      localStorage.radioRole = radioRole
    } catch (e) {}
  },
  changeHttpUrl (state, httpUrl) { // 图片地址前缀
    state.httpUrl = httpUrl
    try {
      localStorage.httpUrl = httpUrl
    } catch (e) {}
  },
  changeMainHeight (state, mainHeight) { // 内容列表高度值
    state.mainHeight = mainHeight
  },
  changeNavTs (state, navTs) { // 伸缩按钮存储值
    state.navTs = navTs
    try {
      // localStorage 存储对象需要转换成字符串
      localStorage.navTs = JSON.stringify(navTs)
    } catch (e) {}
  }
}
