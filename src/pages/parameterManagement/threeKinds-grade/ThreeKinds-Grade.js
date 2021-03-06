import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import Paging from './components/Paging'
import Request from './Request.js' // 接口文件
export default {
  name: 'ThreeKinds-Console',
  components: {
    ScreenBox,
    Tables,
    Paging
  },
  mounted () { // 钩子函数
    Request.getInfo(this, this.formData)
    Request.getAllGwList(this, 4) // 获取岗位下拉列表
    Request.getSelectList(this, 2) // 获取专业、类别列表
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
    addKinds (ids) { // 获取新增提交用户id集合
      this.ueserIds = ids
    },
    search (type, val) { // 关键字键值对查询函数
      this.formData.keyword = type
      this.formData.keywordValue = val
      Request.getInfo(this, this.formData)
    },
    searchPost (val) { // 岗位搜索
      this.formData.postCode = val
      Request.getInfo(this, this.formData)
    },
    searchMajor (val) { // 专业搜索
      this.formData.professionId = val
      Request.getInfo(this, this.formData)
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    lookInfo (obj) { // 审核查看
      this.drawer = true
      this.disabled = true
      this.lookForm = obj
      Request.getFractionList(this) // 获取扣分下拉列表
    },
    changeGrade (val) { // 分数变化
      console.log(val)
      this.lookForm.pointsDeductedCount = this.lookForm.pointsDeductedCount + val.fraction
      this.lookForm.remainderCount = this.lookForm.remainderCount - val.fraction
    },
    returnCheck () { // 提交扣分
      Request.submitCheck(this)
    },
    addIds (ids) { // 批量选择的id集合赋值
      this.ids = ids
    },
    submitCheck () { // 提交审核
      if (this.ids === '' || this.ids === undefined || this.ids === null) {
        this.$message({
          showClose: true,
          message: '请至少选择一条信息！',
          type: 'error'
        })
      } else {
        this.addDrawer = true
        // Request.submitCheck(this, this.ids)
      }
    }
  },
  data () {
    return {
      disabled: true, // 查看状态下不可编辑
      formData: { // 向用户列表数据接口传递数据
        keyword: null, // 筛选搜索框类型值
        keywordValue: null, // 筛选搜索框的值
        planProcessId: 8, // 流程id，暂时写死
        postCode: null, // 岗位code
        professionId: null, // 专业id
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      tableData: [ // 初始化页面数据表格
      ],
      ids: '', // id集合
      totalRows: null, // 分页数据总条数
      drawer: false, // 控制编辑导航抽屉弹层是否展开
      addDrawer: false, // 控制审核理由抽屉弹层是否展开
      dialogTitle: '', // 编辑查看弹层标题
      lookForm: {}, // 查看信息
      ruleForm: { // 审核理由弹层
        reason: '' // 理由
      },
      fraction: {
        fraction: 0
      }, // 扣分原因对象
      fractionList: [{ // 扣分原因列表
      }],
      postList: [{ // 岗位下拉列表
      }],
      professionList: [{ // 专业名称下拉列表
      }],
      rules: { // 表单验证.
        reason: [{ required: true, message: '请输入理由', trigger: 'blur' }]
      },
      ruless: { // 表单验证.
        fraction: [{ required: true, message: '请选择扣分理由', trigger: 'blur' }] // 扣分理由
      },
      dialogFormVisible: false, // 对话框的展开隐藏
      tableHeight: this.$store.state.mainHeight - 170 // 76为main顶部及填充值
    }
  }
}
