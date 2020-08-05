import ScreenBox from './components/ScreenBox'
import NodeScreenBox from './components/NodeScreenBox'
import ScreenBoxThree from './components/ScreenBoxThree'
import Tables from './components/Tables'
import TablesThree from './components/TablesThree'
import Request from './Request.js' // 接口文件
export default {
  name: 'Process-Management',
  components: {
    ScreenBox,
    Tables,
    NodeScreenBox,
    ScreenBoxThree,
    TablesThree
  },
  mounted () { // 钩子函数
    Request.getInfo(this)
    Request.nodeTypeList(this) // 获取节点类型函数
  },
  methods: {
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    addProcess () { // 新增流程
      this.drawer = true
      this.drawerTitle = '添加流程'
      this.drawerButton = '立即创建'
      this.ruleForm.id = null
    },
    editPro (obj) { // 编辑流程
      this.drawer = true
      this.drawerTitle = '编辑流程'
      this.drawerButton = '保存'
      this.ruleForm = obj
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
    lookPro (id) { // 流程查看详情
      Request.lookPro(this, id)
      this.drawerTable = true
      this.processId = id // 流程id
    },
    addProcessNode () { // 新建流程节点
      this.nodeDrawer = true
      this.nodeTitle = '添加流程节点'
      this.nodeButton = '立即创建'
      this.nodeForm.id = null
    },
    editNode (obj) { // 编辑流程节点
      this.nodeDrawer = true
      this.nodeTitle = '编辑流程节点'
      this.nodeButton = '保存'
      this.nodeForm = obj
    },
    onSubmitNode () { // 编辑、新增流程节点提交
      this.$refs.nodeForm.validate((valid) => {
        if (valid) { // 表单验证通过
          if (this.nodeTitle === '编辑流程节点') {
            Request.onSubmitEditNode(this) // 编辑
          } else {
            Request.onSubmitNode(this) // 新建
          }
        } else {
          return false // 表单验证不通过
        }
      })
    },
    lookNodeChid (id) { // 节点查看详情列表
      this.nodeChild = true
      this.planNodeId = id // 流程id
      Request.lookNodeChid(this, id)
    },
    addPlanNode () { // 新建计划节点
      this.planDrawer = true
      this.planTitle = '添加节点按钮'
      this.planButton = '立即创建'
      this.planForm.id = null
    },
    editPlan (obj) { // 编辑管理员弹层函数
      this.planForm = obj
      // this.planForm.orgCodes = [32, 38, 35]
      // this.isShowAddressInfo = false;
      //  // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
      //  setTimeout(() => {
      //    this.isShowAddressInfo = true;
      //  }, 500);
      this.orgCodes = obj.orgCodes
      this.orgIds = obj.orgIds
      console.log(this.orgIds)
      this.planDrawer = true
      this.planTitle = '编辑节点按钮'
      this.planButton = '保存'
    },
    onSubmitPlan () { // 编辑、新增节点按钮提交
      this.$refs.planForm.validate((valid) => {
        if (valid) { // 表单验证通过
          if (this.planTitle === '编辑节点按钮') {
            Request.onSubmitEditPlan(this) // 编辑
          } else {
            Request.onSubmitPlan(this) // 新建
          }
        } else {
          return false // 表单验证不通过
        }
      })
    },
  },
  data () {
    return {
      disabled: true, // 查看状态下不可编辑
      tableData: [ // 初始化页面表格
      ],
      drawer: false, // 控制编辑导航抽屉弹层是否展开
      drawerTitle: '', // 编辑查看弹层标题
      drawerButton: '', // 弹层按钮名称
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: null,
        processName: '' // 名称
      },
      rules: { // 表单验证.
        processName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      drawerTable: false, // 查看详情页面
      processId: null, // 流程id（父级id）
      nodeTable: [], // 流程节点列表
      nodeDrawer: false, // 流程节点编辑新增弹层
      nodeTitle: '', // 流程节点弹层标题
      nodeButton: '', // 流程节点按钮标题
      nodeTypeList: [{ // 节点类型列表
        lable: '0',
        value: '编制创建节点'
      }],
      nodeForm: { // 流程节点表单
        id: null,
        nodeName: '' ,// 节点名称
        nodeSort: null, // 排序
        nodeTypeVal: '' // 节点类型（0编制创建节点，1提交节点，2审批节点，3校核，10结束）
      },
      nodeRules: { // 流程节点表单验证.
        nodeSort: [{ required: true, message: '请输入节点排序', trigger: 'blur' }],
        nodeName: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
        nodeTypeVal: [{ required: true, message: '请选择节点类型', trigger: 'blur' }]
      },
      nodeChild: false, // 流程节点详情页弹层
      nodeChildTable: [], // 流程节点详情表格数据
      planNodeId: null, // 流程节点id
      planDrawer: false, // 新增、编辑计划节点弹层
      guideNodeList: [], // 导向节点列表
      isShowAddressInfo: true,
      props: { // 提交至部门编码数据
        lazy: true,
        checkStrictly: true,
        multiple: true,
        lazyLoad (node, resolve) {
          Request.loadGetInfo(this, node, resolve)
        }
      },
      orgIds: '', // id集合
      orgCodes: '', // code集合
      planTitle: '', // 计划节点弹层标题
      planButton: '', // 计划节点按钮标题
      planForm: { // 计划节点表单
        id: null,
        guideName: '', // 导向按钮名称
        guideNodeName: '', // 导向节点名称
        guideNodeId: null,
        nodeTypeVal: '', // 节点类型
        orgCodes: '', // 提交至部门编码
        remark: '' // 备注
      },
      planRules: { // 计划节点表单验证.
        guideName: [{ required: true, message: '请输入导向按钮名称', trigger: 'blur' }],
        guideNodeId: [{ required: true, message: '请选择导向节点名称', trigger: 'blur' }],
        nodeTypeVal: [{ required: true, message: '请选择节点类型', trigger: 'blur' }]
      },
      tableHeight: this.$store.state.mainHeight - 170 // 76为main顶部及填充值
    }
  }
}
