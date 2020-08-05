let defaultToken = ''
let defaultRadioRole = ''
let defaultnavTs = {val: 0, icon: '&#xe62c;'}
let defaultHttpUrl = ''
try {
  if (localStorage.token) {
    defaultToken = localStorage.token // 用户token
  }
  if (localStorage.radioRole) {
    defaultRadioRole = localStorage.radioRole // 多用户角色id
  }
  if (localStorage.navTs) {
    // 将字符串对象转换成对象
    defaultnavTs = JSON.parse(localStorage.navTs) // 导航横向伸缩，1为收缩，0为展开
  }
  if (localStorage.httpUrl) {
    defaultHttpUrl = localStorage.httpUrl // 图片地址前缀
  }
} catch (e) {}

export default {
  // localStorage
  token: defaultToken, // 用户token，字符串类型 localStorage
  radioRole: defaultRadioRole, // 多用户角色当前登录id，与token并存
  mainHeight: '', // main内容区域高度记录，初始化即开始记录
  navTs: defaultnavTs, // 伸缩按钮值
  httpUrl: defaultHttpUrl // 图片路径前缀
}
