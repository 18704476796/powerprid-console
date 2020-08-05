import Request from './Request' // 接口调用文件
export default {
  name: 'Login',
  mounted () { // 钩子函数
    // Request.loginImg(this) // login初始化调用接口
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号'));
      } else {
        const reg = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的号码'));
        }
      }
    }
    return {
      zhLogin: true, // z账号密码登录界面
      loginForm: { // 密码登录表单数据
        user: '', // 输入的帐号
        password: '' // 输入的密码
      },
      rules: { // 表单验证.
        user: { required: true, message: '请输入登入帐号', trigger: 'blur' }, // 帐号验证
        password: { required: true, message: '请输入登入口令', trigger: 'blur' } // 密码验证
      },
      yzmLogin: false, // 验证码登录界面
      ruleForm: { // 验证码登录表单数据
        ida: null,
        user: '', // 手机号
        code: '' // 验证码
      },
      ruless: { // 验证码表单验证.
        user: [{ required: true,validator: checkPhone, trigger: 'blur' }]
      },
      repet: false, // 重复校验提示语
      codeInfo: '发送验证码',
      c: 60,
      codeInfoDis: false, // 验证码是否可以编辑
      codeDis: false, // 验证码发送按钮是否可编辑
      loginLogo: '', // login Logo
      loginBack: '', // login背景图片地址
      centerDialogVisible: false ,// 多角色弹窗属性
      roleList: [
        // {
        //   id: 40
        //   roleName: "管理员"
        // }
      ],
      radioRole: '', // 角色id选择
      token: '' // 多角色时，token暂存此处
    }
  },
  methods: {
    submitForm (formName) { // 点击密码登入按钮执行函数
      Request.login(this, formName) // 调用登录接口
    },
    submitFormYzm (formName) { // 点击验证码登入按钮执行函数
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Request.loginYzm(this) // 调用登录接口
        } else {
          return false
        }
      })
    },
    centerDialogVisibleFn () { // 多角色用户选择后登录时
      this.centerDialogVisible = false // 多角色弹窗属性
      this.$store.dispatch('changeToken', this.token)
      this.$store.dispatch('changeRadioRole', this.radioRole)
      this.$router.push('/')
    },
    changePass () { // 验证码登录切换到密码登录
      this.zhLogin = true
      this.yzmLogin = false
    },
    changeYzm () { // 密码登录切换到验证码登录
      this.zhLogin = false
      this.yzmLogin = true
    },
    setCode (formName) { // 发送验证码函数
     this.$refs[formName].validate((valid) => {
       if (valid) {
         Request.setCode(this)
         this.codeDis = true
         setTimeout(this.enableCodeBtn, 1000)
       } else {
         return false
       }
     })
    },
    enableCodeBtn: function () {
      if (this.c > 0) {
        this.codeInfo = this.c + 's后获取'
        setTimeout(this.enableCodeBtn, 1000)
        this.c--
      } else {
        this.codeDis = false
        this.codeInfo = '获取验证码'
        this.c = 60
      }
    }
    // checkPhone () { // 手机号登录前校验
    //   Request.checkPhone(this) // 手机号验证
    // }
  }
}
