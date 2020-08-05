import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import Paging from './components/Paging'
import Request from './Request.js' // 接口文件
export default {
  name: 'PostCheck',
  components: {
    ScreenBox,
    Tables,
    Paging
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
      this.formData.positionName = val
      Request.getInfo(this, this.formData)
    },
    addInfo () { // 新增部门
      this.drawer = true
      this.drawerTitle = '添加部门'
      this.drawerButton = '立即创建'
      this.ruleForm.id = null
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { // 表单验证通过
          Request.onSubmit(this)
        } else {
          return false // 表单验证不通过
        }
      })
    },
    edit (obj) { // 编辑岗位管理弹层函数
      console.log(obj)
      this.ruleForm = obj
      this.drawer = true
      this.drawerTitle = '编辑部门'
      this.drawerButton = '保存'
    },
    deleteUser (id) { // 删除岗位
      this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
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
    }
  },
  data () {
    return {
      formData: { // 向用户列表数据接口传递数据
        positionName: '', // 模糊查询内容
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      totalRows: null, // 分页数据总条数
      disabled: true, // 表单为true则不可编辑
      tableData: [{ // 表格数据
        id: 1,
        locked: 1,
        date: '2016-05-02',
        name: '王小虎'
      }],
      drawer: false, // 控制新增导航抽屉弹层是否展开
      drawerTitle: '', // 弹层标题
      drawerButton: '', // 弹层按钮名称
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: null,
        positionName: '', // 名称
        isStatus: 1, // 状态 1 启用 0 禁用
        sort: null
      },
      rules: { // 表单验证.
        positionName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }]
      },
      tableHeight: this.$store.state.mainHeight - 170 // 76为main顶部及填充值
    }
  }
}
