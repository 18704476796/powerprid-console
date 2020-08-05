// 欢迎页面接口函数
import {PERSON_CENTER} from '../interface.js' // 接口调用文件
export default {
  async getWelcomeInfo (_this) { // 登录接口函数
    const formData = { // 请求数据
      menuId: 8, // 初始化显示主页id
      roleId: _this.$store.state.radioRole // 初始化显示主页id
    }
    function formatDate (now) { // 时间戳的转换
      let year = now.getFullYear() // 取得4位数的年份
      let month = now.getMonth() + 1 // 取得日期中的月份，其中0表示1月，11表示12月
      let date = now.getDate() // 返回日期月份中的天数（1到31）
      let hour = now.getHours() // 返回日期中的小时数（0到23）
      hour = hour < 10 ? '0' + hour : hour
      let minute = now.getMinutes() // 返回日期中的分钟数（0到59）
      minute = minute < 10 ? '0' + minute : minute
      let second = now.getSeconds() // 返回日期中的秒数（0到59）
      second = second < 10 ? '0' + second : second
      return year + '年' + month + '月' + date + '日' + ' ' + hour + ':' + minute + ':' + second
    }
    let res = await PERSON_CENTER(formData)
    const data = res.data
    if (data.code === '200') {
      // _this.department = data.department // 部门
      // _this.job = data.job // 职务
      // _this.nickName = data.nickName
      _this.realName = data.data.realName
      _this.userName = data.data.userName
      _this.roleName = data.data.roleName
      let currentLoginTime = data.data.currentLoginTime // 当前登录时间
      let d = new Date(currentLoginTime) // 创建当前登录时间的日期对象
      let lastLoginTime = data.data.lastLoginTime // 上次登录时间
      let last = new Date(lastLoginTime) // 创建上次登录时间的日期对象
      _this.currentLoginTime = formatDate(d)
      _this.lastLoginTime = formatDate(last)
    }
  }
}
