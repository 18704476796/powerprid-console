import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import TablesTwo from './components/TablesTwo'
import ThresholdForm from './components/ThresholdForm'
import Paging from './components/Paging'
import Request from './Request.js' // 接口文件
import RedScreenBox from './components/RedScreenBox'
import RedTables from './components/RedTables'
import RedPaging from './components/RedPaging'
export default {
  name: 'Year-operativePlan',
  components: {
    ScreenBox,
    Tables,
    TablesTwo,
    ThresholdForm,
    Paging,
    RedScreenBox,
    RedTables,
    RedPaging
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
    search (val) { // 关键字查询函数
      this.formData.searchContent = val
      Request.getInfo(this, this.formData)
    },
    workYaerSearch (val) { // 工作年份查询
      this.formData.searchTime = val
      Request.getInfo(this, this.formData)
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    lookInfo (obj) { // 查看作业计划函数
      this.drawer = true
      this.disabled = true
      Request.getSelectList(this, 1, obj.id)
    },
    submitCheck () { // 审核
      this.checkDia = true
    },
    handleClose (tag) { // 关闭审核节点
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    checkResult (val) { // 点击驳回
      if (val === 2) { // 1通过、2驳回
        this.innerVisible = true
      }
    },
    proofread () { // 平衡校核
      this.loadingDialog = true
    },
    setThreshold () { // 阈值设定
      this.thresholdDialog = true
    }
  },
  data () {
    return {
      oneShow: false, // 页面切换
      loading: true,
      loadingDialog: false, // 加载中弹层
      returnJXDialog: false, // 自动校核返回值页面
      thresholdDialog: false, // 阈值设定界面
      checkDia: false, // 审核界面
      showCheckPeople: true, // 审核人选择按钮是否显示
      dynamicTags: [], // 选择审核人按钮
      innerVisible: false, // 选择博驳回节点界面
      innerCheckTag: false, // 选择审核节点树
      treeData: [{ // 审核节点树
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      disabled: true, // 编辑状态下用户帐号不可编辑
      isUpdate: true, // 弹出按钮是否显示
      addAndUpdateTitle: '', // 新增编辑作业计划标题
      formData: { // 向用户列表数据接口传递数据
        planStatus: null, // 计划状态(1草稿2已提交-审核中3审核通过4审核不通过)
        type: 1, // 1年计划2月计划3半月计划4周计划5日计划
        planCreateType: 1, // 年计划查询类型 1 所有 2 计划创建
        searchContent: '', // 模糊查询内容
        searchTime: '', // 工作年份
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      tableData: [ // 初始化表格
      ],
      xhTableData: [{ // 校核返回值
        month: '月份',
        planningData: 2345, // 计划数
        threshold: 12, // 阈值
        result: true // 结果
      }],
      totalRows: null, // 分页数据总条数
      drawer: false, // 控制新增导航抽屉弹层是否展开
      fanTrue: false, // 电压范围±号是否显示
      ruleForm: { // 查看接收数据
      },
      voltageLevelType: [{ // 电压等级是否包含范围
        value: true,
        label: '是'
      }, {
        value: false,
        label: '否'
      }],
      checkForm: {
        reason: '' // 不通过理由
      },
      dismissNode: '', // 驳回节点
      dismissNodeList: [{ // 驳回节点列表
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
      rules: { // 表单验证.
        reason: [{ required: true, message: '请输入理由', trigger: 'blur' }]
      },
      dialogFormVisible: false, // 对话框的展开隐藏
      tableHeight: this.$store.state.mainHeight - 170 - 42 // 76为main顶部及填充值
    }
  }
}
