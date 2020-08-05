import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import TablesTwo from './components/TablesTwo' // 新增表格
import Paging from './components/Paging'
import PagingTwo from './components/PagingTwo' // 新增分页
import Request from './Request.js' // 接口文件
export default {
  name: 'ThreeKinds-Console',
  components: {
    ScreenBox,
    Tables,
    TablesTwo,
    Paging,
    PagingTwo
  },
  mounted () { // 钩子函数
    Request.getInfo(this, this.formData)
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
    passengerAdd () { // 新增三种人管理信息初始化函数
      this.addDrawer = true
      Request.addGetInfoTable(this, this.pageSizeTwo, this.currentPageTwo)
    },
    getInfoTwo (size) { // 更新新增页面分页单页显示条数
      this.pageSizeTwo = size
      Request.addGetInfoTable(this, this.pageSizeTwo, this.currentPageTwo)
    },
    getInfo_currentTwo (size) { // 更新新增页面每页页码函数
      this.currentPageTwo = size
      Request.addGetInfoTable(this, this.pageSizeTwo, this.currentPageTwo)
    },
    addKinds (ids) { // 获取新增提交用户id集合
      // Request.addKinds(this, ids)
      this.ueserIds = ids
    },
    onSubmit () { // 提交新增的三种人管理
      if (this.ueserIds === '' || this.ueserIds === undefined || this.ueserIds === null) {
        this.$message({
          showClose: true,
          message: '请至少选择一条信息！',
          type: 'error'
        })
      } else {
        Request.addKinds(this, this.ueserIds)
      }
    },
    search (type, val) { // 关键字键值对查询函数
      this.formData.keyword = type
      this.formData.keywordValue = val
      Request.getInfo(this, this.formData)
    },
    dataDerive () { // 导出
      Request.dataDerive(this)
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    edit (obj) { // 编辑人员资质
      this.drawer = true
      this.disabled = false
      this.dialogTitle = '编辑人员资质'
      this.editTitle = true
      this.ruleForm.userId = obj.userId
      this.ruleForm.jobTypeId = obj.jobTypeId // 类别id
      this.ruleForm.professionId = obj.professionId // 专业
      this.ruleForm.realName = obj.realName // 姓名
      this.ruleForm.idCard = obj.idCard // 身份证号
      this.ruleForm.pointsDeductedCount = obj.pointsDeductedCount // 分数
      // this.ruleForm.orgId = obj.orgId // 单位id
      this.ruleForm.orgId = 2
      this.ruleForm.deptId = obj.deptId // 部门id
      this.ruleForm.groupId = obj.groupId // 班组id
      this.ruleForm.postId = obj.postId // 岗位id
      Request.getSelectList(this, 2, obj.id) // 获取下拉列表
      Request.getDanweiList(this, 1) // 获取单位下拉列表
      Request.getBmList(this, obj.orgId) // 获取部门下拉列表
      Request.getBzList(this, obj.deptId) // 获取班组
      Request.getGwList(this, obj.groupId) // 获取岗位
    },
    changeDw (val) { // 获取部门下拉列表
      Request.getBmList(this, this.ruleForm.orgObj.orgId)
    },
    getBz (val) { // 获取班组下拉列表
      Request.getBzList(this, this.ruleForm.deptId)
    },
    getGw (val) { // 获取岗位下拉列表
      Request.getGwList(this, this.ruleForm.groupId)
    },
    lookInfo (obj) { // 查看三种人管理
      this.dialogTitle = '查看人员资质'
      this.drawer = true
      this.disabled = true
      this.ruleForm = obj
      this.editTitle = false
    },
    onSubmitEdit () { // 编辑提交
      Request.onSubmit(this)
    },
    addIds (ids) { // 批量删除的id集合赋值
      this.ids = ids
    },
    dataDelet () { // 批量删除
      if (this.ids === '' || this.ids === undefined || this.ids === null) {
        this.$message({
          showClose: true,
          message: '请至少选择一条信息！',
          type: 'error'
        })
      } else {
        Request.deleteUser(this, this.ids)
      }
    },
    deleteUser (id) { // 单个删除删除
      Request.deleteUser(this, id)
    },
    submitCheck () { // 提交审核
      if (this.ids === '' || this.ids === undefined || this.ids === null) {
        this.$message({
          showClose: true,
          message: '请至少选择一条信息！',
          type: 'error'
        })
      } else {
        Request.submitCheck(this, this.ids)
      }
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var date = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入结束时间'))
      } else if (value <= this.ruleForm.planStartTime) {
        callback(new Error('结束时间小于开始时间!'))
      } else {
        callback()
      }
    }
    return {
      disabled: true, // 查看状态下不可编辑
      formData: { // 向用户列表数据接口传递数据
        keyword: null, // 筛选搜索框类型值
        keywordValue: null, // 筛选搜索框的值
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      tableData: [ // 初始化页面数据表格
        { // 表格数据
        // id: '1',
        // locked: '', // 用户锁定状态（默认：1正常, 0锁定, 2注销）
        // loginTime: '11', // 最后登录时间
        // nickName: '', // 昵称
        // phoneNum: '', // 手机号
        // realName: '111', // 真实姓名
        // userName: '11' // 帐号
        }
      ],
      ids: '', // 删除id集合
      totalRows: null, // 分页数据总条数
      drawer: false, // 控制编辑导航抽屉弹层是否展开
      addDrawer: false, // 控制新增导航抽屉弹层是否展开
      addTableData: [], // 新增三种人管理数据列表
      pageSizeTwo: 20, // 新增页面分页单页显示条数
      currentPageTwo: 1, // 新增页面每页页码
      totalRowsTwo: null, // 新增页面分页数据总条数
      ueserIds: [], // 新增用户ids集合
      dialogTitle: '', // 编辑查看弹层标题
      editTitle: true, // 保存按钮是否显示
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: null, // id
        userId: null, // 用户id
        orgId: null, // 单位id
        realName: '', // 姓名
        idCard: '', // 身份证号
        deptId: null, // 部门
        groupId: '', // 班组
        postId: '', // 岗位
        professionId: '', // 专业
        jobTypeId: '', // 类别
        pointsDeductedCount: '', // 分数
      },
      danWeiList: [{ // 单位下拉列表
      }],
      bMList: [{ // 部门下拉列表
      }],
      gWiList: [{ // 岗位下拉列表
      }],
      jobTypeList: [{ // 工作类型下拉列表
      }],
      professionList: [{ // 专业名称下拉列表
      }],
      teamNameList: [{ // 工作班组下拉列表
        value: '',
        label: ''
      }],
      rules: { // 表单验证.
        orgId: [{ required: true, message: '请选择单位', trigger: 'blur' }], // 单位验证
        deptId: [{ required: true, message: '请选择部门', trigger: 'blur' }], // 部门验证
        jobTypeId: [{ required: true, message: '请选择工作类型', trigger: 'blur' }], // 工作类型验证
        professionId: [{ required: true, message: '请选择专业', trigger: 'blur' }] // 专业验证
      },
      dialogFormVisible: false, // 对话框的展开隐藏
      tableHeight: this.$store.state.mainHeight - 170 - 42 // 76为main顶部及填充值
    }
  }
}
