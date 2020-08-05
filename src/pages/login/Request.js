import Login from '@/apis/interface-fn/LoginFn.js' // 接口调用文件
export default {
  loginImg (_this) { // 登录页面图片接口函数
    Login.loginImg(_this)
  },
  login (_this, formName) { // 密码登录接口函数
    _this.$refs[formName].validate((valid) => {
      if (valid) { // 表单验证通过
        const formData = { // 请求数据
          type: 1,
          userName: _this.loginForm.user,
          password: _this.loginForm.password
        }
        Login.login(_this, formData)
      } else {
        return false // 表单验证不通过
      }
    })
  },
  loginYzm (_this) { // 验证码登录接口函数
    let formData = {
      type: 2,
      phoneNum: _this.ruleForm.user,
      vcode: _this.ruleForm.code
    }
    Login.login(_this, formData)
  },
  // checkPhone (_this) { // 手机号登录前校验
  //   let formData = {
  //     phoneNum: _this.ruleForm.user,
  //     type: 0
  //   }
  //   Login.checkPhone(_this, formData)
  // },
  setCode (_this) { // 发送验证码函数
    let formData = {
      phoneNum: _this.ruleForm.user
    }
    Login.setCodeInfo(_this, formData)
  }
}
