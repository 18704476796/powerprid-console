import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import Request from './Request.js' // 接口文件
export default {
  name: 'NodeTypeManagement',
  components: {
    ScreenBox,
    Tables
  },
  mounted () { // 钩子函数
    Request.getInfo(this)
  },
  methods: {
    passengerAdd () { // 新增节点类型弹层函数
      this.drawer = true
      this.ruleForm.id = null
      this.drawerTitle = '新增节点类型'
      this.drawerButton = '立即创建'
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    onSubmit () { // 修增、修改的提交
      Request.onSubmit(this)
    },
    edit (obj) { // 编辑用户弹层函数
      this.drawer = true
      this.ruleForm = obj
      this.drawerTitle = '修改节点类型'
      this.drawerButton = '保存'
    },
    deleteUser (id) { // 删除节点类型
      Request.deleteUser(this, id)
    }
  },
  data () {
    return {
      disabled: true, // 编辑状态下用户帐号不可编辑
      tableData: [ // 表格数据
      ],
      drawer: false, // 控制新增导航抽屉弹层是否展开
      drawerTitle: '', // 弹层标题
      drawerButton: '', // 弹层按钮
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: '', // id
        nodeTypeName: '', // 名称
        nodeTypeVal: '' // 类型
      },
      rules: { // 表单验证.
        nodeTypeName: [{ required: true, message: '请输入节点类型名称', trigger: 'blur' }], // 名称验证
        nodeTypeVal: [{ required: true, message: '请输入节点类型', trigger: 'blur' }]
      },
      tableHeight: this.$store.state.mainHeight - 170 // 76为main顶部及填充值
    }
  }
}
