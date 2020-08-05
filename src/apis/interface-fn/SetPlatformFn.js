// 平台设置管理接口函数
import {LOGIN_IMG} from '../interface.js' // 接口调用文件
export default {
  async findSysUserList (_this, formData) { // 平台设置初始化接口
    let res = await LOGIN_IMG(formData)
    const data = res.data
    if (data.status === '1000') {
      console.log(data)
      let api = _this.$store.state.httpUrl
      _this.formEdit = data.company
      _this.previewImgSrcLogo = api + data.company.productLogoPath
      _this.formEdit.imageUrlLogo = data.company.productLogoPath
      _this.bigDisabled = true
    }
  }
}
