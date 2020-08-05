import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import Paging from './components/Paging'
import ScreenBoxTwo from './components/ScreenBoxTwo'
import TablesTwo from './components/TablesTwo'
import PagingTwo from './components/PagingTwo'
import Request from './Request.js' // 接口文件
export default {
  name: 'PostCheck',
  components: {
    ScreenBox,
    Tables,
    Paging,
    ScreenBoxTwo,
    TablesTwo,
    PagingTwo
  },
  mounted () { // 钩子函数
    Request.getInfo(this, this.formData)
    Request.getRoleList(this)
  },
  methods: {
    getInfo (size) { // 更新分页单页显示条数
      this.formData.pageSize = size
      Request.getInfo(this, this.formData)
    },
    getInfo_current (size) { // 更新每页页码函数
      this.formData.currentPage = size
      Request.getInfo(this, this.formData)
    },
    getInfoTwo (size) { // 更新分页单页显示条数
      this.lookLoadData.pageSize = size
      Request.lookLoad(this, this.lookLoadData)
    },
    getInfo_currentTwo (size) { // 更新每页页码函数
      this.lookLoadData.currentPage = size
      Request.lookLoad(this, this.lookLoadData)
    },
    importStatus (val) { // 导入状态查询
      this.lookLoadData.isSuccess = val
      Request.lookLoad(this, this.lookLoadData)
    },
    changeType (val) { // 导入类型查询
      this.lookLoadData.operaType = val
      Request.lookLoad(this, this.lookLoadData)
    },
    search (type, val) { // 关键字查询函数
      this.formData.keyWord = type
      this.formData.keyValue = val
      Request.getInfo(this, this.formData)
    },
    changeStatus (val) { // 状态查询
      this.formData.userStatus = val
      Request.getInfo(this, this.formData)
    },
    handleChange (val) { // 组织机构查询
      this.formData.orgBureauId = val[0]
      this.formData.orgDepartId = val[1]
      this.formData.orgTeamId = val[2]
      Request.getInfo(this, this.formData)
    },
    dataDerive () { // 导出
      Request.dataDerive(this, this.formData)
    },
    downLoad () { // 下载模板函数
      Request.downLoad(this)
    },
    impExcel (file) { // 导入函数
      Request.impExcel(this, file)
    },
    addInfo () { // 新增部门
      this.drawer = true
      this.drawerTitle = '添加部门'
      this.drawerButton = '立即创建'
      this.placeholder = '默认密码123456'
      this.ruleForm.id = null
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    onSubmit () { // 编辑、新增提交
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { // 表单验证通过
          Request.onSubmit(this)
        } else {
          return false // 表单验证不通过
        }
      })
    },
    edit (obj) { // 编辑管理员弹层函数
      this.ruleForm = obj
      this.ruleForm.department = [obj.orgBureauId, obj.orgDepartId, obj.orgTeamId]
      this.isShowAddressInfo = false;
       // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
       setTimeout(() => {
         this.isShowAddressInfo = true;
       }, 500);
      this.drawer = true
      this.drawerTitle = '编辑部门'
      this.drawerButton = '保存'
      this.placeholder = '如不需修改密码请不做处理'
    },
    deleteUser (id) { // 删除用户
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Request.deleteUser(this, id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    lookLoad () { // 查看导入记录
      this.drawerTable = true
      Request.lookLoad(this, this.lookLoadData)
    }
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号'));
      } else {
        const reg = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的号码'))
        }
      }
    }
    return {
      isShowAddressInfo: true,
      formData: { // 向用户列表数据接口传递数据
        keyWord: '',
        keyValue: '',
        userStatus: null,
        orgBureauId: null, // 分局id
        orgDepartId: null, // 部门id
        orgTeamId: null, // 班组id
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      statusList: [{ // 状态接口
        lable: 1,
        value: '启用'
      }, {
        lable: 2,
        value: '暂未启用'
      }, {
        lable: 3,
        value: '用户锁定'
      }],
      totalRows: null, // 分页数据总条数
      disabled: true, // 表单为true则不可编辑
      tableData: [{ // 表格数据
      }],
      drawer: false, // 控制新增导航抽屉弹层是否展开
      drawerTitle: '', // 弹层标题
      drawerButton: '', // 弹层按钮名称
      roleList: [], // 角色列表
      cerList: [{ // 资质列表
        lable: 1,
        value: '两种人'
      }, {
        lable: 2,
        value: '三种人'
      }],
      props: {
        lazy: true,
        checkStrictly: true,
        lazyLoad (node, resolve) {
          Request.loadGetInfo(this, node, resolve)
        }
      },
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: null,
        userStatus: 1,
        userName: '', // 账号
        realName: '', // 姓名
        department: [], // 组织机构
        phoneNum: '', // 电话
        positionId: '', // 角色id
        userType: '', // 资质
        pass: '123456' // 密码
      },
      placeholder: '',
      rules: { // 表单验证.
        userName: [{ required: true, message: '请输入帐号', trigger: 'blur' }], // 帐号验证
        realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        department: [{ required: true, message: '请选择组织机构', trigger: 'blur' }],
        positionId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        userType: [{ required: true, message: '请选择资质', trigger: 'blur' }],
        phoneNum: [{ required: true, validator: checkPhone, trigger: 'blur' }] // 手机号
      },
      drawerTable: false, // 导入详情页面
      inportData: [], // 导入记录表格
      lookLoadData: {
        isSuccess: null,
        operaType: '', // 导入类型
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      inportTotalRows: null, // 导入分页数据总条数
      tableHeight: this.$store.state.mainHeight - 170 // 76为main顶部及填充值
    }
  }
}
