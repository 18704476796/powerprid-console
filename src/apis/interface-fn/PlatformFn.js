// 平台初始化设置
import {COMPANY_DETAILY, UPLOAD_LOGO, SAVE_LOGO_DETAILY} from '../interface.js' // 接口调用文件
export default {
  async findSysUserList (_this, formData) { // 平台初始化接口
    let res = await COMPANY_DETAILY(formData)
    const data = res.data
    if (data.status === '1000') {
      console.log(data)
      _this.form.text = data.logoName // logo名称
      _this.form.url = data.receptionUrl // 前台跳转地址
      _this.form.headerLogoUrl = data.menuLogoUrl // logo存放路径
      _this.form.loginBackUrl = data.backgroundUrl // 背景图片
      _this.form.loginLogoUrl = data.logoUrl // 登录成功首页logo
      console.log(_this.form.headerLogoUrl)
      console.log(_this.form.loginBackUrl)
      console.log(_this.form.loginLogoUrl)
    }
  },
  async submitImg (_this, formData) { // 上传图片接口
    let res = await UPLOAD_LOGO(formData)
    const data = res.data
    if (data.status === '1000') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    }
  },
  async submitInfo (_this, formData) { // 上传logo信息
    let res = await SAVE_LOGO_DETAILY(formData)
    const data = res.data
    if (data.status === '1000') {
      _this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.findSysUserList(_this)
    }
  }
}
