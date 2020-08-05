import PlatformFn from '@/apis/interface-fn/PlatformFn.js' // 接口调用文件
export default {
  getInfo (_this, type) { // 平台初始化接口
    let formData = {
    }
    PlatformFn.findSysUserList(_this, formData)
  },
  submitImg (_this, url, type) { // 上传图片
    let formData = {
      uploadPic: url,
      type: type
    }
    PlatformFn.submitImg(_this, formData)
  },
  submitInfo (_this, url) { // 上传logo信息
    let formData = {
      logoName: _this.form.text
    }
    PlatformFn.submitInfo(_this, formData)
  }
}
