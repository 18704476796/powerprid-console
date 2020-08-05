import Request from './Request.js' // 接口文件
export default {
  name: 'Platform',
  data () {
    return {
      form: {
        url: '', // 跳转地址
        select: 'http://',
        text: '', // 页面logo名称
        headerLogoUrl: '', // 页眉logo地址
        headerLogo: '', // logo文件
        disabledHeaderLogo: true,
        loginLogoUrl: '', // 登录logo
        loginLogo: '', // 登录文件
        disabledLoginLogo: true,
        loginBackUrl: '', // 登录页背景图片
        loginBack: '', // 登录页背景图片文件
        disabledLoginBack: true
      }
    }
  },
  mounted () { // 钩子函数
    Request.getInfo(this)
  },
  methods: {
    submit (file, type) { // 上传图片
       // 转码base64
      let reader = new FileReader() // 转换base64 开始
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        let base64 = reader.result
        Request.submitImg(this, base64, type)
      }
    },
    submitInfo () { // 上传logo 信息
      // let url = this.form.select + this.form.url
      Request.submitInfo(this)
    },
    handleRemove (file) {
      console.log(file)
    },
    onChangeHeadImg (file, fileList) {
      console.log(fileList)
      if (fileList.length === 0) {
        this.form.disabledHeaderLogo = false
      } else {
        this.form.headerLogoUrl = file.url
        this.form.headerLogo = file
        this.form.disabledHeaderLogo = true
      }
    },
    onChangeLoginLogo (file, fileList) {
      console.log(fileList.length)
      if (fileList.length === 0) {
        this.form.disabledLoginLogo = false
      } else {
        this.form.loginLogoUrl = file.url
        this.form.loginLogo = file
        this.form.disabledLoginLogo = true
      }
    },
    onChangeLoginBack (file, fileList) {
      console.log(fileList.length)
      if (fileList.length === 0) {
        this.form.disabledLoginBack = false
      } else {
        this.form.loginBackUrl = file.url
        this.form.loginBack = file
        this.form.disabledLoginBack = true
      }
    }
  }
}
